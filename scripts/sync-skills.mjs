import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readlinkSync,
  renameSync,
  rmSync,
  symlinkSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = join(projectRoot, 'skills.sources.json');
const agentsDir = join(projectRoot, '.agents', 'skills');
const consumerDirs = [join(projectRoot, '.pi', 'skills'), join(projectRoot, '.opencode', 'skills')];
const { skills } = JSON.parse(readFileSync(manifestPath, 'utf8'));
const validSource = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/;
const validName = /^[a-z0-9-]+$/;
const validRef = /^[a-f0-9]{40}$/;
const validPath = (path) =>
  typeof path === 'string' &&
  path.split('/').every((segment) => segment && segment !== '.' && segment !== '..');

if (
  !Array.isArray(skills) ||
  !skills.every(
    ({ name, source, ref, path }) =>
      validName.test(name) && validSource.test(source) && validRef.test(ref) && validPath(path),
  )
) {
  throw new Error(`Invalid ${manifestPath}`);
}

mkdirSync(agentsDir, { recursive: true });
const stagingDir = mkdtempSync(join(agentsDir, '.sync-'));
const pendingLinks = [];

const runGit = (...args) => {
  execFileSync('git', args, { stdio: 'inherit' });
};

for (const consumerDir of consumerDirs) {
  if (!existsSync(consumerDir)) {
    throw new Error(`Missing skill consumer directory: ${consumerDir}`);
  }

  for (const { name } of skills) {
    const link = join(consumerDir, name);
    const target = relative(consumerDir, join(agentsDir, name));
    try {
      if (!lstatSync(link).isSymbolicLink() || readlinkSync(link) !== target) {
        throw new Error(`Unexpected skill link: ${link}`);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      pendingLinks.push({ link, target });
    }
  }
}

try {
  for (const { name, source, ref, path } of skills) {
    const repository = join(stagingDir, `${name}-repository`);
    const stagedSkill = join(stagingDir, name);

    runGit('init', '--quiet', repository);
    runGit('-C', repository, 'remote', 'add', 'origin', source);
    runGit('-C', repository, 'fetch', '--quiet', '--depth=1', '--filter=blob:none', 'origin', ref);
    runGit('-C', repository, 'sparse-checkout', 'set', '--no-cone', path);
    runGit('-C', repository, 'checkout', '--quiet', '--detach', 'FETCH_HEAD');

    const sourceSkill = join(repository, path);
    if (!existsSync(join(sourceSkill, 'SKILL.md'))) {
      throw new Error(`Missing SKILL.md for ${name}`);
    }
    cpSync(sourceSkill, stagedSkill, { recursive: true });
  }

  for (const { name } of skills) {
    const destination = join(agentsDir, name);
    const stagedSkill = join(stagingDir, name);
    const backup = join(stagingDir, `${name}-backup`);

    if (existsSync(destination)) {
      renameSync(destination, backup);
    }
    try {
      renameSync(stagedSkill, destination);
    } catch (error) {
      if (existsSync(backup)) {
        renameSync(backup, destination);
      }
      throw error;
    }
  }

  for (const { link, target } of pendingLinks) {
    symlinkSync(target, link);
  }
} finally {
  rmSync(stagingDir, { recursive: true, force: true });
}

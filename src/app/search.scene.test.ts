import { Option } from 'effect';
import { Command, change, expect, given, label, role, scene, type } from 'foldkit/scene';
import { fromString } from 'foldkit/url';
import { afterEach, beforeEach, test, vi } from 'vitest';
import { init, Message, Search, update } from './model';
import { searchView } from './search';

// Pagefind command dispatch is disabled in the development site.
beforeEach(() => vi.stubEnv('PROD', true));
afterEach(() => vi.unstubAllEnvs());

test('search controls render results, filtered empty state, failure, and recovery', () => {
  scene(
    { update, view: searchView },
    given(init(Option.getOrThrow(fromString('https://edmundmiller.dev/'))).model),
    type(label('Search'), 'nextflow'),
    Command.expectExact(Search({ query: 'nextflow', tag: '' })),
    expect(role('status')).toHaveText('Loading search…'),
    Command.resolve(
      Search,
      Message.CompletedSearch({
        query: 'nextflow',
        tag: '',
        succeeded: true,
        total: 1,
        results: [
          { url: '/posts/emacs-nextflow/', title: 'Nextflow Emacs Workflow', excerpt: 'Workflow' },
        ],
      }),
    ),
    expect(role('link', { name: 'Nextflow Emacs Workflow' })).toHaveAttr(
      'href',
      '/posts/emacs-nextflow/',
    ),
    expect(role('status')).toHaveText('1 results for nextflow'),
    change(label('Filter by tag'), 'nixos'),
    Command.expectExact(Search({ query: 'nextflow', tag: 'nixos' })),
    expect(role('link', { name: 'Nextflow Emacs Workflow' })).toBeAbsent(),
    Command.resolve(
      Search,
      Message.CompletedSearch({
        query: 'nextflow',
        tag: 'nixos',
        succeeded: true,
        results: [],
        total: 0,
      }),
    ),
    expect(role('status')).toHaveText('0 results for nextflow'),
    type(label('Search'), 'emacs'),
    Command.expectExact(Search({ query: 'emacs', tag: 'nixos' })),
    Command.resolve(
      Search,
      Message.CompletedSearch({
        query: 'emacs',
        tag: 'nixos',
        succeeded: false,
        results: [],
        total: 0,
      }),
    ),
    expect(role('alert')).toBeVisible(),
    type(label('Search'), 'nextflow'),
    Command.resolve(
      Search,
      Message.CompletedSearch({
        query: 'nextflow',
        tag: 'nixos',
        succeeded: true,
        results: [],
        total: 0,
      }),
    ),
    expect(role('alert')).not.toBeVisible(),
    type(label('Search'), '   '),
    Command.expectNone(),
    expect(role('status')).toHaveText(''),
    expect(label('Filter by tag')).toHaveValue('nixos'),
  );
});

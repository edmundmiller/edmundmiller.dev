#!/usr/bin/env bash
# Install the pinned Vale stack into styles/.
#
# Pins:
#   WriteSimply   v1.0.0 zip (SHA-256 verified)
#   LLMCliches    edmundmiller/vale-llm-cliches @ d74b5d40421855c3a82352a3177226dae6d3a58f
#   ClearTechnical STE / STEDescriptive @ 8c58de412b17ecb30a590d6982e11e91b0fea459
#
# ClearTechnical is private. Cloud agents and this public repo's GitHub Actions
# must set SKIP_CLEAR_TECHNICAL=1. Local machines with repo access omit it.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
styles_dir="$repo_root/styles"

WRITESIMPLY_URL="${WRITESIMPLY_URL:-https://github.com/edmundmiller/WriteSimply/releases/download/v1.0.0/WriteSimply.zip}"
WRITESIMPLY_SHA256="${WRITESIMPLY_SHA256:-4a6fc7a06c9ccdd33c6ec8e7070ff12e567ad8bc97b533c174b6245a12c3a5a2}"

LLMCLICHES_REPO="${LLMCLICHES_REPO:-https://github.com/edmundmiller/vale-llm-cliches}"
LLMCLICHES_REF="${LLMCLICHES_REF:-d74b5d40421855c3a82352a3177226dae6d3a58f}"
LLMCLICHES_PATH="${LLMCLICHES_PATH:-package/LLMCliches}"

CLEAR_TECHNICAL_REPO="${CLEAR_TECHNICAL_REPO:-https://github.com/edmundmiller/ClearTechnical}"
CLEAR_TECHNICAL_REF="${CLEAR_TECHNICAL_REF:-8c58de412b17ecb30a590d6982e11e91b0fea459}"

step() {
  printf '==> %s\n' "$1"
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    printf 'Missing required command: %s\n' "$1" >&2
    exit 1
  }
}

checkout_ref() {
  local url="$1"
  local ref="$2"
  local dest="$3"
  rm -rf "$dest"
  mkdir -p "$dest"
  git -C "$dest" init --quiet
  git -C "$dest" remote add origin "$url"
  git -C "$dest" fetch --quiet --depth=1 origin "$ref" || return 1
  git -C "$dest" checkout --quiet --detach FETCH_HEAD || return 1
}

install_style_files() {
  local source="$1"
  local dest="$2"
  if [[ ! -d "$source" ]]; then
    printf 'Style directory missing: %s\n' "$source" >&2
    exit 1
  fi
  rm -rf "$dest"
  mkdir -p "$dest"
  find "$source" -maxdepth 1 -type f ! -name '*.test.yml' -exec cp {} "$dest/" \;
}

find_style_dir() {
  local checkout="$1"
  local name="$2"
  local candidate
  local candidates=(
    "$checkout/$name"
    "$checkout/styles/$name"
    "$checkout/package/$name"
    "$checkout/packages/$name"
    "$checkout/.vale/styles/$name"
    "$checkout/.vale/packages/$name"
    "$checkout/$name/$name"
  )
  for candidate in "${candidates[@]}"; do
    if [[ -d "$candidate" ]] && compgen -G "$candidate"/*.yml >/dev/null; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done
  return 1
}

install_ste_stubs() {
  local style
  for style in STE STEDescriptive; do
    rm -rf "$styles_dir/$style"
    mkdir -p "$styles_dir/$style"
    printf 'skipped: SKIP_CLEAR_TECHNICAL=1\n' >"$styles_dir/$style/.skipped"
  done
}

require_cmd curl
require_cmd git
require_cmd unzip
require_cmd sha256sum
require_cmd find
require_cmd cp

workdir="$(mktemp -d)"
trap 'rm -rf "$workdir"' EXIT

mkdir -p "$styles_dir"

step "Install WriteSimply v1.0.0"
writesimply_zip="$workdir/WriteSimply.zip"
curl --fail --location --silent --show-error --retry 3 \
  "$WRITESIMPLY_URL" \
  --output "$writesimply_zip"
printf '%s  %s\n' "$WRITESIMPLY_SHA256" "$writesimply_zip" | sha256sum --check --strict -
unzip -q "$writesimply_zip" -d "$workdir/writesimply"
if [[ ! -d "$workdir/writesimply/WriteSimply" ]]; then
  printf 'WriteSimply.zip did not contain a WriteSimply/ directory\n' >&2
  exit 1
fi
rm -rf "$styles_dir/WriteSimply"
mkdir -p "$styles_dir/WriteSimply"
find "$workdir/writesimply/WriteSimply" -maxdepth 1 -type f -exec cp {} "$styles_dir/WriteSimply/" \;

step "Install LLMCliches ${LLMCLICHES_REF}"
checkout_ref "$LLMCLICHES_REPO" "$LLMCLICHES_REF" "$workdir/llmcliches"
install_style_files "$workdir/llmcliches/$LLMCLICHES_PATH" "$styles_dir/LLMCliches"
if [[ ! -f "$styles_dir/LLMCliches/AIVocabulary.yml" ]]; then
  printf 'LLMCliches install did not produce AIVocabulary.yml\n' >&2
  exit 1
fi

if [[ "${SKIP_CLEAR_TECHNICAL:-}" == "1" ]]; then
  step "Skip private ClearTechnical (SKIP_CLEAR_TECHNICAL=1)"
  install_ste_stubs
else
  step "Install ClearTechnical ${CLEAR_TECHNICAL_REF}"
  if ! checkout_ref "$CLEAR_TECHNICAL_REPO" "$CLEAR_TECHNICAL_REF" "$workdir/cleartechnical"; then
    printf 'ClearTechnical clone failed. The repo is private.\n' >&2
    printf 'Set SKIP_CLEAR_TECHNICAL=1 on cloud/CI, or set CLEAR_TECHNICAL_REPO to a reachable URL.\n' >&2
    exit 1
  fi
  ste_dir="$(find_style_dir "$workdir/cleartechnical" STE)" || {
    printf 'Could not find an STE style directory in ClearTechnical\n' >&2
    exit 1
  }
  ste_descriptive_dir="$(find_style_dir "$workdir/cleartechnical" STEDescriptive)" || {
    printf 'Could not find an STEDescriptive style directory in ClearTechnical\n' >&2
    exit 1
  }
  install_style_files "$ste_dir" "$styles_dir/STE"
  install_style_files "$ste_descriptive_dir" "$styles_dir/STEDescriptive"
fi

printf 'Vale styles installed in %s\n' "$styles_dir"
printf 'WriteSimply LLMCliches'
if [[ -f "$styles_dir/STE/.skipped" ]]; then
  printf ' STE(skipped) STEDescriptive(skipped)\n'
else
  printf ' STE STEDescriptive\n'
fi

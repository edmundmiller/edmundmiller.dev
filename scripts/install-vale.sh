#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
version="$(<"$repo_root/.vale-version")"
install_dir="$HOME/.local/bin"
vale="$install_dir/vale"

case "$(uname -m)" in
  x86_64) asset="vale_${version}_Linux_64-bit.tar.gz" ;;
  aarch64 | arm64) asset="vale_${version}_Linux_arm64.tar.gz" ;;
  *) printf 'Unsupported architecture: %s\n' "$(uname -m)" >&2; exit 1 ;;
esac

if [[ ! -x "$vale" ]] || [[ "$($vale --version)" != "vale version $version" ]]; then
  temporary="$(mktemp -d)"
  trap 'rm -rf "$temporary"' EXIT
  release="https://github.com/errata-ai/vale/releases/download/v${version}"

  curl --fail --location --silent --show-error --retry 3 \
    "$release/vale_${version}_checksums.txt" \
    --output "$temporary/checksums.txt"
  curl --fail --location --silent --show-error --retry 3 \
    "$release/$asset" \
    --output "$temporary/$asset"
  (
    cd "$temporary"
    grep -F "  $asset" checksums.txt | sha256sum --check --strict -
  )

  tar -xzf "$temporary/$asset" -C "$temporary" vale
  mkdir -p "$install_dir"
  install -m 0755 "$temporary/vale" "$vale"
fi

"$vale" --version

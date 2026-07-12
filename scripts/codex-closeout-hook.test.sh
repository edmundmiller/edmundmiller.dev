#!/usr/bin/env bash
set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)
hook="$root/scripts/codex-closeout-hook"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

mkdir -p "$tmp/bin" "$tmp/repo"
cat >"$tmp/bin/br" <<'EOF'
#!/usr/bin/env bash
printf '%s\n' "$*" >>"$BR_LOG"
EOF
chmod +x "$tmp/bin/br"

git -C "$tmp/repo" init -q
git -C "$tmp/repo" config user.email test@example.com
git -C "$tmp/repo" config user.name Test
touch "$tmp/repo/tracked"
git -C "$tmp/repo" add tracked
git -C "$tmp/repo" commit -qm initial
git init -q --bare "$tmp/origin.git"
git -C "$tmp/repo" remote add origin "$tmp/origin.git"
git -C "$tmp/repo" push -qu origin HEAD:main
git -C "$tmp/repo" branch --set-upstream-to=origin/main >/dev/null

export BR_LOG="$tmp/br.log"
output=$(printf '{"cwd":"%s","hook_event_name":"Stop"}\n' "$tmp/repo" |
  PATH="$tmp/bin:$PATH" bash "$hook")

test -z "$output"
grep -qx 'sync --flush-only' "$BR_LOG"

printf 'dirty\n' >>"$tmp/repo/tracked"
output=$(printf '{"cwd":"%s","hook_event_name":"Stop"}\n' "$tmp/repo" |
  PATH="$tmp/bin:$PATH" bash "$hook")
printf '%s' "$output" | python3 -c '
import json, sys
result = json.load(sys.stdin)
assert result["decision"] == "block"
assert "uncommitted" in result["reason"]
'

git -C "$tmp/repo" add tracked
git -C "$tmp/repo" commit -qm local
output=$(printf '{"cwd":"%s","hook_event_name":"Stop"}\n' "$tmp/repo" |
  PATH="$tmp/bin:$PATH" bash "$hook")
printf '%s' "$output" | python3 -c '
import json, sys
result = json.load(sys.stdin)
assert result["decision"] == "block"
assert "unpushed" in result["reason"]
'

git -C "$tmp/repo" push -qu
git clone -q "$tmp/origin.git" "$tmp/other"
git -C "$tmp/other" config user.email test@example.com
git -C "$tmp/other" config user.name Test
printf 'remote\n' >>"$tmp/other/tracked"
git -C "$tmp/other" add tracked
git -C "$tmp/other" commit -qm remote
git -C "$tmp/other" push -qu origin HEAD:main

output=$(printf '{"cwd":"%s","hook_event_name":"Stop"}\n' "$tmp/repo" |
  PATH="$tmp/bin:$PATH" bash "$hook")
printf '%s' "$output" | python3 -c '
import json, sys
result = json.load(sys.stdin)
assert result["decision"] == "block"
assert "behind" in result["reason"]
'

cat >"$tmp/bin/br" <<'EOF'
#!/usr/bin/env bash
exit 1
EOF
output=$(printf '{"cwd":"%s","hook_event_name":"Stop"}\n' "$tmp/repo" |
  PATH="$tmp/bin:$PATH" bash "$hook")
printf '%s' "$output" | python3 -c '
import json, sys
result = json.load(sys.stdin)
assert result["decision"] == "block"
assert "br sync" in result["reason"]
'

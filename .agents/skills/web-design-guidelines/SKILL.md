---
name: web-design-guidelines
description: Reviews UI against Web Interface Guidelines. Use for requested accessibility, UX, or interface-quality audits.
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review the requested UI scope against the current Web Interface Guidelines. Infer files from the
request or current changes; ask only when the intended scope is unclear.

Fetch the rules for the review:

[Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md)

Report actionable findings with file/line references and the violated rule. Follow the user's
requested output format; otherwise keep findings terse. If the source is unavailable, state that
limitation rather than claiming a complete compliance review.

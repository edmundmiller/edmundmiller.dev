---
name: agent-browser
description: Automates browsers and Electron apps with agent-browser. Use for interactive web tasks, screenshots, scraping, or browser-based QA.
allowed-tools: Bash(agent-browser:*), Bash(npx agent-browser:*)
hidden: true
---

# agent-browser

Chrome/Chromium automation via CDP with accessibility-tree snapshots and `@eN` element refs.

If missing, install with `npm i -g agent-browser && agent-browser install`.

## Version-matched instructions

Load the workflow needed from the installed CLI:

```bash
agent-browser skills get core             # browser workflows and troubleshooting
agent-browser skills get core --full      # full command reference and templates when needed
```

## Specialized skills

For specialized tasks, load only the relevant guide:

```bash
agent-browser skills get electron          # Electron desktop apps (VS Code, Slack, Discord, Figma, ...)
agent-browser skills get slack             # Slack workspace automation
agent-browser skills get dogfood           # Exploratory testing / QA / bug hunts
agent-browser skills get derive-client     # Record a HAR, derive a standalone API client for a site
agent-browser skills get vercel-sandbox    # agent-browser inside Vercel Sandbox microVMs
agent-browser skills get agentcore         # AWS Bedrock AgentCore cloud browsers
```

Run `agent-browser skills list` to see everything available on the installed version.

## Observability Dashboard

The dashboard runs independently of browser sessions on port 4848 and can also be opened through a proxied or forwarded URL such as `https://dashboard.agent-browser.localhost`. Agents should stay on the dashboard origin: session tabs, status, and stream traffic are proxied internally, so session ports do not need to be exposed.

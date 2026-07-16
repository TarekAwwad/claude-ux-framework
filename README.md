# ux-framework

A Claude Code skill that moves agents from "nice UI" to UX-driven UI
development. Agents are good at local polish (a pretty component, a clean
color scheme) and bad at project-wide UX: information architecture, user
goals, flows across screens, state handling, density decisions. This skill
fixes that with an enforced process, not a rulebook.

## What it does

**Build mode.** Before any UI code, the agent writes a short UX spec (who the
user is, their top tasks, where the screen sits in the app, a states matrix).
It then loads the reference module matching the UI type (dashboards,
navigation), builds, and self-audits against a checklist before declaring
done.

**Audit mode.** Ask for a UX review of an existing app and the agent
inventories screens and flows, looks at the rendered UI where possible, and
returns prioritized findings scored by severity and effort.

## Install

Copy or link `skills/ux-framework/` into your skills directory:

    # PowerShell (junction, no admin needed)
    New-Item -ItemType Junction -Path "$HOME\.claude\skills\ux-framework" -Target "<repo>\skills\ux-framework"

    # or just copy
    cp -r skills/ux-framework ~/.claude/skills/

## Scope

Web apps, stack-agnostic. v1 modules: dashboards and data-heavy UIs,
navigation and app shell. Forms and tables are planned as future modules.

## Repo layout

- `skills/ux-framework/` is the installable skill (self-contained)
- `research/` holds the findings the rules were distilled from, with sources
- `docs/superpowers/` holds the design spec and this plan

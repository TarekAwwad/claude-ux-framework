# claude-ux-framework

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Claude Code skill](https://img.shields.io/badge/Claude_Code-skill-blue)](skills/ux-framework/SKILL.md)

A Claude Code skill that moves agents from "nice UI" to UX-driven UI
development. Agents are good at local polish (a pretty component, a clean
color scheme) and bad at project-wide UX: information architecture, user
goals, flows across screens, state handling, density decisions. This skill
fixes that with an enforced process, not a rulebook.

![Same prompt, built without and with the skill](docs/assets/hero-before-after.png)

## Same prompt, with and without

One dashboard prompt, two agents, one with the skill and one without. Both
outputs were rendered headless and scored against the skill's audit
checklist. Full method, findings, and caveats: [docs/validation.md](docs/validation.md).

| | Blocker | Major | Minor |
|---|---|---|---|
| Without the skill | 1 | 2 | 4 |
| With the skill | 0 | 0 | 0 |

The caveats, stated plainly: this is an n=1 smoke test, scored with the
skill's own checklist, and both agents shared a chart-guidance skill, so
chart-level wins are excluded from the delta.

The widest gap was state handling. The baseline ships the happy path plus
one empty message. The with-skill build implements empty, loading, error,
partial, and ideal for every region of the screen:

![Loading, empty, error, and partial states of the with-skill build](docs/assets/states-grid.png)

Both builds, the UX spec the skill produced, and the capture script are in
[examples/](examples/).

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

    git clone https://github.com/TarekAwwad/claude-ux-framework

Then copy or link `skills/ux-framework/` into your skills directory:

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
- `examples/` holds both smoke-test builds, the spec, and the screenshots
- `docs/validation.md` records the with/without smoke test

## Contributing

Issues and PRs welcome. Most useful right now: run audit mode on a real app
and report where the checklist misses, and tell me which module you want
next, forms or tables.

## License

[MIT](LICENSE)

# Design: `ux-framework` skill

**Date:** 2026-07-16
**Status:** Draft, pending user approval

## Problem

Agents (Claude included) are good at local UI polish: a pretty component, a
nice color scheme. They are bad at project-wide UX, especially for heavy UIs
like dashboards: information architecture, user goals, flows across screens,
state handling (empty/loading/error), density and hierarchy decisions. The
result is UIs that look nice but aren't designed around what the user is
trying to do.

## Goal

A skill ("the ux framework") that moves agents from nice-UI generation to
UX-driven UI development. It must be comprehensive enough to matter and small
enough to actually get read and followed.

## Decisions made during brainstorming

- **Usage mode:** both build-time guidance and audit of existing UIs.
- **v1 deep-dive modules:** dashboards & data-heavy UIs, navigation & app shell.
  (Forms, tables, etc. are future modules; the structure must make adding them
  one-file cheap.)
- **Stack scope:** web-focused, stack-agnostic. Principles and patterns, no
  framework-specific code recipes.
- **Distribution:** standalone skill repo in this directory, installable by
  copying/symlinking the skill folder into `~/.claude/skills`.
- **Scripts:** none in v1. Templates and checklists as markdown do the job.
  The structure reserves the option to add scripts later if one proves
  necessary.
- **Approach:** process-first. The core of the skill is a workflow that forces
  UX thinking before code, not a passive rulebook. Knowledge lives in
  on-demand reference modules.

## Repo layout

```
Claude-UX-skill-creator/
├── skills/ux-framework/
│   ├── SKILL.md                  # core: triggers, the two workflows, hard rules
│   ├── references/
│   │   ├── principles.md         # generic UX rules, compact, always relevant
│   │   ├── dashboards.md         # data-heavy UI module
│   │   ├── navigation.md         # app shell / IA module
│   │   └── audit-checklist.md    # scored checklist shared by both modes
│   └── templates/
│       └── ux-spec.md            # the per-project UX pass artifact
├── research/                     # findings docs with source attribution
├── docs/superpowers/specs/       # design docs (this file)
└── README.md                     # what it is, how to install
```

The skill folder is self-contained. Installing it is copying one directory.

## The skill

### Build mode

Triggered when creating or substantially modifying UI. Enforced order:

1. **UX pass before any UI code.** Fill in the `ux-spec` template:
   - primary user and usage context
   - top user tasks, ranked
   - where the screen(s) sit in the app's IA
   - states matrix per view: empty, loading, error, partial, ideal
   The spec scales down for small features (a few lines is fine) but must
   exist in writing before UI code is written.
2. **Load the matching module.** A short routing table in SKILL.md maps UI
   type to reference file: dashboard-like work loads `dashboards.md`,
   navigation/shell work loads `navigation.md`, everything else uses
   `principles.md` alone.
3. **Build**, following principles plus module rules.
4. **Self-audit before declaring done.** Walk `audit-checklist.md`; fix
   violations or explicitly justify them to the user.

SKILL.md states a handful of hard rules up front as the enforcement layer.
Examples: "no UI code before the UX pass is written", "every view handles all
five states", "every screen answers: what is the one thing the user does
here".

### Audit mode

Triggered by requests like "review the UX of this app". Steps:

1. Inventory screens and primary flows from the codebase (routes, pages).
2. Look at the real rendered UI where possible: run the app and screenshot
   with existing tools; fall back to reading code when running isn't feasible.
3. Score against `audit-checklist.md`.
4. Deliver prioritized findings (severity x effort) with concrete fixes.

Same knowledge as build mode, second entry point. No additional content.

## Content and sizing discipline

- Every rule is imperative and checkable. "One primary action per screen",
  not "consider visual hierarchy".
- A rule earns its place only if agents actually get it wrong by default.
  Anything the base model already does reliably gets cut.
- Budgets: SKILL.md at most ~150 lines; each reference file at most ~300
  lines.
- Boundary with existing skills: `frontend-design` owns visual aesthetics,
  `dataviz` owns chart-level design. `ux-framework` sits above them
  (structure, flows, states, IA), stays self-contained, and does not
  duplicate their territory.

## Research phase (before writing skill content)

Parallel research agents; findings saved to `research/` with sources cited:

1. **Existing skills sweep.** Anthropic's official skills repo, superpowers,
   community collections (awesome-claude-skills and similar). Review the best
   UX/design/frontend skills for structure and content. Record what to adopt
   and what to avoid.
2. **Practitioner best practices.** Kole Jain's YouTube content, Nielsen
   Norman Group heuristics, Laws of UX, Refactoring UI, dashboard-UX
   literature (Stephen Few school), navigation and IA patterns.

Findings are reviewed, then distilled into the skill content. Every rule in
the skill should be traceable to a source or a known agent failure mode.

## Validation

Smoke test in a scratch project: run the same UI-building prompt (for
example, "build an analytics dashboard for X") with and without the skill and
compare outputs. The `skill-creator` eval tooling is available if we want
formal benchmarks later.

## Out of scope for v1

- Companion scripts (screenshot runner, IA crawler). Add later only if the
  markdown-only approach proves insufficient.
- Forms, tables, onboarding modules. The structure supports adding them as
  future one-file modules.
- Mobile and desktop-native UX.
- Framework-specific (React/Tailwind) implementation recipes.

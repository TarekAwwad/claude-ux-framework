# Run 2026-07-20b (suite v2 wording)

- Date: 2026-07-20, second run of the day
- Suite commit: 6665473 (v2 contract: uniform reachability standard,
  pinned light default theme; extended checks.js)
- Skill unchanged since b41695e
- Supervising session model: claude-fable-5 (Claude Code, VSCode extension, Windows)
- Subagent type: general-purpose, one fresh agent per side, launched in
  parallel, neither seeing the other's output
- Other skills present in the session and available to both agents:
  dataviz, frontend-design (plugin), superpowers suite, codex plugin
- Purpose: end-to-end exercise of the v2 contract (reachability wording,
  theme pinning) before pushing the suite
- Screenshots deferred until after scoring, per protocol

## Run observations

- The theme pin bound: the baseline shipped light-by-default with dark via
  prefers-color-scheme, exactly as the contract requires.
- Prompt-leak observation: the baseline adopted "one chart with a series
  switcher", the verbatim example given in the consolidation clause. The
  clause was written to permit consolidation, but the concrete example
  appears to have steered the layout; the v1 baseline, without that
  example, built three separate charts. Candidate v3 wording: state the
  permission without naming a concrete pattern.
- Baseline build time: about 2 minutes, 3 tool uses.

## Composed baseline prompt (verbatim)

Build a single-page analytics dashboard as one self-contained HTML file
(vanilla JS + inline CSS, no external dependencies) for a B2B SaaS product
named Ledgerline. The primary user is a startup founder checking business
health each morning.

Data contract: read d:/Code/Claude-UX-skill-creator/validation/fixtures/data.json
and hardcode exactly that data. Do not invent, rename, omit, or add data
elements. Every one of the following must be reachable in the rendered UI
(visible directly, or behind a visible control such as a tab, toggle,
filter, or scroll; never only in source or comments): (1) MRR and its
13-month history; (2) monthly churn rate and its history; (3) weekly
active users and its history; (4) the feature adoption percentages for all
7 listed features; (5) the recent signups list, with all six fields for
all 14 rows. Consolidating views (for example one chart with a series
switcher) is allowed as long as everything stays reachable.

Theme: default to a light theme. A dark theme is optional; if you build
one, honor prefers-color-scheme.

Apart from the fixture file (and any files your instructions above require),
do not read other files from d:/Code/Claude-UX-skill-creator.

Save the app to d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-20b/baseline/index.html.
Do not ask questions; make reasonable assumptions. When done, return the
paths of every file you wrote.

## Composed with-skill prompt (verbatim)

Read d:/Code/Claude-UX-skill-creator/skills/ux-framework/SKILL.md and follow
it fully, including its hard rules, referenced files, and templates (resolve
relative paths against the SKILL.md location). Save the filled UX spec to
d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-20b/with-skill/ux-spec.md.
Record your assumptions in the spec. Then complete the task below.

---

[Identical to the baseline prompt above, with the save path
d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-20b/with-skill/index.html]

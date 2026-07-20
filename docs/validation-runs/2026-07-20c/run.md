# Run 2026-07-20c (suite v4: pinned style tokens)

- Date: 2026-07-20, third run of the day
- Suite commit: 101494e (v4: tokens.css fixture, style contract, token
  checks; consolidation example removed at f27f768)
- Skill unchanged since b41695e
- Supervising session model: claude-fable-5 (Claude Code, VSCode extension, Windows)
- Subagent type: general-purpose, one fresh agent per side, launched in
  parallel, neither seeing the other's output
- Other skills present in the session and available to both agents:
  dataviz, frontend-design (plugin), superpowers suite, codex plugin
- Purpose: end-to-end exercise of the v4 style pinning before push
- Screenshots deferred until after scoring, per protocol

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
all 14 rows. You may combine or separate views however you judge best, as
long as everything stays reachable.

Style contract: inline the design tokens from
d:/Code/Claude-UX-skill-creator/validation/fixtures/tokens.css verbatim
and build strictly from them. Every color, font, radius, shadow, and
spacing value must come from a token; do not introduce new colors or
one-off spacing values. Light is the token default; a dark theme is
optional and comes only from the provided prefers-color-scheme block. How
you apply the tokens (layout, hierarchy, emphasis, components, states) is
entirely your decision.

Apart from the fixture files (and any files your instructions above require),
do not read other files from d:/Code/Claude-UX-skill-creator.

Save the app to d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-20c/baseline/index.html.
Do not ask questions; make reasonable assumptions. When done, return the
paths of every file you wrote.

## Composed with-skill prompt (verbatim)

Read d:/Code/Claude-UX-skill-creator/skills/ux-framework/SKILL.md and follow
it fully, including its hard rules, referenced files, and templates (resolve
relative paths against the SKILL.md location). Save the filled UX spec to
d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-20c/with-skill/ux-spec.md.
Record your assumptions in the spec. Then complete the task below.

---

[Identical to the baseline prompt above, with the save path
d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-20c/with-skill/index.html]

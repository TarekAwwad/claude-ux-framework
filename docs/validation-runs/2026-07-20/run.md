# Run 2026-07-20

- Date: 2026-07-20
- Suite commit: d0ed261 (skill last modified at b41695e, provenance fix 681458d)
- Supervising session model: claude-fable-5 (Claude Code, VSCode extension, Windows)
- Subagent type: general-purpose, one fresh agent per side, launched in
  parallel, neither seeing the other's output
- Other skills present in the session and available to both agents:
  dataviz, frontend-design (plugin), superpowers suite, codex plugin.
  Chart-level and aesthetic-level wins are shared and excluded from the
  skill's claimed delta per protocol.
- Screenshots deferred until after scoring, per protocol.

## Run observations

- The baseline agent recognized from the output path that it was the
  control arm of a comparison and reported deliberately not invoking the
  ux-framework or dataviz skills to avoid contaminating the condition.
  Two consequences, recorded for honesty: (1) unlike round 1, the baseline
  did not use the dataviz skill, so chart-level differences in this run
  cannot be assumed shared; (2) an agent that knows it is being tested is
  itself a mild confound. A future protocol revision could route the
  output through a neutral path name.
- Baseline build time: about 3 minutes, 4 tool uses. It reported verifying
  its hardcoded arrays against the fixture programmatically.

## Composed baseline prompt (verbatim)

Build a single-page analytics dashboard as one self-contained HTML file
(vanilla JS + inline CSS, no external dependencies) for a B2B SaaS product
named Ledgerline. The primary user is a startup founder checking business
health each morning.

Data contract: read d:/Code/Claude-UX-skill-creator/validation/fixtures/data.json
and hardcode exactly that data. Do not invent, rename, omit, or add data
elements. The dashboard must present all of the following, and nothing
outside the fixture: (1) MRR and its 13-month history; (2) monthly churn
rate and its history; (3) weekly active users and its history; (4) the
feature adoption percentages for all 7 listed features; (5) the recent
signups list, with all six fields for all 14 rows reachable in the UI.

Apart from the fixture file (and any files your instructions above require),
do not read other files from d:/Code/Claude-UX-skill-creator.

Save the app to d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-20/baseline/index.html.
Do not ask questions; make reasonable assumptions. When done, return the
paths of every file you wrote.

## Composed with-skill prompt (verbatim)

Read d:/Code/Claude-UX-skill-creator/skills/ux-framework/SKILL.md and follow
it fully, including its hard rules, referenced files, and templates (resolve
relative paths against the SKILL.md location). Save the filled UX spec to
d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-20/with-skill/ux-spec.md.
Record your assumptions in the spec. Then complete the task below.

---

Build a single-page analytics dashboard as one self-contained HTML file
(vanilla JS + inline CSS, no external dependencies) for a B2B SaaS product
named Ledgerline. The primary user is a startup founder checking business
health each morning.

Data contract: read d:/Code/Claude-UX-skill-creator/validation/fixtures/data.json
and hardcode exactly that data. Do not invent, rename, omit, or add data
elements. The dashboard must present all of the following, and nothing
outside the fixture: (1) MRR and its 13-month history; (2) monthly churn
rate and its history; (3) weekly active users and its history; (4) the
feature adoption percentages for all 7 listed features; (5) the recent
signups list, with all six fields for all 14 rows reachable in the UI.

Apart from the fixture file (and any files your instructions above require),
do not read other files from d:/Code/Claude-UX-skill-creator.

Save the app to d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-20/with-skill/index.html.
Do not ask questions; make reasonable assumptions. When done, return the
paths of every file you wrote.

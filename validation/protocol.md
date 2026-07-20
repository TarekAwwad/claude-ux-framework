# Validation protocol: the with/without test

A reproducible procedure for comparing what an agent builds with the
ux-framework skill against what the same prompt produces without it. It
exists because the first ad hoc run (2026-07-16) had confounds this
protocol eliminates: the two prompts were not symmetric (the persona
appeared only on the with-skill side), the data was not pinned (each build
invented its own metrics and columns, making the outputs incomparable),
the prompts were not recorded, and scoring leaned on static screenshots
(which misread a scrollable table as dropped columns).

## Design rules

1. Symmetric prompts. Both agents get the byte-identical body in
   prompts/common-body.md. The with-skill agent additionally gets the
   preamble in prompts/with-skill.md. That preamble is the entire
   experimental variable.
2. Pinned data and style. fixtures/data.json is the single source of data
   and fixtures/tokens.css the single source of visual style (palette,
   font, radius, shadow, spacing scale). Both builds must hardcode the
   data and inline the tokens verbatim, and the automated checks verify
   both. Same elements, same numbers, same tokens: every visible
   difference is then a design judgment, not a data or palette accident.
   What stays free is everything the skill claims to move: layout,
   hierarchy, emphasis, states, density, table affordances, and where the
   semantic tokens get applied. Accepted trade-off: palette selection
   discipline is no longer observable, since the palette is supplied.
3. Fresh, isolated agents. One new subagent per side, launched in the same
   session, neither seeing the other's output. The prompt forbids reading
   repo files beyond the fixture (plus the skill files, with-skill side
   only).
4. Code and interaction over screenshots. Automated checks run in a real
   browser and read the source. Static screenshots are captured last, for
   documentation, never as scoring evidence for responsive or motion
   behavior.

## Running a round

1. Record the environment in `runs/<date>/run.md`: date, model, skill
   commit hash (`git rev-parse --short HEAD`), and which other skills are
   present in the session (note especially a dataviz or frontend-design
   skill; they are shared by both sides and their wins are excluded from
   the skill's claimed delta).
2. Create `runs/<date>/baseline/` and `runs/<date>/with-skill/`.
3. Compose the two prompts: substitute `<REPO>` with the repo root and
   `<OUTPUT_DIR>` with the respective run subdirectory. Baseline = common
   body only. With-skill = preamble, then the common body.
4. Launch both subagents in parallel, one prompt each. Store both composed
   prompts verbatim in `runs/<date>/run.md`.
5. Score, in this order:
   a. `node checks.js runs/<date>/baseline runs/<date>/with-skill`
      (objective subset; writes checks-report.json into each build dir).
   b. Manual audit of both builds against every check in
      skills/ux-framework/references/audit-checklist.md, reading code and
      interacting with the page for anything a screenshot cannot show.
      Record per-check verdicts in `runs/<date>/scorecard.md`.
6. Only after scoring: capture screenshots for documentation. Any
   side-by-side comparison image must render both builds in the same
   forced color scheme (Playwright colorScheme option), light unless
   there is a reason otherwise.
7. Prompt or fixture changes version the suite: note the suite commit in
   run.md (already required) and never compare scores across runs made
   with different prompt wording without saying so.
7b. After both agents finish, run `git status` at the repo root: agents
   sometimes drop intermediate work files outside their run directory.
   Delete strays before committing anything.
8. Publishing: every run that was scored gets reported. If more than one
   round was run, docs/validation.md reports all of them, including
   retracted findings; no picking the best run without saying so.

## Requirements

Node, Playwright, and a local Chrome (same as examples/shots.js; install
Playwright anywhere and point NODE_PATH at it). `runs/` is gitignored;
published artifacts are copied into examples/ by an explicit decision.

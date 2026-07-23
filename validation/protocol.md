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

1. Symmetric prompts. Both agents get the byte-identical body in the
   scenario's common-body file (see Scenarios). Each side additionally gets
   a preamble: prompts/with-skill.md tells the with-skill agent to read and
   follow the skill; prompts/baseline.md tells the baseline agent not to use
   or read the skill. The opposed pair of preambles is the entire
   experimental variable. The explicit baseline exclusion is required
   because the ux-framework skill is installed in the running session and
   auto-triggers on "build a UI", so a fresh subagent will otherwise invoke
   it on its own and contaminate the control (observed both ways: a baseline
   that followed the skill, and, in an earlier run, a baseline that guessed
   the setup and abstained).
2. Pinned data and style. The scenario's fixture (see Scenarios) is the
   single source of data
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

## Scenarios

The suite has three scenarios. Each is a (common body, fixture) pair; all
share tokens.css and the preambles in prompts/.

- dashboard: prompts/common-body.md + fixtures/data.json
- tables: prompts/tables-common-body.md + fixtures/tables-data.json
- full: prompts/full-common-body.md + both fixtures/data.json and
  fixtures/tables-data.json

The dashboard and tables scenarios test one UI type each in isolation. The
full scenario puts both a dashboard region and a data grid on a single
build, so the whole framework is exercised on one artifact and the entire
audit checklist applies (the dashboard checks C17-C24, the tables checks
C31-C40, and the shared state/hierarchy/nav checks). It reuses both pinned
fixtures verbatim; no new data is authored.

checks.js takes `--scenario=<name>` (default dashboard). For the full
scenario it loads both fixtures and runs the union of the two scenarios'
checks, with the shared source/runtime/control/narrow checks run once. A
run directory holds exactly one scenario; name tables run directories
`runs/<date>-tables/` and full run directories `runs/<date>-full/` (and
`runs/<date>-tables-diag/` for diagnostic runs, see below). A diagnostic
run is a single-sided no-skill build used to source rules; it is never
reported as a scored pair, and any published pair whose rules were partly
sourced from a diagnostic of the same scenario must say so in its run log.

## Running a round

1. Record the environment in `runs/<date>/run.md`: date, model, skill
   commit hash (`git rev-parse --short HEAD`), and which other skills are
   present in the session (note especially a dataviz or frontend-design
   skill; they are shared by both sides and their wins are excluded from
   the skill's claimed delta).
2. Create `runs/<date>/baseline/` and `runs/<date>/with-skill/`.
3. Compose the two prompts: substitute `<REPO>` with the repo root and
   `<OUTPUT_DIR>` with the respective run subdirectory. Baseline = the
   baseline preamble (prompts/baseline.md), then the scenario's common
   body. With-skill = the with-skill preamble (prompts/with-skill.md),
   then the scenario's common body.
4. Launch both subagents in parallel, one prompt each. Store both composed
   prompts verbatim in `runs/<date>/run.md`.
5. Score, in this order:
   a. `node checks.js runs/<date>/baseline runs/<date>/with-skill
      [--scenario=<name>]` (objective subset; writes checks-report.json
      into each build dir).
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

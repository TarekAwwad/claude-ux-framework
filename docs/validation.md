# Validation: the with/without test

The skill's effect is measured by building the same dashboard twice, one
agent with the skill and one without, and scoring both against the skill's
40-check audit checklist. Since 2026-07-20 this runs under a reproducible
suite ([../validation/](../validation/)): symmetric prompts whose only
difference is the skill preamble, a pinned fixture dataset both builds
must hardcode verbatim, a pinned design-token file both builds must style
from (so comparisons stop being palette contests), an automated Playwright
check script for the objectively verifiable subset, and a written protocol
that records prompts and environment per run and forbids silent best-of-N
selection.

The published example pair in [../examples/](../examples/) is run
2026-07-20c, the strictest run to date. Full logs and scorecards for every
run are in [validation-runs/](validation-runs/).

## Published pair: run 2026-07-20c

Same prompt, same persona, same data, same design tokens. The only
difference between the two agents was the instruction to read and follow
the skill.

| Build | Blocker | Major | Minor |
|-------|---------|-------|-------|
| Without the skill | 1 | 2 | 1 |
| With the skill | 0 | 0 | 0 |

The baseline's failures: zero state handling of any kind (the blocker), a
static table with no search, sort, or filter, page-level horizontal
overflow at phone width, and bare-label card titles. The with-skill build
cleared all 30 checks; the same page-overflow bug the baseline shipped was
caught and fixed by the with-skill agent's own render-and-verify pass.

Because the styling is pinned, the judgment differences are directly
visible in the side-by-side captures: insight titles ("MRR keeps
compounding", "Recent signups: 5 open trials, 1 churned") versus bare
labels, year-ago context on every KPI, a follow-up framing that turns the
signups table into an action list, and working search, filters, and
keyboard-accessible sorting.

## Tables scenario: run 2026-07-21-tables

This run scores a different scenario: a 400-account customer grid for a
B2B SaaS product (Ledgerline), not the dashboard used in the published
pair above. It runs under the same reproducible suite: the same
pinned-data discipline (each scenario pins its own fixture: data.json for
the dashboard, tables-data.json here), the same pinned design tokens, and
prompts identical except for the skill preamble.

| Build | Blocker | Major | Minor |
|-------|---------|-------|-------|
| Baseline | 1 | 4 | 2 |
| With-skill | 0 | 1 | 0 |

The with-skill build ships a real loading skeleton and a parse-error state
with Retry where the baseline has neither (C1, the run's only blocker); it
freezes the Company column and wraps the scroll region in a focusable,
labeled role=region where the baseline lets the column scroll off screen
and leaves the container unlabeled (C34, C40); and its sort headers and
detail panel manage focus where the baseline moves none and cannot be
sorted by keyboard at all (C36). This is not a clean sweep: the with-skill
build still fails C39, showing its Clear filters control on a fresh load
with no filter set, because a CSS specificity bug (`.btn { display:
inline-flex }`) overrides the `[hidden]` attribute meant to hide it.

The tables rules were partly sourced from a no-skill diagnostic run on
this same scenario (published in validation-runs/2026-07-20-tables-diag/).
That makes the scenario a favorable test for the skill, and the number to
weight accordingly; the baseline agent in the scored pair was fresh.

## All runs

| Run | Suite wording | Without | With | Notes |
|-----|---------------|---------|------|-------|
| 2026-07-16 (superseded) | ad hoc | 1 / 2 / 4 | 0 / 0 / 0 | asymmetric prompts, unpinned data; kept for history, method retired |
| 2026-07-20 | v1 | 1 / 3 / 3 | 0 / 0 / 0 | first suite run, pinned data |
| 2026-07-20b | v2 | 1 / 3 / 3 | 0 / 0 / 1 | reachability + theme pinned; with-skill dinged for an undeclared spacing scale |
| 2026-07-20c | v4 | 1 / 2 / 1 | 0 / 0 / 0 | design tokens pinned; published pair |
| 2026-07-21-tables | tables v1 | 1 / 4 / 2 | 0 / 1 / 0 | different scenario (customer table, not the dashboard); see the Tables scenario section above for its diagnostic-sourcing disclosure |

Scores across rows are not strictly comparable (the prompt wording
evolved between runs, and the token fixture in v4 pre-solves checks that
v1 baselines could fail); within each row the comparison is same-day,
same-prompt, same-environment.

## What persists across every dashboard-scenario run

The baseline improved run over run (later baselines picked up
focus-visible styling, and the token fixture gave them spacing
discipline for free). Five deltas survived every dashboard-scenario run
regardless of prompt wording or style constraints:

1. State handling: every dashboard baseline shipped zero empty, loading,
   error, or partial handling; every with-skill build implemented all of
   them.
2. Table affordances: no dashboard baseline table had search, filter, and
   working sort together; every with-skill table did.
3. Responsive containment: two of the three dashboard baselines shipped
   page-level horizontal overflow at phone width; every with-skill build
   contained scrolling (in run c, after its own verification pass caught
   and fixed exactly that bug).
4. Insight framing: baselines title cards with field names; with-skill
   builds title them with the finding and carry context (targets,
   year-ago comparisons) on every number.
5. Keyboard access: baseline interactions leaned mouse-only where they
   existed at all; with-skill builds kept controls focusable and
   keyboard-operable with visible focus states.

## Method notes and honesty items

- Scored with the skill's own checklist, by the supervising session
  rather than the build agents' self-audits; self-audit claims were
  verified in code and by interaction. Two of the reviewer's own
  provisional findings were reversed by code evidence during run b
  scoring and are recorded in that scorecard.
- The original 2026-07-16 comparison had method flaws the suite now
  prevents: the persona appeared only in the with-skill prompt, data was
  unpinned (the two builds did not even show the same elements), prompts
  went unrecorded, and one screenshot-based finding (mobile column loss)
  was retracted after code inspection showed a scrollable table.
  Screenshots are no longer scoring evidence for responsive or motion
  behavior.
- Baseline agents repeatedly inferred from the output path that they were
  the control arm and skipped optional session skills on their own; run
  logs record this. A neutral path name is a candidate improvement.
- Both agents in all runs had the same session skill inventory available
  (including a dataviz skill); only the ux-framework instruction
  differed. In v4 runs the token fixture supplies the palette, so
  chart-level styling is shared by construction.
- An earlier version of the prompt named "one chart with a series
  switcher" as an example of allowed consolidation, and the next baseline
  built exactly that pattern; the example was removed (suite commit
  f27f768) because permissive examples steer layout.

## Reproducing

Follow [../validation/protocol.md](../validation/protocol.md): compose
the two prompts from validation/prompts/, run one fresh agent per side,
score with validation/checks.js plus the manual checklist, and record
everything in a run log. The states in the published with-skill build are
real code paths, not a demo switcher; examples/shots.js documents how
each is captured honestly (JavaScript disabled for skeletons, a
zero-result search for empty, an injected render fault for error).

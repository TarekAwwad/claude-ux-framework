# Scorecard: run 2026-07-20c (suite v4, pinned style tokens)

Scored against all 30 checks. Automated subset via checks.js (now including
token-inline and foreign-hex probes); flagged results verified by
interaction; judgment checks from code and the rendered page. Same-theme
captures taken after scoring. Build times: baseline about 3 minutes
(including an accidental user stop and resume), with-skill about 15 minutes.

## Totals

| Build | Blocker | Major | Minor |
|-------|---------|-------|-------|
| Baseline | 1 | 2 | 1 |
| With-skill | 0 | 0 | 0 |

## Style contract verification (the point of this run)

Both builds inlined tokens.css verbatim and introduced zero foreign hex
colors and zero raw pixel spacing values (all automated). The side-by-side
captures are for the first time stylistically like for like; remaining
differences are design judgment, which is what the suite exists to isolate.

## Baseline failures

- C1 (BLOCKER): zero state handling, third consecutive run (0 matches for
  any state machinery in source).
- C21 (MAJOR): signups table has no search, no sort, no filter (the
  filter-capable controls found are the chart switcher).
- C29 (MAJOR): page-level horizontal overflow at 375px (measured true);
  the build's claim that the table scrolls in its own container does not
  hold at phone width.
- C24 (MINOR): all cards titled as bare labels, plus an identical
  "Click to see the full 13-month trend" hint repeated on every KPI card.

Improvements over prior baselines, worth recording: focus-visible present
(C10 pass), no animation so no reduced-motion exposure (C30 pass), token
spacing throughout (C12 pass), MRR card emphasized with an accent border
(C6 pass-with-note: value sizes are uniform 26px, the border carries the
emphasis). Exact monthly values remain hover-only (pass-with-note on
reachability, consistent with prior runs).

## With-skill failures

None. Verified independently rather than trusted from the self-audit:
token compliance (automated), series reachability via the Charts/Table
toggle (automated), search/sort/filter, focus-visible, reduced-motion
guard, 28px hero vs 20px subordinate tiles, state machinery (16 source
references; skeletons double as the JS-off state with a noscript notice),
narrow-width containment (fixed by the agent itself after its own render
pass caught page overflow at 390px, the same bug the baseline shipped).

Notable judgment deltas visible in the like-for-like captures: insight
titles ("MRR keeps compounding", "Recent signups: 5 open trials, 1
churned") vs bare labels; year-ago context lines on every KPI; a
follow-up framing on the signups card ("Trials are this morning's
follow-up list") that turns the table into an action list.

## Run observations

- The baseline agent again announced it was the control arm and skipped
  optional skills deliberately; recorded as in prior runs.
- An accidental user stop interrupted the baseline agent mid-run; it was
  resumed by message and reported the file had already been written before
  the stop. The interruption did not affect the artifact.
- Across three runs the baseline is drifting upward (focus-visible and
  spacing discipline appeared this round), while the skill-side deltas
  that persist in every run are states, table affordances, responsive
  containment, insight framing, and keyboard access. Those five are the
  durable claim.

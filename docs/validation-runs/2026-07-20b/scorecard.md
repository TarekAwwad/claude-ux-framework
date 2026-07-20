# Scorecard: run 2026-07-20b (suite v2)

Scored against all 30 checks. Automated subset via the extended checks.js;
flagged results verified by interaction; judgment checks from code and the
rendered page. Same-theme (forced light) captures taken after scoring.
Build times: baseline about 2 minutes, with-skill about 22 minutes.

## Totals

| Build | Blocker | Major | Minor |
|-------|---------|-------|-------|
| Baseline | 1 | 3 | 3 |
| With-skill | 0 | 0 | 1 |

## Baseline failures

- C1 (BLOCKER): zero state handling (0 matches for any state machinery).
- C10 (MAJOR): no focus-visible styling anywhere.
- C21 (MAJOR): signups table has no search, no sort, no filter (the
  filter-capable controls checks.js found are the chart's tab switcher).
- C29 (MAJOR): at 375px the whole page overflows horizontally (body
  614px in a 375px viewport, measured); the build's own claim that tables
  "scroll horizontally on narrow screens instead of overflowing the page"
  is false.
- C12 (MINOR): one-off spacing values (5x12, 2x9, 3, 24x16x48).
- C24 (MINOR): all cards titled as bare labels.
- C30 (MINOR): transitions animate with no reduced-motion guard.

Passes worth noting: full data contract, theme pin honored (light default,
dark via prefers-color-scheme), consolidated trend chart with tab switcher,
MRR card emphasized with an accent border (C6 pass, unlike run 1),
status chips with text, no console errors.

## With-skill failures

- C12 (MINOR): spacing values are disciplined (even 4 to 16px steps
  throughout) but drawn from no declared scale or tokens, and the spec does
  not record one. Scored as a genuine miss, not excused; the skill's P9
  asks for a defined scale and this build applied discipline without
  declaring it.

Everything else passes, with the two deviations its spec justifies (states
simulated behind a labeled preview control since data is hardcoded;
search/filter/sort applied to the signups table, not to the static
accessibility twins of charts). Verified by interaction, not trusted from
the self-audit: series reachability (churn tab then View-as-table, two
visible steps), narrow-width containment (table scrolls inside its card),
focus-visible, reduced-motion guard, search/sort/filter, 48px hero vs
uniform tiles.

## Suite v2 verification (the point of this run)

- Theme pin: bound on both sides; both shipped light-by-default with dark
  via prefers-color-scheme. Same-theme side-by-side captures are now
  representative.
- Reachability standard: bound; the with-skill build made every series
  value reachable through visible controls and checks.js proved it for the
  switcher path. The baseline's exact monthly values remain hover-only,
  recorded as a pass-with-note (the charts do render the full series).
- New confound found: the contract's consolidation clause names "one chart
  with a series switcher" as an example, and the baseline built exactly
  that pattern (run 1's baseline, without the example, built three separate
  charts). The example steers layout. Candidate v3 wording: grant the
  permission without naming a concrete pattern.

## Comparison to run 2026-07-20 (v1 wording)

Baseline totals identical (1/3/3) with one substitution: v1's baseline
failed C6 and passed C29; v2's baseline passes C6 (accent border) and
fails C29 (page overflow). The with-skill side went from 0/0/0 to 0/0/1
under stricter scrutiny. State handling, keyboard access, table
affordances, and reduced motion separate the two sides in both runs; the
deltas are stable across prompts, which is the property the suite exists
to demonstrate.

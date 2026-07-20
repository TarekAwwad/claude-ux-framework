# Scorecard: run 2026-07-20

Scored against all 30 checks in skills/ux-framework/references/audit-checklist.md.
Automated subset via checks.js (reports in each build dir); judgment checks by
reading code and interacting with the rendered page in Chrome. No screenshots
were used as scoring evidence. Build times: baseline about 3 minutes,
with-skill about 19 minutes.

## Totals

| Build | Blocker | Major | Minor |
|-------|---------|-------|-------|
| Baseline | 1 | 3 | 3 |
| With-skill | 0 | 0 | 0 |

## Baseline failures

- C1 (BLOCKER): zero state handling. No empty, loading, error, or partial
  state anywhere; the source contains no state machinery at all (0 matches
  for empty/loading/error/retry/skeleton).
- C6 (MAJOR): all three KPI values render at an identical 32px; no element
  is visually dominant.
- C10 (MAJOR): no focus-visible styling; column sorting is bound to bare th
  clicks, unreachable by keyboard.
- C21 (MAJOR): table sorts (mouse only) but has no search and no filter.
- C12 (MINOR): spacing is one-off values (18px 20px, 24px 20px 48px,
  9px 12px), no scale or tokens.
- C24 (MINOR): every card titled as a bare field label ("Monthly recurring
  revenue", "Recent signups") with no insight framing anywhere.
- C30 (MINOR): transitions animate with no prefers-reduced-motion guard.

Baseline passes worth noting: full data contract, right-aligned numerics,
status pills with text (not color alone), churn delta color-coding correctly
inverted, table columns preserved via horizontal scroll at 375px, no emoji,
no console errors, critical content near one screen (secondary trend charts
sit just below the fold).

## With-skill failures

None. Two audit notes, neither rising to a failure:

- Chip and small-control paddings are hand-tuned one-off pairs; card and
  section spacing does draw from the build's --s2..--s6 token scale, and the
  spec's self-audit records the deviation class.
- Insight phrasing lives in computed subtitles ("Churn at a 13-month low")
  under neutral card titles rather than in the titles themselves; the intent
  of C24 (no bare labels without an answer) is met.

Verified independently rather than trusted from the build agent's self-audit:
data contract, focus-visible, reduced-motion guard covering its animations,
search/sort/filter (filter is aria-pressed chips), five-state machinery,
52px MRR hero vs 32px uniform baseline tiles, spacing tokens, computed
subtitles, narrow-width column survival by interaction, fold measurement.

## Scoring corrections made during the audit, on record

- Two of my provisional failure calls against the with-skill build were
  wrong and were reversed by code evidence: C12 (I grepped for the wrong
  token prefix; the scale exists as --s2..--s6) and C24 (the insight text is
  computed into subtitles at runtime, invisible to a static source read).
- Two automated checks needed manual override: TABLE-sortable misses the
  baseline's bare th-click sorting (detected: none; reality: mouse-only
  sorting exists), and TABLE-filter-controls misses aria-pressed chip
  filters (detected: none; reality: present on the with-skill build).
  checks.js heuristics should be extended accordingly.

## Confounds recorded for this run

- The baseline agent recognized it was the control arm (from the output
  path) and deliberately avoided the dataviz skill; the with-skill agent
  used it. Chart styling differences are therefore not attributable to
  ux-framework. The structural deltas above (states, hierarchy, table
  affordances, accessibility floor) do not depend on dataviz.
- Both agents ran in the same session with the same skill inventory
  available; only invocation differed.

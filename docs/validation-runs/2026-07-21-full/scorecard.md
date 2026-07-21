# Scorecard: run 2026-07-21-full

Scored against all 40 checks in
skills/ux-framework/references/audit-checklist.md. This is the full
scenario: one build carrying both a dashboard region and the 400-account
grid, so the whole checklist applies (dashboard C17-C24, tables C31-C40,
and the shared state/hierarchy/nav checks). Automated subset via
`checks.js --scenario=full` (reports in each build dir); judgment checks by
reading source and driving the rendered page in Chrome. Screenshots were
not used as scoring evidence.

Both builds default to a "Business health" tab with the accounts grid on a
second tab. Four automated checks tripped on that structure rather than on
a real defect and were resolved by hand (see "Automated flags that were
probe artifacts" below); they are not scored as failures.

## Totals

| Build | Blocker | Major | Minor |
|-------|---------|-------|-------|
| Baseline (control) | 1 | 3 | 2 |
| With-skill | 0 | 0 | 0 |

## Baseline failures

- C1 (BLOCKER): no loading and no error state anywhere in the accounts or
  health regions. Source has zero state machinery for them (0 matches for
  skeleton / aria-busy / retry / error-state); only the populated, empty
  (zero-match "No accounts"), and partial (null fields) states exist. The
  build inlines its data synchronously, so the agent judged loading/error
  not applicable and skipped them; the skill's value is that the with-skill
  agent built both anyway (19 skeleton and 15 error/retry matches, an error
  card with Retry reachable via `?simulateError=1`).
- C34 (MAJOR): the header row is sticky (`position: sticky` on `th`), but
  no column is frozen during horizontal scroll (no left-pinned sticky
  cell). On a narrow viewport the Company identifier scrolls out of view,
  so a row's cells lose their label. With-skill freezes the Company column
  and keeps the header sticky (5 sticky rules).
- C36 (MAJOR): sorting is bound to bare `th` clicks with no `aria-sort` (0
  matches) and no keyboard path or focus restoration after a sort
  re-renders the table; it is mouse-only and unannounced. With-skill uses
  header buttons with `aria-sort` (5 matches) and restores focus.
- C40 (MAJOR): the horizontal-scroll container is not a focusable labeled
  region (0 `role="region"`), so a keyboard or screen-reader user gets no
  signal that content continues off-screen and cannot scroll it from the
  keyboard. With-skill wraps the scroll area in a `role="region"` labeled
  via `aria-labelledby` with `tabindex=0` and a visible focus style.
- C30 (MINOR): the build animates (a `transition: opacity 0.2s`) with no
  `prefers-reduced-motion` guard (0 matches). With-skill guards its
  animations (2 matches).
- C10 refinement (MINOR): interactive elements do have a visible focus
  state (three `:focus` rules, outlines never removed), so C10 itself
  passes, but the build uses `:focus` rather than `:focus-visible`, so
  focus rings also show on mouse click. With-skill uses `:focus-visible`
  (3 matches).

Baseline passes worth noting: full data contract for both fixtures (all
400 accounts, 14 signups, 7 features, all three 13-month series present and
byte-identical to the fixtures), tokens inlined verbatim with no foreign
colors, 400 rows paged not dumped into the DOM (52 row elements on load),
working search / status / plan filters, bulk selection with a bulk bar,
destructive delete guarded (native `confirm()` with a "cannot be undone"
message; a guard, though the unstyled native dialog is the pattern the
skill steers away from), a distinct zero-match empty state ("No accounts"),
line/bar charts (no pie, donut, or gauge), no emoji, and no console errors.

## With-skill failures

None. Two audit notes, neither rising to a failure:

- The recent-signups table (14 rows) offers sort and a status filter but no
  search; at 14 rows that is a reasonable omission, and C21's intent
  (a data table is not a dead grid) is met by the sort and filter.
- The health KPI empty and partial states are documented in the spec's
  state matrix but do not occur with the complete fixture series; loading,
  error, and populated are all implemented and reachable.

Verified independently rather than trusted from the build agent's
self-audit: both data contracts byte-identical to the fixtures, loading and
error states reachable, `prefers-reduced-motion` guard covers its
animations, frozen Company column plus sticky header, `aria-sort` on sort
headers, the scroll region is a focusable labeled `role="region"`, the
destructive action is gated behind a `role="alertdialog"` with Undo, the
zero-match search state reads "0 accounts", and all 400 accounts are
reachable (first visible, last via search).

## Automated flags that were probe artifacts (not scored)

- DATA-rows-reachable (baseline) and STATE-empty-search (baseline): the
  probe runs on load, where the accounts grid and its search sit on the
  hidden second tab. After opening the Customer accounts tab, the first
  account is visible, the last is reachable via search, and a zero-match
  search shows "No accounts". Both resolved to pass.
- GRID-destructive-guard (baseline): the probe cannot see a native
  `confirm()` (Playwright auto-dismisses it). Source confirms the delete is
  gated by `confirm()` with "cannot be undone". Guard present; scored as a
  pass with a pattern-quality note (see C-notes above).
- DATA-series-reachable (with-skill): the 13 monthly values sit behind a
  `<details>` disclosure, which the probe (clicks `button` / `[role=tab]`)
  cannot open. Opening the disclosure reveals the churn and WAU values.
  Resolved to pass.

## The three fixes that most improve the ops lead's #1 task (working the accounts grid)

1. Add a loading state and an error/retry state to the accounts grid (C1):
   a busy region cannot silently show nothing or a blank on failure.
2. Freeze the Company identifier column on horizontal scroll and make the
   scroll container a keyboard-focusable labeled region (C34, C40): keep
   every row labeled and let keyboard users move through the columns.
3. Give sorting an accessible, keyboard-reachable control with `aria-sort`
   and focus restoration after re-render (C36): the primary way to triage
   400 accounts should not be mouse-only.

# Scorecard: run 2026-07-21-tables (customer accounts grid)

Run id: 2026-07-21-tables. Date: 2026-07-21. Method: both builds driven in
Chrome at 1440x900 and 375x900 through the four contract tasks and every
state; verdicts come from interaction and computed styles, with source read
only where interaction cannot show it. Both sides scored at identical
strictness; author claims and the self-audit count for nothing. The baseline's
flagged GRID-destructive-guard was settled by hand (see below), and the
with-skill 18/18 automated pass did not stop me from finding a rendering
defect the probe could not see.

## Totals

| Build | Blocker | Major | Minor |
|-------|---------|-------|-------|
| Baseline | 1 | 4 | 2 |
| With-skill | 0 | 1 | 0 |

Baseline: C1 (blocker); C34, C36, C39, C40 (major); C24, C32 (minor).
With-skill: C39 (major).

## Per-check verdicts

Format: check (severity) then baseline verdict and evidence, then with-skill
verdict and evidence. n/a means not applicable to this screen.

- **C1 (BLOCKER)**. Baseline FAIL: data renders synchronously, no loading and
  no error state exist (no skeleton caught on load; empty and partial states
  do exist). With-skill PASS: skeleton rows render during a simulated 450ms
  load (caught on load), a parse-failure block with a Retry button exists,
  plus empty and labeled-partial states.
- **C2 (BLOCKER)**. Baseline PASS: edits, bulk sets, and deletes each raise a
  toast, selection reveals the bulk bar. With-skill PASS: same toasts and bulk
  bar (note: the leaked bulk bar, see C39, lets a bulk button fire on zero
  rows and toast "0 accounts").
- **C3 (BLOCKER)**. Baseline PASS: single delete (drawer) and bulk delete both
  require an explicit confirm, then a toast with Undo (verified 400 to 399 to
  400, and 400 to 398). With-skill PASS: panel Remove confirm and bulk Remove
  popover, each with Undo (same counts verified).
- **C4 (BLOCKER)**. Baseline PASS with note: status, auto-renew, and health all
  carry text; the row attention dot separates severity (red vs amber) by color
  plus a hover title only. With-skill PASS: status text badges, health carries
  a word (Healthy/Watch/At risk) beside the number, attention is labeled chips.
- **C5 (MAJOR)**. Baseline PASS: no competing primary CTA on the list, search
  is the entry. With-skill PASS: one primary (Edit, in the panel), search is
  the focused entry.
- **C6 (MAJOR)**. Baseline PASS: title, stat tiles, then table read as a clear
  order (tiles pull some weight toward summary counts). With-skill PASS with
  note: search and table are dominant, but an empty 416px panel and a phantom
  bulk bar sit in the layout at rest (see C39).
- **C7 (MAJOR)**. Both PASS: inline SVG icons, no emoji in markup.
- **C8 (MAJOR)**. Both PASS: icon-only close controls carry aria-label and
  title; decorative icons are aria-hidden.
- **C9 (MAJOR)**. Both PASS: token palette, red reserved for destructive,
  green for good, amber for warn, blue for accent, used consistently.
- **C10 (MAJOR)**. Both PASS: :focus-visible outline on buttons, inputs,
  selects, and checkboxes (baseline sort <th> is not a focusable control, which
  is scored under C36).
- **C11 (MAJOR)**. Both PASS: domain columns (MRR, health, tickets, seats,
  plan, auto-renew) and an attention concept make each purpose-built; with-skill
  is more sharply tailored to CS triage with four attention presets carrying
  live counts.
- **C12 (MINOR)**. Both PASS: spacing and radius drawn from the token scale
  (--s1..--s6, --radius); automated token and foreign-color checks pass.
- **C13 (MINOR)**. Both PASS: section gaps (--s5) exceed intra-group gaps
  (--s2/--s3).
- **C14 (MINOR)**. Both PASS: three text tokens, no sub-400 body weight.
- **C15 (MINOR)**. Both PASS: subtle shadow token, no transition:all; with-skill
  transitions are 0.12s and gated.
- **C16 (MINOR)**. Both PASS: prose constrained (with-skill notes max-width
  60ch; baseline notes sit inside a 460px panel).
- **C17 (MAJOR)**. Baseline PASS: five status tiles (Active, Trial, Past due,
  Churned, Need attention), not duplicated filler, doubling as filters.
  With-skill n/a: no KPI tiles (omitted by design).
- **C18 (MAJOR)**. Baseline PASS: five tiles, within the 5 to 7 range.
  With-skill n/a.
- **C19 (MAJOR)**. n/a both: no analytical KPI metrics; the baseline tiles are
  status filter facets (counts) for which trend context is not expected.
- **C20 (MAJOR)**. n/a both: no charts in either build.
- **C21 (MAJOR)**. Baseline PASS: search, status/plan/auto-renew filters, and
  header sort (sort is mouse-only, see C36). With-skill PASS: search,
  status/plan filters plus four presets, and keyboard-operable header sort.
- **C22 (MAJOR)**. n/a both: a worklist table, not a single-screen dashboard;
  the table is meant to scroll.
- **C23 (MINOR)**. Baseline PASS with note: numeric columns right-aligned and
  Status chipped, but Plan is plain text rather than a chip. With-skill PASS:
  numeric right-aligned, Status and Plan both chipped.
- **C24 (MINOR)**. Baseline FAIL: the five stat tiles are titled with bare
  status labels, not the insight each answers. With-skill n/a: no cards.
- **C25 (MAJOR)**. n/a both: standalone screen, no cross-screen nav.
- **C26 (MAJOR)**. n/a both: no nav to indicate location.
- **C27 (MAJOR)**. n/a both: no nav model on a single screen.
- **C28 (MINOR)**. n/a both: no nav items to order.
- **C29 (MAJOR)**. Baseline PASS: at 375px no page-level horizontal overflow
  (documentElement scrollWidth equals innerWidth), the table scrolls inside its
  container, no columns dropped. With-skill PASS: no page overflow, horizontal
  scroll with a frozen column, nothing dropped (note: the leaked panel squeezes
  the table region to 870px at 1280 and 55px at 375, but no field is dropped).
- **C30 (MINOR)**. Baseline PASS: no animation or transition to gate (measured
  0s). With-skill PASS: skeleton pulse and button transitions collapse to 0s
  under prefers-reduced-motion (verified).
- **C31 (MAJOR)**. Both PASS: first column is the human-readable Company, not a
  raw id; with-skill places Status and Health adjacent and forward.
- **C32 (MINOR)**. Baseline FAIL: MRR shows "$" in every cell under a bare "MRR"
  header (the unit sits only in a hover title). With-skill PASS: unit is in the
  header ("MRR (USD)"), cells are bare right-aligned numbers; dates left-aligned
  in both.
- **C33 (MAJOR)**. Both PASS: 50 rows enter the DOM for 400 accounts (paged).
- **C34 (MAJOR)**. Baseline FAIL: header stays on vertical scroll, but the
  Company column is not frozen on horizontal scroll (its left edge moves from
  69px to -431px at 375). With-skill PASS: header sticky and the checkbox plus
  Company columns frozen (Company left holds at 44px through a 400px sideways
  scroll).
- **C35 (MAJOR)**. Both PASS: detail opens in a non-modal side panel that keeps
  the table visible (baseline a fixed right drawer, with-skill an inline flex
  panel); baseline drawer goes full-width below 960px.
- **C36 (MAJOR)**. Baseline FAIL: opening the drawer does not move focus into
  it and closing manages no focus (focus never leaves the trigger); the sort
  <th> is not keyboard-focusable so keyboard users cannot sort; a disabled
  pager button drops focus. With-skill PASS: open moves focus to the panel
  title, close returns focus to the triggering row button, a disabled pager
  moves focus to the counterpart or region, and Enter on a header sort button
  toggles aria-sort (ascending to descending).
- **C37 (MAJOR)**. Both PASS: editing is routed to the panel/drawer, entered
  via Edit, confirmed via Save, with a success toast; no inline cell editing.
- **C38 (MAJOR)**. Both PASS: forms carry novalidate so the app's own
  validation always runs. Baseline keeps native min/max on number inputs yet
  the designed messages still fire for seats -5 and health 150; with-skill uses
  no native constraints and shows a per-field message with aria-invalid.
- **C39 (MAJOR)**. Baseline FAIL: the same message "No accounts match the
  current filters" renders for both a filtered-empty and a true-empty result
  (no distinction), though the clear-filters control is correctly gated on an
  active filter. With-skill FAIL: it does distinguish "No accounts yet" (true
  empty) from "No accounts match" (filtered), but the toolbar Clear filters
  button shows on a fresh load with no filter set, because its hidden attribute
  is overridden by `.btn { display: inline-flex }`.
- **C40 (MAJOR)**. Baseline FAIL: the .table-wrap scroll container has no role,
  aria-labelledby, tabindex, or caption, so it is neither focusable nor labeled.
  With-skill PASS: #table-region is role=region, aria-labelledby to the caption,
  tabindex=0, with a visible focus outline and an off-screen-content hint.

## GRID-destructive-guard resolution (baseline)

Resolved: GUARDED. The automated probe reported "no remove/delete/archive
control found" because those controls are injected by JavaScript only at
interaction time and are absent from the static HTML the probe scanned. Driving
the page settles it. Opening a row exposes a "Delete account" button that first
requires an inline confirm ("Delete X? You can undo this right after" with
Delete account / Keep it), then removes the row and shows a toast with Undo
(account total went 400 to 399, and back to 400 on Undo). Selecting rows shows
a bulk "Delete" that requires "Confirm delete N" before acting, also with an
Undo toast (400 to 398). Both destructive paths are confirm-guarded and
undoable, so C3 passes for the baseline.

## With-skill defect (why it is not a clean sweep)

One CSS specificity bug drives the single with-skill failure and two more
cosmetic problems. Author rules `.bulkbar { display: flex }`,
`.panel { display: flex }`, and `.btn { display: inline-flex }` outrank the user
agent `[hidden] { display: none }` rule, and no `[hidden]` guard is present, so
three elements that carry the hidden attribute still render:

- The toolbar Clear filters button shows with no filter set. This is the
  literal C39 violation (clear-filters offered when nothing is filtered).
- The bulk action bar (Clear selection, Auto-renew on/off, Set owner, and a red
  Remove) shows with zero rows selected.
- The detail panel shows empty and stays on screen at rest, taking 416px at
  1440, 410px at the design's own stated minimum of 1280 (about a third of the
  viewport), and squeezing the table region to a 55px sliver at 375px.

Elements whose author CSS sets no display value (the confirm popovers, the
state block, the overflow hint) hide correctly, which confirms the cause. The
baseline has no equivalent leak: its bulk bar, drawer, toast, and clear-filters
control all compute to display:none at rest.

## Judgment differences

The concrete, reproducible deltas favor the with-skill build on states and
keyboard access, and one bug pulls a point back. With-skill ships a real
loading skeleton and a parse-error-with-Retry state (C1); the baseline renders
data synchronously and has neither, which is the only blocker in the run.
With-skill freezes the Company column and wraps the scroll area in a focusable
role=region labeled by the table caption (C34, C40); the baseline lets the
identifier column scroll off (to -431px) and gives the scroll container no
role, label, or tabindex. With-skill moves focus into the detail panel and back
to the triggering row, and its sort headers are real keyboard-operable buttons
(C36); the baseline moves no focus and its sort headers are non-focusable table
cells, so a keyboard user cannot sort at all. Smaller deltas: unit in the header
versus a per-cell "$" (C32), insight-free stat tiles labeled by bare status
words (C24), and a sharper column order with Status and Health up front. Both
builds fail C39, from opposite directions: the baseline shows one empty message
for two different causes, while the with-skill distinguishes the causes but
leaks its Clear filters control on load. Both correctly guard and undo
deletions, route edits to a panel, keep native constraints from blocking the
app's own validation, hold selection across pages (50 then 52), and render dark
mode and reduced motion from the shared tokens.

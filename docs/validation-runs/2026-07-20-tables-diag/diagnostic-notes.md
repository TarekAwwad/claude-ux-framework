# Data-grid diagnostic notes

Date: 2026-07-20
Build audited: validation/runs/2026-07-20-tables-diag/baseline/index.html (Ledgerline customer accounts, self-contained, opened via file:// URL)
Method: Playwright-driven interaction at 1440x900 and 375x900 plus source reading. Screenshots were not used as evidence.

diag-1
Failure: Sorting a column or paging the grid with the keyboard drops focus to the document body, so a keyboard user loses their place after every sort or page change.
Evidence: C10-adjacent. Focused the MRR sort button and pressed Enter (activeElement went from BUTTON[data-key=mrr_usd] to BODY); focused Next and pressed Enter (BUTTON to BODY). Root cause in source: every interaction calls renderAll (line 6439), which replaces thead and pager innerHTML (renderTable line 6261, renderPager line 6308), destroying the focused control.
Rule area: keyboard focus preservation across list re-render (restore focus to the acted control after re-render).

diag-2
Failure: Opening a row's detail panel never moves focus into the panel, and the panel is not a managed dialog, so a keyboard or screen-reader user has no signal it opened and must tab from the top to reach Close, Edit, or Delete.
Evidence: C10-adjacent. Focused a row and pressed Enter; the panel opened but activeElement became BODY (no focus move). Source: openRow (line 6707) and renderPanel (line 6319) set panel innerHTML with no focus() call, no role="dialog", no focus trap, and no focus return on close. At 375px the panel becomes a fixed full-screen overlay (CSS lines 374 to 387) over a still-focusable grid, with no inert or aria-hidden on the background.
Rule area: dialog and side-panel focus management (move focus into the opened panel, trap it when the panel is a full-screen overlay, return focus on close).

diag-3
Failure: The per-row "needs attention" marker is a small colored dot whose severity (amber warn versus red bad) is carried by color alone, and whose meaning sits only in a hover title, so it is invisible to color-blind and assistive-tech users scanning the grid.
Evidence: C4, C8-adjacent. Filtered to the attention set and inspected the markers: each is an empty span.dot with a title attribute only (for example title "Payment is past due; Low health score (35); Inactive for 223 days"), no text, no aria-label, and the row exposes no accessible attention text. Source: renderTable dot span (lines 6273 to 6275), .dot CSS (lines 250 to 258). The detail panel does spell the reasons out in text, but the grid cell does not.
Rule area: status and severity must not be conveyed by color alone, and a hover title is not an accessible label.

diag-4
Failure: The data view has no loading or error state concept at all; only the ideal, empty, and partial-data states exist.
Evidence: C1 (BLOCKER). Source reading: data is hardcoded (FIXTURE) with no fetch, and there is no loading, skeleton, or error markup or code path anywhere. Defensible for a static hardcoded build, but as a data-grid exemplar it skips the async states a real app needs, so an agent copying this pattern learns to ship a grid with no loading or failure handling.
Rule area: data-backed views need loading and error states, not just the ideal plus empty.

diag-5
Failure: The empty state does not distinguish "no accounts exist" from "no accounts match the current filter"; both show the same "No accounts match. Clear search and filters." message with a clear-filters button that does nothing when no filter is set.
Evidence: C1. Source: the renderTable empty branch (lines 6264 to 6267) is unconditional, ignoring whether any filter is active or whether the underlying dataset is empty. A user who has deleted the last account sees a filter-oriented message that misdescribes the situation.
Rule area: empty-state differentiation (separate no-data-yet from no-results-for-filter).

diag-6
Failure: In the edit form, native HTML5 numeric constraints preempt the app's own inline validation, so an out-of-range number is blocked by an unstyled native browser bubble and the designed inline error never appears, which is inconsistent with how blank text fields are handled.
Evidence: C2-adjacent. Submitting with a blank Company renders the styled inline error "Company name is required." Submitting with seats set to -4 leaves the form untouched (a planted marker on the form survived, proving no re-render and no saveEdit run) because the number input's min="0" makes the browser block submit before the handler fires. Source: number inputs carry min and max (renderEditForm lines 6412, 6414, 6418) while saveEdit re-checks the same ranges (lines 6505 to 6518), so the app's messages for negative or out-of-range numbers are dead paths.
Rule area: consistent validation feedback (do not let native constraint bubbles preempt the app's own inline validation).

## What the baseline got right

- Real native table semantics: keyboard-reachable button sort controls (Tab reaches every header, Enter and Space activate them), so sorting is not mouse-only, with aria-sort set on the active column.
- Sort state is visible: the active column is colored with the accent and carries a direction arrow, alongside aria-sort.
- Numeric columns are right-aligned with tabular-nums; currency (dollar sign plus thousands separators) and dates (Mon D, YYYY) are formatted consistently across grid and panel.
- Status is rendered as text chips, not color-only; auto-renew shows as On or Off text.
- Null and partial data is handled explicitly: "None" for missing health, "None recorded" for missing activity, empty notes tolerated. This is a real partial-data state.
- Zero-result search shows a helpful empty message with an inline clear-filters action (verified by searching a non-matching term).
- Destructive actions are guarded by an explicit confirmation step: single delete in the panel and bulk delete in the bar, each stating the count and that it cannot be undone.
- The bulk bar reports the selected count and selection survives pagination and filtering (verified: 3 selected on page 1 still read 3 selected on page 2), backed by a Set of stable ids.
- Select-all is correctly page-scoped with a working indeterminate state.
- Every action produces visible feedback: live search, a toast on save, delete, and bulk edits, and pager buttons disabled at the first and last page.
- The edit form validates required and text fields inline and confirms saves with a toast.
- Focus-visible styling (a 2px accent outline) is defined for inputs, selects, buttons, and rows (confirmed computed on a header button).
- Selection ticks update in place (updateSelectionUI) specifically to preserve focus and scroll, which shows the author was aware of focus, they just did not extend it to sort, paging, or panel open.
- Sticky header inside the scroll container; long notes are shown in full in the panel and kept out of the grid so rows do not bloat.
- Full dark scheme via prefers-color-scheme with a complete token set (verified: body renders on the dark background token).
- No animation anywhere, so a prefers-reduced-motion guard is correctly unnecessary, and there is no transition:all.
- Responsive at 375px: the table scrolls horizontally with no dropped columns (C29 holds), the body does not overflow, the detail panel becomes a reachable full-height overlay with an in-view Close, and the bulk bar stays reachable.
- Design tokens are used throughout for spacing, radius, and color, with no foreign hex values.
- Summary tiles are purposeful (status breakdown, attention count, non-churned MRR) and double as quick filters, not generic filler (C17 and C18 hold). Pagination defaults sensibly to 50 with 25, 50, 100, and All options and a "Showing X to Y of N (filtered from M)" readout. All renders all 400 rows with no virtualization, which is acceptable at this scale but would not scale much beyond it.

## Verdict on GRID-destructive-guard: probe-limitation. Both delete paths are present and are guarded by an explicit confirmation step; the load-time probe found no control because single delete lives in the details panel (opened by a row click) and bulk delete lives in the bulk bar (shown only after row selection). Verified by driving the UI: opened a row, clicked Delete, saw "Delete [Company]? ... There is no undo." with Delete and Cancel, cancelled and confirmed the actions restored, then deleted and saw the row removed with a toast; separately selected rows and saw "Delete 50 selected accounts? This cannot be undone." with Delete and Cancel. C3 is satisfied.

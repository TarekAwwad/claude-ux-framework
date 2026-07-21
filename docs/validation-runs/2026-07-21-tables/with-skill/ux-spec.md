# UX spec: Ledgerline customer accounts

## Context

- Primary user: customer-success (CS) lead, expert user, lives in this screen
  for most of the working day.
- Usage context: focused work, interrupted often. Long sessions of finding
  accounts, triaging the ones that need attention, and cleaning up bad field
  values. Speed of scanning and low-friction correction matter more than
  onboarding hand-holding.
- Device/viewport reality: desktop and laptop first (roughly 1280 to 1920px
  wide). Narrower windows must stay usable via horizontal scroll with the
  identifier column frozen. No phone-specific layout is designed.

## Tasks

1. Find a specific account by name and read any of its fields.
2. Spot accounts that need attention (past due, low health, gone quiet,
   missing data) and work through them as a list.
3. Correct a wrong field value on an account.
4. Act on several accounts at once (set auto-renew, reassign owner, remove).
5. Remove a single account.

Task 1 dictates the layout: search sits at the top of the screen, gets
autofocus, and filters as you type. Per tables.md, the table's primary job is
"find or filter rows"; "act on rows" is the secondary job and is demoted to a
selection column plus a bulk bar that only appears once something is selected.
Viewing and editing one record is routed to a non-modal side panel so the list
stays visible.

## Placement in IA

- Entry points: the "Accounts" item in the main Ledgerline nav; deep links land
  on the table with default filters. This build renders the screen standalone
  (single-file deliverable), so the top bar carries only product name, screen
  title, and data freshness.
- One level up: the Ledgerline app shell.
- Onward paths: from a row into the detail panel to read, correct, or remove
  the account; from bulk work back to the filtered list. No other screens
  exist in this build.

## States matrix

| View | Empty (no data yet) | Loading | Error | Partial (some data) | Ideal |
|------|---------------------|---------|-------|---------------------|-------|
| Accounts table | "No accounts yet" guidance with a reload action (reachable in-session if every row is removed) | Skeleton rows under the real header, same row height, no layout jump | "Couldn't load account data" with what happened and a Retry button | Rows with missing values show labeled placeholders ("No score", "None yet"), never blank cells | 50 rows per page, pager, sticky header |
| Filtered or searched subset | "No accounts match" guidance plus a Clear filters action, shown only when a filter or search is actually set | Same skeleton | Same error block | Same labeled placeholders | Match count plus paged results |
| Detail panel | n/a (opens only from an existing row) | n/a (data is already local) | Save validation errors render inline per field with designed messages | Missing health/activity shown as labeled placeholders; empty notes shown as "No notes" | All 12 fields, grouped, with Edit and Remove |
| Attention chips | Counts read 0 and chips stay visible | Hidden until data is ready | Hidden while the error block shows | Counts handle null health/activity correctly | Live counts that toggle a preset filter |
| Feedback layer (toast) | n/a | n/a | n/a | n/a | Every mutation confirms in a toast; deletions offer Undo |

## Density & hierarchy decisions

- The one thing the user must see first: the search box, and per row the
  company name plus its status and health.
- At a glance (table columns, in order of importance): Company, Status,
  Health, Open tickets, MRR (USD), Seats, Plan, Owner, Last activity.
  On demand (detail panel): Signed up, Auto-renew, Notes, plus every at-a-
  glance field again in full (untruncated).
- At the narrowest supported width: the table scrolls horizontally inside a
  labeled, keyboard-focusable region; the selection and Company columns stay
  frozen on the left and a visible hint says more columns are off-screen.
  Nothing is silently dropped.
- What was deliberately left out: KPI tiles and charts (this is a worklist,
  not a dashboard); an "add account" flow (the data contract forbids inventing
  rows); column show/hide preferences (a fixed order tuned to the CS job
  instead); saved views and server features (no backend exists).

## Key interaction decisions

- Search matches company and owner, case-insensitive, live on input.
- Filters: status select, plan select, and four attention presets shown as
  toggle chips with live counts: Past due, Health under 40, Quiet 30+ days
  (no activity in the last 30 days relative to the data's as-of date),
  Missing data (no health score or no recorded activity). One preset active
  at a time; presets combine with search and the selects. A Clear filters
  control appears only when something is set.
- Sorting: every column header sorts (toggle asc/desc) with a visible
  indicator and aria-sort. Null health and null activity always sort last.
- Paging: 50 rows per page (400 rows must not all enter the DOM), with row
  range and page position always visible.
- Focus is never dropped: only the table body and pager text re-render, so
  the control the user acted on (search, select, chip, sort header, pager
  button) keeps focus; if a pager button becomes disabled, focus moves to its
  counterpart. Opening the panel moves focus into it; closing returns focus
  to the row that opened it.
- Editing: all edits happen in the detail panel (a corrected field is a
  high-stakes change on a customer record), entered explicitly via Edit,
  confirmed via Save, abandoned via Cancel. Validation is the app's own
  (inputs carry no native min/max/required/pattern), with a designed message
  per field. Success confirms in a toast.
- Removal: single removal from the panel behind an explicit confirm step;
  bulk removal from the bulk bar behind a confirm popover. Both show a toast
  with Undo, which restores the rows at their original positions.
- Bulk actions (on the selection, across pages): Auto-renew on, Auto-renew
  off, Set owner, Remove. Each confirms in a toast; selection is keyed to
  the account, not the page.

## Assumptions

- The dataset is local and fixed. Loading is simulated briefly at startup so
  the skeleton state is real; the error state renders if the embedded JSON
  fails to parse and offers Retry. Edits, removals, and undo mutate
  in-memory state only and last for the session; reloading the page restores
  the fixture exactly.
- The fixture's as_of date (2026-07-19) is treated as "today" for staleness
  math and is shown in the header as data freshness.
- Raw values are stored untouched; presentation may humanize labels
  (past_due renders as "Past due", auto_renew as "Auto-renew: On/Off",
  mrr_usd as "MRR (USD)" with the unit in the header). No field is renamed
  in the data itself.
- The fixture's top-level product name and as_of date appear in the header;
  the fixture's own description text is metadata about the test setup, not
  account data, and is not rendered.
- The token fixture defines no font sizes, so the build uses one small fixed
  type scale (11 to 18px); every color, font family, radius, shadow, margin,
  padding, and gap comes from the tokens. Column and panel widths are layout
  dimensions expressed in ch/px/vw; all spacing uses the token scale.
- No accounts can be created in the UI, so the true empty state is reachable
  only by removing all 400 accounts; its call to action is a page reload,
  which restores the hardcoded data.
- Status is not a red-alarm semantic by itself: "Past due" uses the warn hue,
  destructive actions reserve the bad/red hue, "Active" uses good/green,
  and every state also carries a text label (never color alone).

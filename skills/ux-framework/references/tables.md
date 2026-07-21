# Tables and data grids

Load this before building any data table, record list, data grid, or
admin/CRUD screen, and alongside dashboards.md when a dashboard contains
a table.

## First: what job does this table do?

A table is a tool for one job, not a generic grid. Before building it, name
which of four jobs it serves and let that choose the controls and layout:

- Find or filter rows: search, filter, and sort lead; a row is a result.
- Compare rows: keep compared columns adjacent and aligned; density matters.
- View or edit one record: a row is a door to a detail panel or form.
- Act on rows: selection and row actions lead; the table is a worklist.

One job per view. A table serving two jobs at once is the common failure;
split it, or pick the primary job and demote the rest.
<!-- T1 -->

## Columns

- Order columns by importance to the reader, keep compared columns adjacent,
  and make the first column a human-readable identifier, not a raw generated
  ID. <!-- T2 -->
- Right-align numeric table columns so digits line up by place value;
  left-align text columns. <!-- D11 -->
- Put units and shared qualifiers in the column header, not in every cell, and
  left-align identifier-like numbers (IDs, dates, postal or phone codes) as
  text rather than right-aligning them as quantities. <!-- T3 -->
- Render categorical or status fields as chips or badges, not plain
  text. <!-- D12 -->
- Never carry a cell's status or severity by color alone or in a hover title
  only; give each status a text label or an icon paired with text. <!-- T8 -->
- Truncate long cell text and use row shading or dividers to keep dense tables
  scannable. <!-- D14 -->

## Search, filter, sort

- Give every data table functional search, filter, and sort, not static
  rows. <!-- D13 -->
- After a sort, page change, or filter re-renders the table, restore focus to
  the control the user acted on, not to the document body. <!-- T12 -->

## Large datasets

- Page or virtualize rows instead of rendering the whole dataset into the DOM
  at once: paginate past roughly 50 rows, virtualize once the count grows
  large. <!-- T5 -->
- Keep the header row visible during vertical scroll and freeze the leftmost
  identifier column during horizontal scroll, so row and column labels stay in
  view. <!-- T4 -->

## Selection and bulk actions

Row selection drives bulk actions, and a bulk action is still an action: guard
destructive ones with a confirm, cancel, or undo (P17 in principles.md), and
give every bulk action visible feedback (P4).

## Editing and row detail

- Progressively reveal secondary and row-level actions (hover, overflow menu,
  popover) instead of showing them all at once. <!-- D17 -->
- Show a row's detail in a non-modal side panel or an expandable inline row
  that keeps the table visible; reserve a modal or full page for the densest
  records only. <!-- T6 -->
- When a row opens a detail panel, move focus into it; if it is a full-screen
  overlay, trap focus and mark the background inert; return focus to the
  triggering row on close. <!-- T13 -->
- Signal which cells are editable, confirm each edit explicitly (Enter,
  click-away, or Save) with clear success feedback, and route high-stakes edits
  to a panel or modal, not inline. <!-- T7 -->
- Do not let native HTML5 input constraints (min, max, required, pattern)
  preempt the app's own inline validation; keep the designed error messages
  reachable for every invalid value. <!-- T11 -->

## Data states

States apply per region: the table body, and each filtered or searched subset,
is a view, so the empty, loading, and error rules from principles.md (P3, P18)
run against each.

- Give the table loading and error states, not just populated and empty, and
  prefer a skeleton over a spinner when the load is likely to be noticeable.
  <!-- T9 -->
- Distinguish an empty table with no data yet from one where no rows match the
  current filter, and offer a clear-filters action only when a filter is
  actually set. <!-- T10 -->

## Density and narrow viewports

When a narrow viewport forces columns off, keep the fields that answer the
user's top task and relocate the rest (stacked rows, expandable detail,
horizontal scroll); never drop them silently (P22 in principles.md).

- When a table scrolls horizontally on a narrow viewport, make the scroll
  container a keyboard-focusable labeled region (role=region, aria-labelledby
  to the caption, tabindex=0, visible focus) and signal that content continues
  off-screen. <!-- T14 -->

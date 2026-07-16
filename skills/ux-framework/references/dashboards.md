# Dashboards and data-heavy UIs

Load this before building any dashboard, analytics view, monitoring screen,
or report page.

## First: what question does this dashboard answer?

A dashboard is an answer, not a collection of charts. Before layout, write
one sentence per widget: "This tells the user ___ so they can decide ___."
Any widget without a decision attached gets cut or demoted. Classify the
dashboard:

- Monitoring (is everything OK right now?): status first, big and binary,
  anomalies pop, details on demand.
- Analytical (why did X happen?): comparisons and drill-down first, filters
  prominent, time control global.
- Operational (what do I act on next?): a queue or worklist first; charts
  support the queue, not the reverse.

Mixing types on one screen is the #1 agent failure. Pick one per screen.

The triage above is D1 and D2: design each section as the answer to a stated
question, and cut any metric no decision depends on.
<!-- D1 --><!-- D2 -->

## KPI hierarchy

- Give the single most important metric clearly greater visual weight than
  the rest of the dashboard. Check: on a squint, one number pulls the eye
  first. <!-- D4 -->
- Limit headline KPIs on the primary view to roughly 5 to 7; push the rest
  behind drill-downs, filters, or secondary views. <!-- D5 -->
- Show a distinct, decision-relevant metric in each tile; never duplicate a
  KPI card or add generic filler blocks to fill the grid. <!-- D3 -->
- Give every number context (a target, benchmark, delta, or trend), never an
  isolated figure. <!-- D6 -->
- Round each displayed number to the precision the decision needs; never show
  raw high-precision floats like 73.66666667. <!-- D22 -->

## Layout and scan order

- Fit the critical content on one screen; the key metrics must be visible
  without scrolling. <!-- D19 -->
- Structure the screen in tiers: summary KPIs on top, trends in the middle,
  detailed tables and drill-downs at the bottom. <!-- D15 -->
- Title each card as the insight it answers ("Weekly signups vs target"), not
  a bare field label ("Signups"). <!-- D7 -->
- Make the main content reflect what this specific user cares about (their
  projects, positions, alerts), not a generic template layout. <!-- D18 -->

## Time and comparison

- Give the whole screen one time-range control; do not scatter per-widget
  date pickers.
- Show the comparison basis on every metric (target, prior period, or
  benchmark). This is D6 above.
- Label the timezone and the last-updated time so a stale or mismatched view
  is visible.

## Drill-down and filtering

- Give every data table functional search, filter, and sort, not static
  rows. <!-- D13 -->
- Progressively reveal secondary and row-level actions (hover, overflow menu,
  popover) instead of showing them all at once. <!-- D17 -->
- Make every aggregate clickable through to the rows behind it, so overview
  leads to detail.

## Data states

States on a dashboard follow the states rules in principles.md (P3, P18),
applied per widget rather than to the whole page.

- Render each widget's own loading, empty, and error state; one failed query
  must not blank the whole screen.
- Distinguish zero data (no rows exist yet) from a real zero value (a
  measured zero); they mean different things.
- Mark stale data explicitly when a widget cannot refresh.

## Chart choice basics

Select the chart from the user's question, then hand styling to the dataviz
skill.

- Choose chart type by the question it answers (trend, ranking, part-to-whole,
  correlation, distribution), not by the shape of the data. <!-- D8 -->
- Use length or 2D position (bar, line, scatter) for quantitative comparison;
  never use pie, donut, gauge, or 3D for it. <!-- D9 -->
- Prefer a purpose-fit visualization for the data (a map for geospatial, for
  example) over a default generic bar chart. <!-- D21 -->

Chart styling, color encoding, and palette belong to the dataviz skill
(available here), not this module. That skill owns keeping charts legible over
decorated, with visible axes and labels, proportional bars, and no 3D
<!-- D10 -->, and using a small chart palette where color encodes category or
meaning and never decoration <!-- D20 -->.

## Density

- Use tighter grid, type, and spacing scales than a marketing page; a
  dashboard packs more onto one screen. <!-- D16 -->
- Right-align numeric table columns so digits line up by place value;
  left-align text columns. <!-- D11 -->
- Render categorical or status fields as chips or badges, not plain
  text. <!-- D12 -->
- Truncate long cell text and use row shading or dividers to keep dense tables
  scannable. <!-- D14 -->

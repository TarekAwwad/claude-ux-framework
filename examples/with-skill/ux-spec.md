# UX spec: Ledgerline morning health dashboard

Single-page analytics dashboard, one self-contained HTML file, hardcoded
fixture data (as of 2026-07-19).

## Context

- Primary user: startup founder, business-literate but not an analyst,
  checks it every morning in a minute or two.
- Usage context: ambient monitoring ("is the business OK today?"), often
  interrupted, usually a quick scan rather than deep analysis.
- Device/viewport reality: laptop first (1280 to 1536px). Must stay usable
  down to a narrow window (~360px) since founders open it on a phone over
  coffee; no dedicated mobile design beyond stacking and scrollable tables.

## Dashboard classification

Monitoring dashboard (per references/dashboards.md): status first, details
on demand. One question: "is the business healthy this morning?"

Widget sentences (D1/D2):

- MRR tile + trend: tells the founder current revenue and momentum so they
  can decide whether growth needs attention today.
- Churn tile + trend: tells them whether retention is degrading so they can
  decide to dig into churned accounts.
- WAU tile + trend: tells them whether usage is growing so they can judge
  product health, a leading indicator for revenue.
- Feature adoption: tells them which features carry the product and which
  are ignored so they can decide where to invest or intervene (SSO at 18%
  and CSV export at 31% are the laggards).
- Recent signups: tells them who just arrived and in what state (trial,
  active, churned) so they can decide who to follow up with this morning.

No metric in the fixture lacks a decision, so nothing is cut; everything in
the data contract stays reachable.

## Tasks

1. Scan the three headline numbers (MRR, churn, WAU) with their deltas and
   confirm nothing regressed. This dictates layout: KPI tier at top, MRR
   dominant.
2. Glance at the 13-month trends to confirm the direction of travel.
3. Skim recent signups for new trials worth a follow-up and any churn.
4. Occasionally check feature adoption for where to invest next.

## Placement in IA

- Entry points: it is the whole app for this exercise; assumed to be the
  landing page a founder bookmarks. No app shell or nav is built (single
  page, single screen), so the navigation module was not routed in.
- One level up: none (root).
- Onward paths: none in scope. Row-level "open account" actions are out of
  scope; the signups table is read-only.

## States matrix

Data is hardcoded, so the page normally lands directly in Ideal. The other
states are still implemented per widget (hard rule 2): the static HTML
ships skeletons (what you see while JS boots or if it never runs), every
renderer has guard paths for empty/partial input, and each widget render is
wrapped in try/catch with a Retry action. The table's empty state is
genuinely reachable via search/filter.

| View | Empty (no data yet) | Loading | Error | Partial (some data) | Ideal |
|------|---------------------|---------|-------|---------------------|-------|
| KPI tiles (x3) | "No data yet for this metric" note in the tile | skeleton blocks, same tile height, no layout jump | "Couldn't compute this metric" + Retry | value shown, delta omitted with "no prior month to compare" note | value + delta vs last month + vs a year ago |
| Trend charts (x3) | "No history recorded yet" in the plot area | skeleton block at chart height | "Couldn't draw this chart" + Retry | plots the months that have values + "showing N of 13 months" note | 13-point line, area wash, endpoint label, crosshair tooltip, keyboard access |
| Trends table (toggle view) | "No history recorded yet" row | covered by section skeleton | same try/catch + Retry as charts | renders available rows + note | 13 rows x MRR/churn/WAU |
| Feature adoption | "No adoption data yet" | skeleton rows | "Couldn't load adoption" + Retry | renders the features present (list is the source of truth) | 7 labeled bars with values at the tip |
| Recent signups table | No rows at all: "No signups recorded yet". No rows after filtering: "No signups match" + Clear filters button | skeleton rows | "Couldn't load signups" + Retry | renders the rows present; count line shows how many | 14 rows, 6 columns, search + status filter + sortable columns |

## Density & hierarchy decisions

- The one thing the user must see first: current MRR ($84,120) with its
  month-over-month delta. It gets the largest number on the page (D4).
- Headline KPIs: exactly 3 tiles (within the 5-to-7 cap, D5). Feature
  adoption and signups are tiers below, not KPI tiles.
- At a glance vs on demand: current values and deltas always visible;
  exact monthly figures behind the chart tooltips and a Chart/Table toggle
  (the table is the no-hover twin, so tooltips never gate data); signup
  details in the table with search/filter/sort rather than any drill-down.
- Tiering (D15): tier 1 KPI row, tier 2 the three 13-month trend charts,
  tier 3 feature adoption + recent signups. Tier 1 and most of tier 2 fit
  one laptop screen without scrolling (D19).
- At the narrowest supported width: tiles and cards stack to one column;
  the signups table keeps all six columns via horizontal scroll inside its
  card (nothing silently dropped, P22); charts stay full-width.
- What was deliberately left out: no date-range filter (fixed 13-month
  fixture; a range control would imply data that does not exist), no
  sparklines inside the KPI tiles (the full trend charts sit directly
  below; duplicating them violates D3), no row actions, no export, no nav
  chrome. Dark theme comes only from the provided prefers-color-scheme
  token block, no manual toggle.

## Chart and encoding decisions (routed to dataviz skill)

- MRR, churn, WAU histories: single-series line charts (job: trend over
  time), 2px line in --chart-line, area wash in --chart-fill, >=8px
  endpoint marker with a surface ring, hairline solid gridlines in
  --border, no legend (single series; the card title names it), endpoint
  direct-labeled only, y-axis with clean rounded ticks, one axis per chart
  (never dual-axis; three small multiples instead).
- Feature adoption: horizontal bars (job: ranked magnitude comparison,
  long-ish category names), one hue for all bars (no value-ramp on nominal
  categories), thin bars with rounded data-end, track in --chart-fill,
  value at every bar tip (bars-get-tip-values rule), no pie/donut.
- Hover layer: crosshair + tooltip on each line chart listing month and
  value; bars and table need no crosshair. Keyboard: charts are focusable,
  arrow keys move the readout, so hover and focus expose the same details.
- Numbers: rounded to decision precision (D22): MRR in whole dollars,
  churn one decimal, WAU whole; tabular-nums only in table columns and
  ticks, proportional figures on the big tile values.

## Assumptions

- "Morning health check" means a monitoring dashboard; no editing actions
  exist, so there is no destructive-action surface and no primary button
  (the primary "action" is reading the MRR tile; C5 treated as N/A).
- Delta basis: previous month for tiles (the natural morning question),
  plus a year-ago comparison line for context (D6).
- Churn down is good: its delta uses the --good token when it falls.
- Status semantics: active = good, trial = warn (attention, convert them),
  churned = bad. Chips always carry the text label, never color alone.
- The fixture's signup order (newest first) is the default sort.
- Radius: the token file defines a single --radius (10px); the dataviz 4px
  data-end spec is overridden by the style contract, so bar ends and all
  corners use --radius.
- Font sizes and 1px hairline borders are not covered by any token, so a
  small fixed type scale (12/13/14/18/20/28px) is used; every color, family,
  radius, shadow, margin, padding, and gap comes from the token block.
- No external icon library is allowed (self-contained file), so the UI uses
  text labels throughout; sort direction uses the typographic triangles
  U+25B2/U+25BC next to the column label, not emoji.
- prefers-reduced-motion gates all transitions and the skeleton shimmer.

## Self-audit (references/audit-checklist.md, run after build)

Verified against rendered screenshots (light 1366px, dark, 390px) and
scripted interaction (hover tooltip, keyboard arrows, table toggle, search
to empty, clear filters, sort by MRR, status filter) via headless Chromium.

Passing: C1, C2, C4, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16,
C17, C18, C20, C22, C23, C24, C29, C30. Not applicable: C3 (no destructive
actions), C25 to C28 (single page, no nav).

Justified deviations, none fixed away silently:

- C5: the screen is read-only monitoring; there is no action button by
  design, so "exactly one primary action" is N/A. The one dominant element
  is the MRR figure instead.
- C19: adoption bars carry comparison across features (ranking) but no
  target or delta, because the fixture has a single snapshot and inventing
  a target would fabricate data.
- C21: the trends table (the charts' no-hover twin) has no search or sort;
  it is 13 fixed chronological rows where order is the meaning. The
  signups table, the real worklist, has all three.
- Dataviz deviations: adoption bar values sit in a right-aligned column
  rather than at the bar tip (an 89% bar leaves no room outside the tip;
  the label-fit rule sends them out), and bars have no hover tooltip since
  every value is already directly labeled, so nothing is gated. KPI tiles
  omit sparklines because full trend charts sit directly below (D3, no
  duplication). Bar data-ends use the single token radius (10px) instead
  of the dataviz 4px spec; the style contract wins.
- One layout bug was found in render review and fixed: at 390px the
  nowrap signups table propagated its min-content width through the grid
  and forced page-level horizontal scroll; grid children now get
  min-width: 0 and the page no longer overflows (the table scrolls inside
  its own card).

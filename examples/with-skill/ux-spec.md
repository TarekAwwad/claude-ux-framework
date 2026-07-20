# UX spec: Acme business overview dashboard

## Context

- Primary user: startup founder / CEO. Not a data analyst; comfortable
  reading a P&L but not SQL. Expert in their own business, novice at the
  tool. Uses it daily, so the layout can assume familiarity after day one
  but must still be scannable cold (an investor update or a bad-news
  morning shouldn't require re-learning the screen).
- Usage context: ambient monitoring, first thing in the morning, coffee in
  hand, 2-5 minutes, frequently interrupted (Slack, email). The user wants
  a yes/no read on "is anything on fire" before they decide where to spend
  the rest of the day. This is not a focused analytical session.
- Device/viewport reality: primary device is a laptop (1366-1920px). The
  founder persona also checks from a phone between meetings, so the layout
  must reflow to a single column down to ~375px rather than assume
  desktop-only.

## Assumptions

Recorded here per the "no questions, reasonable assumptions" instruction:

- Product/company name is invented as "Acme" (a generic, widely-recognized
  placeholder name) to avoid implying this is a real company's live data.
- Metric definitions: MRR = monthly recurring revenue; churn = monthly
  logo/customer churn rate; active users = monthly active users (people
  logging in, which can exceed paying-account count under per-seat
  billing); ARPU = MRR / paying accounts, shown as supporting context
  rather than a headline tile. All comparisons are "vs. last month" for
  consistency, stated on every tile.
- Business-health metrics (MRR, active users, churn) are monthly-cadence
  by nature, so the trend range control offers 6 / 12 months rather than
  day-granularity presets (7D/30D) that don't exist for this data.
- All data is hardcoded fake data generated for this build; no backend
  exists. Loading/error/empty/partial states are therefore simulated: the
  page always plays a real ~700ms loading state on first paint, and a
  small "Preview state" control (top-right, secondary/muted) lets a
  reviewer switch any moment between Loading / Empty / Error / Partial /
  Ideal to verify all five states actually render, since there is no
  backend failure to trigger them naturally.
- Independently-loading "views" are grouped at the section level (KPI
  summary row / Trends / Feature adoption / Recent signups) rather than
  one state machine per KPI tile. In a real product these would likely
  share 2-3 aggregate endpoints anyway; five independent tile-level state
  machines would add implementation weight without changing what the
  founder sees or decides. This is a scale-down, not a skip, per hard rule
  1, and is called out again in the self-audit.
- Dark mode is supported automatically via `prefers-color-scheme` using
  the dataviz skill's validated dark-mode steps; no manual theme toggle is
  added since nothing else in the shell needs one.

## Tasks

1. See at a glance whether the business is healthy right now (MRR, churn,
   active users all trending the right way) - zero clicks, first thing in
   the viewport.
2. Spot a concerning trend or anomaly before it becomes a crisis (a churn
   spike, MRR flattening against target) - one glance down, no click.
3. See which features are actually landing with customers, to know what
   to double down on or push in onboarding - one section down.
4. Recognize who just signed up, to do founder-led outreach - searchable
   table, bottom of the page.

Task 1 dictates the layout: the KPI row is the first thing in the
viewport, and MRR (the single number a founder is asked about most)
carries visibly more weight than the other four tiles.

## Placement in IA

- Entry points: this is the app's home screen, shown immediately after
  login. If the product grows a multi-page IA later (billing, customers,
  settings), this stays what a top-level "Dashboard" nav item points to.
- One level up: none - this is the root screen.
- Onward paths: the trends filter scopes the three trend charts; a
  feature bar or a signup row would open a detail view in a full product
  (out of scope for this single-page build, so rows are not fake-linked
  anywhere they'd dead-end).

## States matrix

"View" here means the four independently-loading regions described in
Assumptions. Every region implements all five states in the build; the
"Preview state" control lets any of them be exercised without a backend.

| View | Empty (no data yet) | Loading | Error | Partial (some data) | Ideal |
|------|---------------------|---------|-------|---------------------|-------|
| KPI summary row (MRR, active users, churn, new signups, ARPU) | "No billing or usage data yet" message per tile with guidance to connect billing/product analytics; no fabricated zeros | Skeleton blocks matching tile shape (label bar + value bar + sparkline bar), no layout shift on resolve | Per-tile inline message "Couldn't load this metric" + icon + Retry button; other tiles unaffected | Value shown with delta replaced by "prior period unavailable" when the comparison point is missing | Value, signed delta vs last month (icon + color, never color alone), 12-point sparkline |
| Trends (MRR / active users / churn charts) | "Not enough history yet - check back after your first full month" per chart | Skeleton chart silhouette (axis + faint bar/line shapes), range control disabled meanwhile | Inline error banner in the card + Retry; other two charts unaffected | Chart renders the months that exist and labels the cut-off ("showing 4 of 12 months") rather than guessing | Full line/bar chart, target baseline, tooltip + crosshair on hover/focus, "view as table" toggle |
| Feature adoption | "No feature usage recorded yet" with guidance to wait for accounts to onboard | Skeleton horizontal bars at varying widths | Inline error + Retry inside the card | Renders only the features with data and notes any excluded for insufficient sample | Ranked horizontal bars, % labels, "view as table" toggle |
| Recent signups table | "No signups yet in this range" with a suggestion to widen the range | Skeleton rows (5 placeholder rows) | Inline error banner above the table + Retry | Rows render with "-" in place of any field still enriching (e.g. plan not yet assigned), rest of row usable | Full sortable/filterable table; a separate, always-on empty-result state ("No signups match your search") covers the case where search/filter narrows to zero rows, independent of the demo state selector |

## Density & hierarchy decisions

- The one thing the user must see first: the MRR value and whether it
  moved up or down since last month. It is the largest element on the
  screen and sits top-left.
- At a glance vs on demand: KPI values, their deltas, and trend direction
  are always visible with zero interaction. Exact tooltip values, full
  12-month history, per-row table actions, and the empty/loading/error
  state variants sit behind hover, focus, a toggle, or the range control.
- What was deliberately left out: cohort retention curves, revenue-by-plan
  breakdown, invoice/billing detail, a customer health score, and any
  settings/admin surface. These serve a deeper analytical or operational
  session, not a 2-5 minute morning read, and would dilute the one
  question this screen answers ("is the business OK right now"). They
  belong on dedicated analytics or customer-detail screens instead.

## Dashboard classification (dashboards.md D1/D2)

Monitoring dashboard: "is everything OK right now?" Status first (KPI row,
big and binary-readable via color+icon delta), anomalies pop (the churn
spike month and any red bar), details on demand (trend charts and the
signups table sit below the fold as the "why" layer, not the "what"
layer). Feature adoption and recent signups are the supporting detail a
monitoring dashboard surfaces beneath its status row, not a second
competing dashboard type.

# UX spec: Ledgerline operations overview

One screen, one HTML file. Two coherent jobs the ops lead does each morning:
read business health, then work the customer accounts list. The screen keeps
each job in its own top-level tab so neither dashboard type bleeds into the
other (dashboards.md: mixing monitoring and worklist on one visible screen is
the top failure), while both stay on this single page.

## Context

- Primary user: operations lead at a B2B SaaS (Ledgerline). Expert, uses this
  screen daily as the first thing each morning. Knows the accounts and the
  metrics; wants speed and density, not hand-holding.
- Usage context: focused morning work session. First a scan of health
  ("is the business OK?"), then sustained work in the accounts list (find,
  triage, fix, act). Not ambient/wall-mounted; it is a working screen.
- Device/viewport reality: desktop-first (laptop 1366px and up is the real
  target). Must stay usable and lose nothing down to ~768px; below that it
  degrades to horizontal scroll on the table rather than dropping fields.

## Tasks

Two task clusters. The tabs order them the way the morning runs.

Business health (Tab 1, monitoring):
1. Read whether the business is healthy right now: current MRR and its trend
   (the single most important number), churn, and active users, each with a
   comparison so the number means something.
2. See where product usage is landing (feature adoption) and who just signed
   up (recent signups) to spot momentum or risk.

Customer accounts (Tab 2, operational worklist; this is where the time goes):
1. Find a specific account by name and read all of its fields.
2. Spot accounts that need attention (past due, churned, low or missing
   health, ticket load) and accounts with bad/missing data to fix.
3. Fix a wrong or missing field value on an account.
4. Act on several accounts at once (bulk auto-renew, bulk delete).
5. Remove an account.

Task #1 of the accounts cluster (find + read a record) and the triage filters
get the primary position in Tab 2; the accounts table is the main working
surface of the whole screen.

## Placement in IA

- Entry points: top-level "Operations overview" screen; the app's default
  landing screen for the ops lead. The two tabs (Business health, Accounts)
  are the in-screen navigation; deep-linkable via `#health` / `#accounts`.
- One level up: the Ledgerline app shell (not built here; this is the single
  screen requested).
- Onward paths: from a health signal (rising churn, a risky signup) the user
  moves to the Accounts tab to act; from an account they open its detail panel
  to read, edit, or remove. No separate detail page: the panel keeps the list
  in view.

## States matrix

Every independently loading region handles all five states. Data is hardcoded,
so the app runs a short simulated load on open (skeletons), then renders; the
error path is wired to the same loader (a load/parse failure renders the error
card with Retry). Partial = real here: 43 accounts have null health_score, 39
have null last_activity, 102 have empty notes; 13-month series and lists render
whatever is present.

| View | Empty (no data yet) | Loading | Error | Partial (some data) | Ideal |
|------|---------------------|---------|-------|---------------------|-------|
| KPI cards (MRR / churn / WAU) | "No data for this metric yet" in the card, no chart frame | skeleton block sized to the card (no layout jump) | "Couldn't load this metric" + Retry | series with gaps renders the points it has; delta hidden if prior month absent | current value, delta vs prior month, 13-pt line, expandable exact-values table |
| Feature adoption | "No adoption data yet" | skeleton bars | "Couldn't load adoption" + Retry | renders the features present | all 7 bars, ranked, % labelled |
| Recent signups | "No signups in this window" | skeleton rows | "Couldn't load signups" + Retry | renders rows present; missing cell shows "Not set" | 14 rows, 6 fields, status chips |
| Accounts table | no-data-yet: "No accounts yet" (distinct from no-match) | skeleton rows on first load | "Couldn't load accounts" + Retry | rows with null health/last_activity show "Not set" + a "Missing data" flag; "Missing data" quick filter surfaces them | 400 rows, paged 50/page, search+filter+sort |
| Accounts — filtered result | no-match: "No accounts match these filters" + Clear filters (shown only when a filter/search is active) | inline spinner on the table region during re-filter | same table error card | partial fields still render "Not set" | matching rows |
| Account detail panel | n/a (only opens for a real row) | n/a (data already in memory) | inline field validation errors on Save | opens even when some fields are null; nulls shown as "Not set" and editable to fix | all 12 fields, editable, with Save/Delete |

## Density & hierarchy decisions

- The one thing the user must see first: current MRR ($84,120) with its trend.
  It is the largest number on the Business health tab and carries the strongest
  weight (dashboards D4). On the Accounts tab, the search box + triage filters +
  the account name column lead.
- At a glance vs on demand: KPI current value + delta + sparkline-scale line are
  always visible; the exact 13 monthly numbers sit behind a per-card "Show
  monthly values" disclosure (every value in the DOM, one click away). In the
  accounts table, the nine highest-value fields are columns; signed_up,
  auto_renew, and notes live in the row's detail panel (opened by the row
  expander). All 12 fields reachable, none only in source.
- At the narrowest supported width, what survives: the accounts table keeps
  Company (frozen leftmost identifier), Status, Health, MRR, and Open tickets
  (the fields that answer "which accounts need attention"); the rest stay
  reachable by horizontal scroll inside a labelled, keyboard-focusable region
  (tables T4/T14), never dropped. Recent-signups and adoption reflow but keep
  every field.
- What was deliberately left out and why: no separate per-account full page
  (the non-modal panel keeps the list in view, tables T6); no pie/donut/gauge
  for the quantitative trends (dashboards D9 — lines for trend, bars for the
  adoption ranking); no second copy of any KPI; charts use the provided
  --chart-* tokens rather than a full dataviz palette.

## Assumptions (recorded per instructions)

- Two top-level tabs on one page (one HTML file) is the chosen way to keep a
  monitoring view and an operational worklist from mixing on one visible
  screen, while satisfying "everything reachable on this single page." Health
  is the first/default tab because the user reads health first each morning.
- "Needs attention" quick filter is defined as: status past_due OR churned, OR
  health_score < 40, OR health_score missing, OR open_tickets >= 5. "Missing
  data" quick filter = health_score is null OR last_activity is null. These
  thresholds are my definition; the data itself is unchanged.
- Editing, delete, and bulk actions mutate only in-page state (no backend).
  Edits/deletes are session-only and reset on reload; this is stated in the UI.
  This keeps the hardcoded data verbatim as the source of truth on load while
  letting the user perform the required find/edit/bulk/remove actions.
- High-stakes edits (all field edits) are routed to the detail panel with an
  explicit Save and inline validation (tables T7/T11), not inline cell editing.
- Delete is guarded by a confirm step and reversible via an Undo toast (P17).
- Chart styling: no dedicated dataviz skill was read (task restricts file reads
  to the fixtures and skill-required files), so charts are built legible-first
  from the --chart-line / --chart-fill tokens, with visible axes/labels, real
  proportions, and no 3D (dashboards D10/D20).
- Loading and error states run through a simulated loader so all five states in
  the matrix are built and exercised, even though the data is embedded.
- Numbers shown at decision precision: MRR and account MRR as whole dollars
  with thousands separators, churn to one decimal + "%", WAU with separators,
  adoption and health as integers.

# Design: `full` validation scenario (dashboard + tables on one screen)

Date: 2026-07-21

## Goal

Add a third validation scenario, `full`, that exercises the entire
ux-framework on a single artifact: one Ledgerline screen that contains
both a dashboard region (KPIs, trends, charts) and a data-table region
(the 400-account customer grid). The existing suite tests the two UI types
in isolation (the `dashboard` and `tables` scenarios); `full` tests them
together, so the whole audit checklist (dashboard checks C17-C24 and
tables checks C31-C40, plus the shared state/hierarchy/nav checks) applies
to one build. Then run and publish one scored with/without pair.

This is one new scenario, not two scenarios bolted side by side. Each side
produces exactly one `index.html` with both UI types living on the same
page. Data is reused verbatim from the two existing pinned fixtures so the
numbers stay comparable to past runs; only the prompt and the checks path
are new.

## The single-screen framing

One coherent product screen: a Ledgerline "operations overview" for one
persona, an operations / customer-success lead who opens the app each
morning to read business health, then works the accounts list. The screen
has a business-health region up top and a customer-accounts grid below.
Both regions are on the same page and both must satisfy their rules.

## Data (reuse both fixtures verbatim)

- Metrics: `fixtures/data.json` (MRR + 13-month history, churn + history,
  WAU + history, 7 feature-adoption percentages, 14 recent signups).
- Accounts: `fixtures/tables-data.json` (400 accounts, all fields).
- Style: `fixtures/tokens.css`, unchanged.

No new data is authored. Both fixtures must be hardcoded verbatim and both
are checked.

## Files

1. `validation/prompts/full-common-body.md` (new). Shared verbatim by both
   sides. Merges the two data contracts (both fixtures, everything
   reachable), the dashboard reachability list, and the four table
   operations (find, bulk-act, edit, remove), on one screen. Style
   contract identical to the other scenarios. Reuses the existing
   scenario-agnostic `baseline.md` / `with-skill.md` preambles unchanged.

2. `validation/checks.js` (edit). Add a `full` scenario that:
   - loads both fixtures (runner extended to load a `fixtures` map when a
     scenario declares one, keeping the single-`fixture` scenarios as-is);
   - runs `checkFullBuild`, which composes the existing helpers: the
     dashboard source/data checks (companies, features, series) against
     `data.json`, the tables source/data checks (account + owner names)
     against `tables-data.json`, `sharedSourceChecks` once, one
     `RUNTIME-no-errors`, `tableControlChecks`, the dashboard
     series-reachability probe, the tables reachability / windowing /
     selection / destructive-guard / empty-search probes, and one
     `narrowTableCheck`. No check runs twice.
   - writes `checks-report.json` with `scenario: 'full'`.

3. `validation/protocol.md` (edit). "The suite has two scenarios" -> three.
   Document the `full` (`full-common-body.md` + both fixtures) row, the
   `runs/<date>-full/` naming, and that a full run applies the entire
   audit checklist.

## The run (per protocol, into `runs/2026-07-21-full/`)

Reinstall Playwright and point `NODE_PATH` at it (the current
`pw-verify` copy is broken); Chrome is used via channel so no browser
download. Record env in `run.md`. Launch baseline + with-skill build
subagents in parallel, fresh, neither seeing the other, forbidden from
reading repo files beyond the two fixtures (with-skill also reads the
skill). Store both composed prompts verbatim in `run.md`. Score:
`node checks.js --scenario=full <baseline> <with-skill>`, then a manual
audit of both against every applicable check in `audit-checklist.md` ->
`scorecard.md`. Stray-file sweep (`git status`) before committing.
Screenshots last, for documentation only.

## Publish

Copy the run logs into `docs/validation-runs/2026-07-21-full/` and add a
"Full scenario: run 2026-07-21-full" section to `docs/validation.md` with
the blocker/major/minor table and a short prose summary. `examples/` is
left as the canonical 2026-07-20c pair; not touched.

## Non-goals

- No new fixture data, no merged fixture.
- No changes to `examples/`.
- No changes to the `dashboard` or `tables` scenarios or their prompts.

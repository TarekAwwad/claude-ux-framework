# Validation: with/without smoke test

Date: 2026-07-16. Same prompt, one subagent with the skill, one without.

Both builds are single-page analytics dashboards (vanilla JS, inline CSS, fake
data) for a B2B SaaS covering MRR, churn, active users, feature adoption, and
recent signups. Each HTML file was rendered in headless Chrome via Playwright at
1440x900 (desktop) and 375px (mobile), in light and dark, and every preview
state on the with-skill build was driven and screenshotted. Code was read for
the state-handling paths and semantics that rendering cannot show. Every
applicable check in the audit checklist was answered for both files.

## Checklist scores

| Check group | Baseline failures | With-skill failures |
|-------------|-------------------|---------------------|
| Hierarchy and focus (C5-C6, C11, C13-C16) | C6 (MAJOR), C13 (MINOR) | none |
| States (C1-C4, C10) | C1 (BLOCKER) | none |
| Navigation and consistency (C7-C9, C12, C25-C28) | C12 (MINOR) | none |
| Dashboards (C17-C24) | C21 (MAJOR), C23 (MINOR), C24 (MINOR) | none |

Totals. Baseline: 1 BLOCKER, 2 MAJOR, 4 MINOR. With-skill: 0 / 0 / 0.

Checks answered not-applicable (applied equally to both): C3 (no destructive
actions in either build), C5 (a read-first monitoring dashboard has no single
primary-action button; the dominant element is the hero metric, covered by C6),
and C25-C28 (single-page app, no cross-screen navigation to be consistent about).

Where both pass and it matters: C2, C4, C7-C10, C17-C20, C22 pass on both.
Chart-type fit (C20), the small semantic palette (C9), right-aligned numerics
(C23), and no-pie/no-gauge all hold on both sides because both
agents shared chart-level guidance (see the caveat below). C19 passes on both,
but by different means: the baseline carries context through delta plus
sparkline only, while the with-skill build adds explicit targets and benchmarks
on top of that.

## Observations

- Task ranking showed up in the layout. The with-skill spec ranks four tasks and
  states that task 1 ("is the business healthy right now") dictates the layout,
  so MRR is a hero tile: 44px value versus 26px, a 1.6fr column versus 1fr, and
  an accent-tinted border. The baseline gives all four KPI tiles equal size and
  weight, so nothing is visibly dominant and the eye lands nowhere in
  particular. That is the C6 difference, and it is visible on first paint.

- States handling is the widest gap. The baseline ships the populated view plus
  a single "No signups in this range" empty message, and nothing else: no
  loading, error, or partial state anywhere, and no empty state for the KPI row,
  the charts, or feature adoption. The with-skill build implements all five
  states across all four regions and exposes them through a labeled "Preview
  state" control. Loading renders shape-matched skeletons, empty and error show
  an icon plus guidance plus a Retry button, and partial degrades honestly with
  "prior period unavailable" on the deltas, "showing 5 of 12 months" on the
  charts, and dashed placeholder cells in the table. This is the C1 blocker the
  baseline fails and the with-skill build clears cleanly.

- Hierarchy and consistency beyond the hero. The with-skill build draws spacing
  and radii from a token scale (--sp-1 through --sp-6, --radius, --radius-pill)
  and separates sections with visibly more space than it uses inside a card. The
  baseline uses one-off pixel values (7/9/12px radii, 14/16/18/20/22px spacing)
  with section gaps no larger than the gaps between cards in a row, which is the
  C12 and C13 miss. Card titles differ the same way: the with-skill build frames
  each card as the insight it answers ("Churn rate vs 3.0% target", "Active
  users trend, +5.2% this month", "Low adopters are onboarding-nudge
  candidates"), while the baseline uses bare labels ("Churn rate trend"). That is
  C24.

- The signups data table is a clean C21/C23 split. The with-skill table has a
  company search, plan and status filters, sortable columns, plan and status
  shown as chips, and its own zero-result state with a "Clear filters" button
  (verified by searching a string that matches nothing). The baseline signups
  table is static: no search, no filter, no sort, and plan rendered as plain
  text rather than a chip.

- What the skill did not fully harden, as a candidate fix. The churn bar chart
  still leans on red versus green to signal over or under target. Position
  relative to the dashed target line plus per-bar value labels carry the meaning
  for a colorblind reader, so it passes C4, but this is the one spot where a
  non-color marker (a hatch or an over-target dot) would make the good/bad read
  independent of hue. It is a small polish, not a failure. Nothing else in the
  with-skill build reads as an unaddressed gap.

- The spec artifact is filled meaningfully, not boilerplate. ux-spec.md records
  the persona and the 2-to-5-minute morning usage context, ranks the four tasks,
  states the MRR-hero decision explicitly, lists what was deliberately left out,
  and carries a four-view by five-state matrix that the build actually
  implements. It reads as evidence the skill drove a process, not a template
  filled after the fact.

- Dataviz caveat (stated for honesty, keeps the comparison conservative). The
  baseline agent also had a session dataviz skill giving chart-level guidance, so
  both sides shared the same chart know-how. That is why chart-type fit, the
  color palette, right-aligned numerics, and the no-pie rule pass on both. The
  delta measured here is the ux-framework layer specifically: state coverage,
  task-driven hierarchy, table affordances, spacing tokens, insight-framed
  titles, and chips. Because the easy chart wins are shared, this understates
  rather than inflates the skill's effect.

## Verdict

Ship.

The bar from the plan was to iterate only if the with-skill version fails more
than 2 MAJOR checks that the skill explicitly covers. It fails zero MAJOR checks
(and zero of any severity). The skill closed exactly the gaps it targets: on the
same prompt it took the build from 1 blocker, 2 major, and 4 minor failures down
to none, with the largest movement on state coverage (C1) and task-driven
hierarchy (C6), the two things the framework is most centrally about. The one
remaining polish (a non-color cue on the churn bars) is minor and does not
warrant a skill edit before shipping.

# Rule candidates for ux-framework

Distilled from research/findings-skills.md and
research/findings-practices.md. Each rule: imperative, checkable, sourced.
"Agent failure?" answers: would a code-generating agent plausibly get this
wrong without the skill? Rules marked no are cut and listed at the bottom.

The unverified "2025 NN/g analysis of 50 AI-generated dashboards" statistic
(flagged as possibly fabricated in findings-practices.md) is deliberately not
used as a source anywhere below. Where a rule covers the same ground (empty and
error states), it is sourced to NN/g's actual empty-state article instead.

Source tags map to the URLs in the two findings files. NN/g articles are keyed
by slug (empty-state, preattentive, vertical-nav, menu-design, ia-questions,
complex-apps, ten-heuristics). Kole Jain items cite the specific sozai.app
transcript (his content reached us only as AI-generated summaries, treat as
paraphrase). "Known failure mode" means the justification is the agent default
itself, not an external citation.

## P: Generic principles (target: references/principles.md)

| ID | Rule (imperative, one line) | Source | Agent failure? |
|----|------------------------------|--------|----------------|
| P1 | Do a UX pass before writing UI code: name the primary user, their top task, and every state this screen can be in. | findings-skills (before-generating gate); known failure mode | yes: agents jump straight to code and design only the happy path |
| P2 | Give each screen exactly one primary action, styled at the highest contrast; secondary actions must read as visibly lower weight. | Refactoring UI (paraphrase); known failure mode | yes: agents style multiple buttons at equal weight so nothing leads |
| P3 | Design and build empty, loading, error, and partial-data states for every data-backed view, not just the populated one. | NN/g empty-state; partial-data extension from design spec states matrix | yes: agents render only the populated view with mock data |
| P4 | Give every user action visible feedback (disabled or pending button, spinner, toast, or confirmation); no silent state change. | Kole Jain beginner-mistakes (sozai); NN/g ten-heuristics | yes: agents wire actions with no pending or success feedback |
| P5 | Establish one clear visual hierarchy: the most important element must differ in size, weight, or color from the rest. | Refactoring UI (paraphrase); Laws of UX (Von Restorff) | yes: agents emit uniform grids where every element competes |
| P6 | Create hierarchy by de-emphasizing competing elements (lower contrast, muted color), not by enlarging the primary one. | Refactoring UI (paraphrase) | yes: agents scale the primary up instead of toning the rest down |
| P7 | Use two or three text colors (dark primary, gray secondary, lighter tertiary) and keep body weight at roughly 400 or above. | Refactoring UI (paraphrase) | yes: agents ship one flat text color or illegibly thin, pale text |
| P8 | Make spacing between groups visibly larger than spacing within a group so grouping reads without borders. | Refactoring UI (paraphrase); Laws of UX (Gestalt) | yes: agents use uniform gaps so related items do not separate |
| P9 | Draw every margin and padding from a defined spacing scale (e.g. 4/8/12/16/24/32); no arbitrary one-off pixel values. | Refactoring UI (paraphrase) | yes: agents emit ad hoc values like 13px or 27px |
| P10 | Standardize one corner-radius value, one button-size scale, and one icon set across the whole UI; reuse tokens. | Kole Jain beginner-mistakes (sozai) | yes: agents improvise per component, mixing radii and icon styles |
| P11 | Use a single icon library; never use emojis as UI iconography in a professional product. | Kole Jain vibe-code (sozai) | yes: agents reach for emojis as icons and status markers |
| P12 | Give any icon-only control or abbreviation a visible text label or a tooltip. | Kole Jain dashboard-flaws (sozai); NN/g ten-heuristics | yes: agents ship icon-only buttons with no label or tooltip |
| P13 | Keep the working palette small (roughly 6 colors) and reserve specific hues for consistent semantic meaning (e.g. red only for destructive or error). | Stephen Few (summary); Kole Jain vibe-code (sozai) | yes: agents scatter many accents and reuse red decoratively |
| P14 | Never use color as the sole signal of state or category; reinforce it with text, icon, or shape. | NN/g preattentive | yes: agents encode status by color alone, failing color-blind users |
| P15 | Keep shadows, gradients, and glows subtle, and do not use `transition: all`. | Kole Jain beginner-mistakes (sozai); tommyjepsen craft.md | yes: agents default to opaque drop shadows, purple gradients, blanket transitions |
| P16 | Remove anything that does not serve the primary task; every extra element competes with the important ones. | NN/g ten-heuristics | yes: agents pad screens with decorative filler and rarely-needed controls |
| P17 | Guard destructive actions with an undo, cancel, or confirmation step rather than executing them irreversibly. | NN/g ten-heuristics | yes: agents wire delete and remove with no guard |
| P18 | Write empty states and error messages as guidance (what happened, what to do next), not bare "No data" or raw error text. | NN/g empty-state | yes: agents emit generic "No results" or dump raw error strings |
| P19 | Constrain paragraph and text-column width to roughly 45 to 75 characters. | Refactoring UI (paraphrase) | yes: agents let text lines span the full viewport width |
| P20 | Reserve modals for focused multi-field tasks; use popovers or inline UI for lightweight, non-blocking interactions. | Kole Jain build-dashboard (sozai); Kole Jain vibe-code (sozai) | yes: agents overuse modals for trivial actions or cram dense forms into popovers |
| P21 | Give every interactive element a visible keyboard focus state (focus-visible), not just a hover style. | known failure mode | yes: agents style hover only, or strip the default outline |
| P22 | When a narrow viewport forces a table or grid to shed columns, keep the fields that answer the user's top task and relocate the rest (stacked rows, expandable detail, horizontal scroll); never drop them silently. | known failure mode. Initially logged as an observed smoke-test failure (the 375px screenshot shows only two columns), but code re-inspection found the columns preserved behind overflow-x scroll, which the rule permits; the screenshot alone was misleading | yes: agents commonly hide columns with display:none at breakpoints |
| P23 | Gate non-essential animation behind `prefers-reduced-motion`. | observed failure in validation smoke test, 2026-07-20: the with-skill build shipped no reduced-motion handling (the baseline did) | yes: observed even with the skill loaded |

## D: Dashboards (target: references/dashboards.md)

| ID | Rule | Source | Agent failure? |
|----|------|--------|----------------|
| D1 | Before layout, write the plain-language questions the dashboard must answer, and design each section as the answer to one question. | uxpin dashboard-principles | yes: agents lay out a generic KPI grid with no question driving it |
| D2 | Name the audience and the decision the dashboard drives; if no action follows from a metric, drop it. | NickCrew dashboard-designer; Stephen Few (summary) | yes: agents fill dashboards with vanity metrics that inform no decision |
| D3 | Show a distinct, decision-relevant metric in each tile; do not repeat the same KPI card or add generic filler blocks. | Kole Jain vibe-code (sozai) | yes: agents duplicate near-identical stat cards to fill the grid |
| D4 | Give the single most important metric clearly greater visual weight than the rest of the dashboard. | Refactoring UI (paraphrase); Laws of UX (Von Restorff) | yes: agents render all KPI tiles identical |
| D5 | Limit headline KPIs on the primary view to roughly 5 to 7; push the rest behind drill-downs, filters, or secondary views. | uxpin dashboard-principles; Laws of UX (Miller) | yes: agents surface every available metric at once |
| D6 | Give every number context (a target, benchmark, delta, or trend), not an isolated figure. | Stephen Few (summary) | yes: agents render bare numbers with no comparison |
| D7 | Title each card as the insight or claim it answers ("Weekly signups vs target"), not a bare label ("Signups"). | uxpin dashboard-principles; NickCrew dashboard-designer | yes: agents title cards with the raw field name |
| D8 | Choose chart type by the question (trend, ranking, part-to-whole, correlation, distribution), not by the shape of the data. | Datawrapper chart guide; NN/g preattentive | yes: agents map any table to a default bar or line without matching intent |
| D9 | Use length or 2D position (bar, line, scatter) for quantitative comparison; do not use pie, donut, gauge, or 3D charts for it. | NN/g preattentive | yes: agents reach for pie, donut, or gauge for magnitude comparison |
| D10 | Keep charts legible over decorated: visible axes and labels, proportional bars, no 3D or heavy styling. | Kole Jain beginner-mistakes (sozai); Stephen Few (summary) | yes: agents add gradients, 3D, and chart junk |
| D11 | Right-align numeric table columns so digits line up by place value; left-align text columns. | Kole Jain dashboard-flaws (sozai) | yes: agents left-align every column including numbers |
| D12 | Render categorical or status fields as chips or badges, not plain text. | Kole Jain dashboard-flaws (sozai) | yes: agents dump status values as raw text |
| D13 | Give every data table functional search, filter, and sort, not static rows. | Kole Jain build-dashboard (sozai) | yes: agents render static tables with no controls |
| D14 | Truncate long cell text and use row shading or dividers to keep dense tables scannable. | Kole Jain dashboard-flaws (sozai) | yes: agents let long text break layout and ship unstyled dense rows |
| D15 | Structure the dashboard in tiers: summary KPIs on top, trends in the middle, detailed tables and drill-downs at the bottom. | uxpin dashboard-principles | yes: agents place components in arbitrary order |
| D16 | Use tighter grid, type, and spacing scales than a marketing page, since a dashboard packs more onto one screen. | Kole Jain build-dashboard (sozai) | yes: agents apply oversized marketing-style padding to dense dashboards |
| D17 | Progressively reveal secondary and row-level actions (hover, overflow menu, popover) instead of showing them all at once. | Kole Jain dashboard-flaws (sozai); NN/g complex-apps | yes: agents render every row action inline as separate buttons |
| D18 | Make the main content reflect what this specific user cares about (project status, positions), not a generic template. | Kole Jain build-dashboard (sozai) | yes: agents produce a domain-agnostic template layout |
| D19 | Fit the critical content on one screen; the key metrics should be visible without scrolling. | Stephen Few (summary) | yes: agents stack content into a long vertical scroll |
| D20 | Use chart color to encode category or semantic meaning consistently and keep the chart palette small; never as decoration. | Stephen Few (summary); NN/g preattentive | yes: agents color chart series arbitrarily or decoratively |
| D21 | Prefer a purpose-fit visualization for the data (e.g. a map for geospatial data) over a default generic bar chart. | Kole Jain vibe-code (sozai) | yes: agents default every dataset to a bar chart |
| D22 | Round displayed numbers to the precision the decision needs; do not show raw high-precision floats. | Stephen Few (summary) | yes: agents render raw computed values like 73.66666667 |

## N: Navigation & app shell (target: references/navigation.md)

| ID | Rule | Source | Agent failure? |
|----|------|--------|----------------|
| N1 | Keep navigation structurally identical on every screen: same position, order, and active-state logic. | NN/g ten-heuristics | yes: agents regenerate nav per page and let position or order drift |
| N2 | Always show the user's current location in the nav via an active state and/or breadcrumbs. | NN/g menu-design | yes: agents render nav with no current or active indicator |
| N3 | Use a left sidebar once there are more than roughly 5 to 7 top-level sections or for dashboard and enterprise apps; use top nav only for about 5 to 7 sections. | NN/g vertical-nav | yes: agents default to a top nav bar regardless of IA breadth |
| N4 | Do not hide primary navigation behind a hamburger menu on desktop or large screens; show the categories. | NN/g menu-design | yes: agents ship a hamburger on desktop where space is available |
| N5 | Show sidebar items as text labels (icons optional) and left-align them; do not build an icon-only rail. | NN/g vertical-nav | yes: agents build centered icon-only rails with no text |
| N6 | Order nav items by frequency of use, not alphabetically, and push rarely-used items like settings to the bottom. | NN/g ia-questions; Kole Jain build-dashboard (sozai) | yes: agents order links arbitrarily or alphabetically |
| N7 | Add breadcrumbs or a back control whenever navigation moves to a deeper page or level. | Kole Jain build-dashboard (sozai) | yes: agents build drill-down pages with no way back up |
| N8 | Provide local or contextual navigation for closely related pages so users move sideways without returning to the top menu. | NN/g menu-design | yes: agents force a trip back to the root nav to switch between siblings |
| N9 | Do not pair a sidebar with a redundant second horizontal menu of the same links. | NN/g vertical-nav | yes: agents duplicate the same links in a header and a sidebar |
| N10 | Size the nav to the product's actual structure; do not invent a "7 items" cap or pad to a round number. | NN/g ia-questions | yes: agents force menus to an arbitrary fixed count |
| N11 | Mark expandable items with a caret or arrow and open submenus on click, not hover only. | NN/g menu-design | yes: agents build hover-only submenus with no expand affordance |
| N12 | Treat the sidebar as the product spine: put primary navigation, search, and profile or account there. | Kole Jain build-dashboard (sozai) | yes: agents scatter these or omit search and profile from the shell |
| N13 | Consolidate secondary or duplicated top-level links (e.g. combine settings and billing) into grouped menus or popovers. | Kole Jain vibe-code (sozai) | yes: agents spread every destination as a separate top-level item |
| N14 | Avoid deep multilevel cascading menus; use a mega-menu or a landing page for broad sub-navigation. | NN/g menu-design | yes: agents build three-or-more-level nested dropdowns |

## C: Audit checks (target: references/audit-checklist.md)

Checks derived from P/D/N rules, phrased as binary questions. A "flag if yes"
note marks checks where a yes answer is the defect.

| ID | Check (yes/no question) | Derived from | Severity |
|----|--------------------------|--------------|----------|
| C1 | Does every data-backed view implement empty, loading, error, and partial-data states, not just the populated view? | P3, P18; partial-data extension from design spec states matrix | BLOCKER |
| C2 | Does every user action produce visible feedback (pending or disabled state, spinner, toast, or confirmation)? | P4 | BLOCKER |
| C3 | Are destructive actions guarded by an undo, cancel, or confirmation step? | P17 | BLOCKER |
| C4 | Is state or category ever conveyed by color alone, with no text, icon, or shape backup? (flag if yes) | P14, D20 | BLOCKER |
| C5 | Does each screen have exactly one visually dominant primary action? | P2 | MAJOR |
| C6 | Is there a single clear visual hierarchy, with the most important element visibly distinct in size, weight, or color? | P5, P6, D4 | MAJOR |
| C7 | Are emojis used as UI icons instead of a real icon set? (flag if yes) | P11 | MAJOR |
| C8 | Does every icon-only control have a text label or tooltip? | P12 | MAJOR |
| C9 | Is the palette small, with semantic hues (e.g. red for destructive) used consistently? | P13 | MAJOR |
| C10 | Do interactive elements have a visible keyboard focus state? | P21 | MAJOR |
| C11 | Does the UI read as purpose-built for the user and task rather than a generic template? | P1, D18 | MAJOR |
| C12 | Are spacing and radius values drawn from a defined scale or tokens rather than arbitrary one-off values? | P9, P10 | MINOR |
| C13 | Is inter-group spacing visibly larger than intra-group spacing? | P8 | MINOR |
| C14 | Is text limited to two or three colors with legible weight (no sub-400 body, no illegible gray)? | P7 | MINOR |
| C15 | Are decorative effects (shadows, gradients, glows, `transition: all`) kept subtle or absent? | P15 | MINOR |
| C16 | Is paragraph or text-column width constrained to roughly 45 to 75 characters? | P19 | MINOR |
| C17 | Does the dashboard show any duplicated or generic filler KPI tiles? (flag if yes) | D3 | MAJOR |
| C18 | Are headline KPIs on the primary view limited to roughly 5 to 7, with the rest behind drill-downs? | D5 | MAJOR |
| C19 | Does every metric carry context (target, benchmark, delta, or trend)? | D6 | MAJOR |
| C20 | Is chart type matched to the question, avoiding pie, donut, gauge, or 3D for quantitative comparison? | D8, D9 | MAJOR |
| C21 | Does every data table provide search, filter, and sort? | D13 | MAJOR |
| C22 | Is the critical dashboard content visible on one screen without scrolling? | D19 | MAJOR |
| C23 | Are numeric table columns right-aligned and categorical fields shown as chips? | D11, D12 | MINOR |
| C24 | Is each card titled as the insight it answers rather than a bare field label? | D7 | MINOR |
| C25 | Is navigation structurally identical across screens (same position, order, active-state logic)? | N1 | MAJOR |
| C26 | Does the nav always indicate the user's current location (active state or breadcrumbs)? | N2, N7 | MAJOR |
| C27 | Does the nav model fit the IA (sidebar for 7+ sections or enterprise, no desktop hamburger, text labels not icon-only)? | N3, N4, N5 | MAJOR |
| C28 | Are nav items ordered by frequency of use and sized to the product's actual structure, not alphabetized or padded? | N6, N10 | MINOR |

## Cut (model already does this reliably)

- Follow conventional reading order and nav placement, top-to-bottom and left-to-right, nav at top or left (Jakob's Law): models default to conventional layouts and reading order without prompting, so only the harder choice (sidebar vs top by section count, N3) earns a rule.
- Use the user's own language and avoid internal jargon (NN/g heuristic 2): models write plain, human-readable labels by default.
- Keep primary nav and action targets large enough to hit (Fitts's Law): models produce normally sized, clickable controls by default; sub-usable tap targets are rare in generated output.
- Avoid novel or gimmicky navigation patterns (NN/g menu-design): models default to familiar, conventional nav and do not invent exotic patterns unprompted.
- Distinguish operational vs analytical dashboards and design accordingly (NN/g preattentive): a useful framing that shapes emphasis, but not a binary defect an auditor can check; its concrete consequences are already captured by the KPI-tiering and context rules (D5, D6, D15).
- Keep the design aesthetically pleasing because it builds trust (Aesthetic-Usability Effect; Stephen Few): true but not a checkable imperative, and models already aim for polished-looking output.
- Provide searchable, task-focused help and documentation (NN/g heuristic 10): not a code-generation default failure; help content is usually out of scope for a generated screen and not something models get wrong.
- Use a perceptually uniform color space such as OKLCH (Kole Jain 60-30-10): a refinement, not a defect; hex or HSL output is not itself a usability failure an auditor would flag, and models produce workable palettes in any space.
- Provide expert accelerators and keyboard shortcuts (NN/g heuristic 7): a power-user enhancement whose absence does not break the core task, so it fails the agent-default-failure filter.

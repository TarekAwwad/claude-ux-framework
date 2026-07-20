# Findings: practitioner UX best practices

Date: 2026-07-16. Produced by a web-research subagent; sources cited inline.

## 1. Kole Jain (YouTube channel)

Kole Jain is a Canadian web/UI-UX designer and educator (channel: youtube.com/@KoleJain, personal site kolejain.com). Direct transcript fetching from YouTube itself failed (YouTube serves a JS-rendered shell to fetch tools), so the material below comes from third-party transcript summaries hosted on sozai.app (an AI transcription/note-taking service that publishes per-video transcript-and-summary pages). Each principle below is sourced to the specific sozai.app transcript page for a named video, with the underlying YouTube video linked for reference. These are AI-generated summaries of his spoken content, not his own written words. Everything below is paraphrase of the ideas, in our wording, with one exception: phrases in quotation marks were verified by a human against the named videos on 2026-07-20 and are verbatim.

**Video: "The 3 dashboard UI flaws that give away you've NEVER built one"**
Source: https://sozai.app/transcript/dashboard-ui-flaws-never-built-one/ (video: https://www.youtube.com/watch?v=Ksx9C2-3yMo)

- Let the data's actual shape drive layout: right-align numeric columns so digits line up by place value, and turn categorical fields into chips rather than plain text.
- Do not expose every action at once; progressively reveal secondary actions (example given: removing a user from a share) through hover states or popovers instead of showing them by default.
- Add tooltips for icons and ambiguous labels; beginner dashboards almost always skip this invisible layer of UI.
- Truncate long text in tables, align numbers, and use row shading or similar visual aids to make dense tables scannable.
- Use color to encode data meaning (e.g., red for urgent), not as pure decoration.
- Sequence onboarding: introduce functionality gradually with tooltips and checklists rather than loading the full interface on a new user on day one.

**Video: "EVERYTHING you need to know to build a Dashboard UI in 8 minutes"**
Source: https://sozai.app/transcript/build-dashboard-ui-beginner-guide/ (video: https://www.youtube.com/watch?v=B7k5rOgmOGY)

- Treat the sidebar as "the spine of the product": navigation, profile, and search live there; order links by how often they're used, and push rarely-used items like settings to the bottom.
- Use a simple two-column, two-row grid for the main dashboard area; reserve the top region for the page's primary actions.
- The main content area should reflect what the user actually cares about (project status for a PM tool, positions for a finance tool), not a generic layout.
- Dashboards need tighter grid discipline and smaller type/spacing scales than marketing pages, because they must fit far more onto one screen.
- Every table needs functional search, filter, and sort, not just static rows.
- Give cards well-spaced margins; distinguish cards with borders in dark mode and background color in light mode.
- Use popovers for lightweight, non-blocking interactions and reserve modals for complex tasks that need the user's full focus.
- Add back buttons or breadcrumbs whenever navigation moves to a new page/level.
- Keep charts simple: line graphs with gridlines and labels, or bar charts with clear labeling and a range selector, plus a summary and date-range control for context.
- Use toast notifications for lightweight confirmations, bulk-action bars when multiple rows are selected, and optimistic UI (update the UI immediately, reconcile with the server after) for perceived speed.

**Video: "7 UI/UX mistakes that SCREAM you're a beginner"**
Source: https://sozai.app/transcript/ui-ux-mistakes-beginner/ (video: https://www.youtube.com/watch?v=AH_ugxmLeUM)

- Sketch the full user flow before designing screens; explicitly plan for edge cases (empty search results, users with no data yet) rather than only the happy path.
- Keep visual effects (gradients, shadows, glows) subtle; harsh, overly opaque shadows and mismatched gradients read as amateurish.
- Give layouts real breathing room; cramped spacing and uneven vertical rhythm between stacked elements is a top "beginner" tell.
- Standardize component styling: pick one corner-radius value, one button size scale, one search-bar style, and apply it everywhere (use shared styles/tokens/components, not one-off values).
- Use one consistent icon library throughout (mixed stroke widths/styles across icons is a giveaway), and label or add tooltips to any icon whose meaning isn't obvious.
- Remove redundant UI that duplicates a function the interaction already provides (e.g., arrows next to a swipeable carousel).
- Give every user action visible feedback: disable/gray out buttons while processing, show spinners for delays, fill/confirm icons on save, and use badges to confirm state changes. Silent state transitions feel broken.
- Bonus mistake: over-designed charts. Prioritize legibility over decoration; keep axes visible and bars proportional. "Less visual noise equals a better design."

**Video: "Why the 60-30-10 Rule is RUINING Your UI Designs"**
Source: https://sozai.app/transcript/60-30-10-rule-ruining-ui-designs/ (video: https://www.youtube.com/watch?v=66oOi9OLMCw)

- The classic 60-30-10 color ratio oversimplifies real product UI; production interfaces (his example: Vercel) run far more neutral (roughly 90 percent neutral, single-digit percent accent) than the rule implies.
- Build neutrals as a layered system, not one gray: multiple background layers, multiple stroke/border weights, and at least three text-color steps (darkest for headings, mid for body, lightest for sub-text).
- Treat brand/accent colors as a full 100-900 tonal scale, not one hex value; use a mid-tone (500-600) as the primary and a darker step for hover/pressed states.
- Reserve specific hues for semantic meaning consistently (e.g., red only for destructive/error), and use a perceptually uniform color space (he cites OKLCH) so chart colors and status colors read as equally "bright" across hues.
- In dark mode, increase the contrast steps between adjacent neutral tones (roughly double the spacing) compared to light mode, since dark-on-dark differences compress visually.
- Weight buttons by importance: primary actions should be the darkest/highest-contrast; low-priority buttons should sit close to the neutral background (he cites roughly 90-95 percent neutral).

**Video: "Stop Making Pretty UIs. Think Like a Product Designer"**
Source: https://sozai.app/transcript/stop-making-pretty-uis-think-product-designer/ (YouTube link unresolved: the video ID originally listed here turned out to belong to "How to think like a GENIUS UI/UX designer"; locate this one via the channel listing at youtube.com/@KoleJain)

- His framing per the summary (unverified paraphrase; a human review on 2026-07-20 could not locate this passage): UI design is decorating a single room, product design is the whole house, meaning the flow, the function, and how it all connects. Design the system, not the screen.
- Explicitly design every state a user can land in, not just the happy path: empty states with guidance, loading indicators, success confirmations, and error messages that don't leave the user guessing.
- Design for sequences of screens, not isolated screens: think about how a user arrives at a step and what small decision naturally follows (his example: prompt to add teammates right after workspace creation).
- Consistency across spacing, typography, color, and components is what makes new screens feel instantly familiar; it does not require hundreds of components, just decisions you actually stick to.

**Video: "How to think like a GENIUS UI/UX designer"**
Source: https://sozai.app/transcript/think-like-genius-ui-ux-designer/ (video: https://www.youtube.com/watch?v=HE4rLEQpiXY)

- Start every design decision from user intent/task, not decoration (his example: a booking product should open on the search bar, not a hero image).
- Respect layout conventions users already carry (top-to-bottom, left-to-right reading, nav at the top); novelty adds cognitive load.
- Decide deliberately what information a user needs at each stage and surface the scannable essentials first (for a listing: location, rating, price), and handle edge cases like long titles (truncate) and icon contrast.
- Animation should clarify or serve function (consolidating navigation, revealing content on demand), not decorate.
- Prefer progressive disclosure and "load more" controls over infinite scroll, so users keep control and can still reach the footer.
- A design system should encode a team's actual decisions and a shared vocabulary, while still allowing intentional, explicit exceptions (distinct from accidental inconsistency).

**Video: "5 SaaS UI/UX mistakes that SCREAM you Vibe Code"**
Source: https://sozai.app/transcript/saas-ui-ux-mistakes-vibe-code/ (video: https://www.youtube.com/watch?v=PDcQJOPby1k)

This video is explicitly about AI/"vibe-coded" app output, so it is the single most directly relevant Kole Jain source for a code-generating agent.

- Drop emojis as UI iconography in professional products; use a real icon library (he names Phosphor, Lucide).
- "Never let an AI choose any of your colors": AI-generated palettes trend toward oversaturated, clashing color choices.
- "Never let an AI choose your layout either": AI-generated layouts tend to repeat the same KPI three times and default to generic gradient-circle avatars instead of functional account cards, i.e., pattern-matched decoration over purpose-built UI.
- Replace repetitive/duplicate KPI displays with real data visualizations and micro-charts.
- Consolidate navigation: collapse secondary links into popovers, and combine settings/billing instead of spreading them across many top-level entries.
- Simplify cards: collapse multiple buttons into a single triple-dot overflow menu; use icons instead of text chips where space is tight.
- Use modals for dense, multi-field forms, with advanced/rare fields collapsed by default.
- On pricing pages, avoid excessive plan counts (five tiers called out as too many), make discounts and the differentiator between tiers legible, and add trust-building billing detail.
- Favor purpose-fit visualizations (e.g., a geospatial view for location data) over a generic bar chart, and add comparison/toggle affordances where they're cheap to add and high value.
- On landing/marketing surfaces, use real product screenshots rather than generic icons to build credibility.

## 2. Nielsen Norman Group

**10 usability heuristics for user interface design**
Source: https://www.nngroup.com/articles/ten-usability-heuristics/

1. Visibility of system status: keep users informed what's happening, with timely, appropriate feedback.
2. Match between system and the real world: use the user's language and familiar real-world conventions, not internal jargon.
3. User control and freedom: give a clearly marked "emergency exit" (undo, redo, cancel) for mistaken actions.
4. Consistency and standards: don't make users guess whether different words or actions mean the same thing; follow platform conventions.
5. Error prevention: design to prevent problems before they happen, not just to message them well afterward.
6. Recognition rather than recall: make objects, actions, and options visible so users don't have to remember information across screens.
7. Flexibility and efficiency of use: offer accelerators (shortcuts, customization) invisible to novices but useful to experts.
8. Aesthetic and minimalist design: interfaces should not contain irrelevant or rarely needed information; every extra unit competes with the relevant ones.
9. Help users recognize, diagnose, and recover from errors: error messages in plain language, precise about the problem, with a constructive solution.
10. Help and documentation: ideally unnecessary, but if needed, keep it searchable, task-focused, and concrete.

**10 usability heuristics applied to complex applications**
Source: https://www.nngroup.com/articles/usability-heuristics-complex-applications/

- For processes over ~10 seconds, show real progress (steps completed, time remaining), not a generic "please wait."
- Maintain internal consistency (same visual language and terms everywhere in the product) and follow external/platform conventions (e.g., a plus icon always means "add").
- Provide version history and safe undo/back through workflows so users can explore without fear of unrecoverable mistakes.
- Prevent errors by giving real-time previews of parameter changes and incremental feedback before the user commits.
- Use staged/progressive disclosure to keep advanced settings out of the way until they're relevant; strip redundant icons and nonessential graphics that don't aid the primary task.
- Error messages should state the problem in plain language, offer a concrete next step, and link to documentation rather than dead-ending on "contact your administrator."
- Put brief, in-context help (tooltips, inline hints) in the product itself rather than requiring a trip to external docs.

**Dashboards: Making Charts and Graphs Easier to Understand**
Source: https://www.nngroup.com/articles/dashboards-preattentive/

- A dashboard is a single-page collection of visualizations giving at-a-glance information users can act on quickly.
- Distinguish operational dashboards (time-sensitive, real-time data, quick action) from analytical dashboards (deeper exploration, historical trend patterns, less time pressure), and design accordingly.
- For quantitative comparisons, use length and 2D position (bar charts, line graphs, scatterplots); these are processed fastest and most accurately by preattentive vision.
- Avoid encoding numeric magnitude in area or angle; people are bad at judging these (this rules out pie/donut charts, gauges styled like car dashboards, and 3D charts for quantitative comparison).
- Use color to signal category, not quantity, and never as the sole channel of meaning; roughly 8 percent of men are color-blind, so reinforce color with shape, borders, or position.
- Use shape, borders, and spatial proximity as the primary grouping cues; let color reinforce grouping, not carry it alone.

**Left-Side Vertical Navigation on Desktop**
Source: https://www.nngroup.com/articles/vertical-nav/

- Prefer vertical (sidebar) navigation when the IA is broad or growing, when there are 7+ top-level categories, or for enterprise/B2B/dashboard-style products; horizontal top nav is the default only for sites with roughly 5-7 main sections.
- Vertical nav supports longer, more specific labels than a horizontal bar can, cutting interaction cost for users trying to find something.
- Eye-tracking shows users look at the left half of the screen roughly 80 percent of the time; vertical lists also scan faster than horizontal ones.
- Do not pair a sidebar with a redundant horizontal menu; do not hide sidebar items behind icon-only labels (text reduces ambiguity and helps hit targets); left-align labels rather than centering them.
- Put the most important items near the top of a long sidebar, since items further down get less visual attention.

**Menu-Design Checklist: 17 UX Guidelines**
Source: https://www.nngroup.com/articles/menu-design/

Selected guidelines most relevant to app navigation:
- Don't hide navigation behind a hamburger icon on larger screens; visible menus communicate the product's scope.
- Put menus where users expect them (primary nav in the header or left sidebar, utility nav at top, local/contextual nav on the left, footer links at the bottom).
- Always indicate the user's current location in the nav (answer "where am I?").
- Provide local navigation for closely related content so users aren't forced back up the hierarchy repeatedly.
- Use clear, familiar wording for labels; left-justify vertical menu text and front-load the key term for scanning.
- Make nav targets big enough to click/tap reliably, and mark expandable items with a caret/arrow so they're distinguishable from direct links.
- Use click-activated, not hover-only, submenus so the pattern works across input types.
- Avoid deep cascading multilevel menus; use a mega menu or landing page instead.
- Avoid novel/gimmicky navigation patterns; familiarity beats cleverness.

**Top 3 IA Questions about Navigation Menus**
Source: https://www.nngroup.com/articles/ia-questions-navigation-menus/

- The right number of nav categories is set by content scope and discoverability, not an arbitrary number; there is no rule that menus must be limited to seven items (that's a myth extrapolated from working-memory research).
- Don't default to alphabetical ordering; order by frequency of use so the most-needed items aren't buried, and reserve alphabetization for cases like large lists of proper-noun brand names or genuinely long (20+) lists.
- Provide a tap-friendly fallback for any hover-dependent interaction rather than eliminating hover menus for desktop users entirely.

**Designing Empty States in Complex Applications: 3 Guidelines**
Source: https://www.nngroup.com/articles/empty-state-interface-design/

- Communicate system status honestly in an empty state: distinguish "still loading" from "genuinely no results" from "an error occurred." Never show a bare "no records" message that could actually mean the data hasn't loaded yet.
- Use the empty state to teach: explain what would appear here and how the user can populate it, rather than leaving a silent blank area.
- Give the user a direct path to the relevant task (a "Create" button, a "Learn more" link) rather than only describing what could be done.
- A blank container is not neutral: it reduces user confidence, hides discoverability, and slows task completion.

## 3. Laws of UX (lawsofux.com)

Source: https://lawsofux.com/ (full list fetched; descriptions below are theirs, condensed)

Laws with clear, direct application to dashboards and navigation are marked; the rest are general-purpose UX psychology.

- **Jakob's Law**: users prefer your product to work like the other products they already know. [Navigation] Follow conventional nav placement (top or left) rather than inventing a new pattern.
- **Fitts's Law**: the time to acquire a target is a function of its distance and size. [Navigation] Keep primary nav targets large and close to where users already are; don't shrink click targets to save space.
- **Hick's Law**: decision time increases with the number and complexity of choices. [Navigation, dashboards] Keep top-level nav and KPI counts limited to what's actually needed; large flat menus and dashboards with everything visible at once slow decisions.
- **Miller's Law**: the average person holds about 7 (plus or minus 2) items in working memory. [Dashboards] Group related metrics into chunks rather than presenting a long undifferentiated list (note: NN/g explicitly warns this is often over-applied to "menus must have 7 items," see section 2).
- **Law of Proximity / Law of Common Region / Law of Uniform Connectedness / Law of Similarity / Law of Prägnanz** (the Gestalt grouping laws): elements that are near each other, share a boundary, are visually connected, look alike, or can be read as a simple shape are perceived as a group. [Dashboards] Use spacing and shared containers, not just color, to show which numbers/charts belong together.
- **Aesthetic-Usability Effect**: users perceive aesthetically pleasing design as more usable, which can mask real usability problems (and can also buy goodwill for minor friction). Applies broadly, including dashboards.
- **Von Restorff Effect** (the "isolation effect"): an item that stands out from similar items is best remembered. [Dashboards] The one number that matters most should look visually different from the rest, not just "first."
- **Serial Position Effect**: users best remember the first and last items in a list. [Navigation] Put the most important nav items at the start (and, secondarily, end) of a menu, not buried in the middle.
- **Doherty Threshold**: productivity/engagement rises when system response stays under about 400ms. [Dashboards] Slow-loading widgets need their own feedback (skeletons/spinners) to avoid feeling broken.
- **Goal-Gradient Effect**: motivation to complete a task increases as the perceived distance to the goal shrinks. Relevant to onboarding checklists and progress indicators in app shells.
- **Zeigarnik Effect**: people remember interrupted/incomplete tasks better than completed ones. Relevant to "continue where you left off" and incomplete-setup nudges.
- **Tesler's Law (Law of Conservation of Complexity)**: every system has some irreducible complexity, which must be handled either by the system or pushed onto the user. [Dashboards] Complex filtering/config UIs are a case where the app, not the user, should absorb complexity via sensible defaults.
- **Occam's Razor / Postel's Law / Peak-End Rule / Choice Overload / Cognitive Load / Cognitive Bias / Flow / Mental Model / Chunking / Selective Attention / Working Memory / Pareto Principle / Parkinson's Law / Paradox of the Active User**: general psychology laws, all with plausible UI application but no dashboard/nav-specific guidance given on the source page itself.

## 4. Refactoring UI (Wathan and Schoger)

Source: the ideas in "Refactoring UI" by Adam Wathan and Steve Schoger (refactoringui.com). The book is paid and has no official free full text; none of its text is reproduced here. The points below are the ideas from the book that fed rule candidates, restated in our own words at the level of concept, gathered from secondary coverage of the book rather than the original text. For the authors' actual treatment, buy the book.

- Not every element deserves equal visual weight; most screens have one true primary action, a couple of secondary actions, and a few rarely used tertiary ones, and the design should communicate that ranking.
- Create hierarchy by de-emphasizing competing elements (lower contrast, muted color) rather than making the primary element ever bigger; hierarchy is often better solved by turning things down than turning things up.
- Don't rely on font size alone to create hierarchy; weight and color carry a lot of the signal too.
- To de-emphasize secondary text, make it a softer color rather than shrinking it to the point of illegibility.
- Use two to three text colors: dark for primary content, gray for secondary, lighter gray for tertiary; don't go below roughly 400 font-weight, lean on color and size instead.
- Build a non-linear spacing scale (small steps cluster tightly at the low end, e.g. 4/8/12px; larger steps spread out, e.g. 24/32/48px) instead of one linear unit.
- Space between groups of related elements should be visibly greater than the space within a group, so grouping reads clearly without needing borders.
- Define a hand-picked (non-linear) type scale rather than a purely mathematical one, and keep paragraph measure to roughly 45-75 characters for readability.

## 5. Dashboard-specific literature (Stephen Few and modern takes)

**Stephen Few, "Information Dashboard Design"**
Primary source (PDF) at https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf could not be parsed as text by the fetch tool (binary/compressed PDF stream); the list below is drawn from a third-party summary of the same "13 mistakes" content. Source: https://medium.com/@antonioneto_17307/thirteen-common-mistakes-in-dashboard-design-cc1a0dc07750 (secondary summary; treat wording as paraphrase of Few's original, not verbatim).

- Guiding principle: simplicity. Display data as clearly and plainly as possible; avoid distracting decoration.
- Exceeding a single screen: a dashboard that needs scrolling or extra navigation to see critical information at a glance has failed the format's core purpose.
- Supplying data without context: raw numbers without a benchmark, target, or historical comparison are hard to interpret.
- Displaying excessive detail or precision: more decimal places or granularity than the decision requires adds noise, not value.
- Choosing deficient or indirect measures that don't actually represent the thing the user needs to know.
- Choosing display media (chart/table type) that doesn't fit the data or the device it will be viewed on.
- Introducing meaningless variety: switching chart types without a communicative reason confuses rather than helps.
- Poorly formatted graphs/tables invite misreading.
- Inaccurate or inconsistent encoding (e.g., color that doesn't map consistently to meaning) misleads users.
- Arranging data in an order that doesn't match the user's actual analytical workflow.
- Failing to highlight what's important: use contrast, color, or size deliberately to draw the eye to what matters.
- Cluttering the display with decoration that doesn't carry information.
- Overusing color, or using it inconsistently; keep the working palette small (roughly 6 colors was the figure cited) and purposeful.
- An unattractive display, even with correct data, undermines trust and engagement; aesthetics and function aren't opposed.

**Modern takes: dashboards as answers, KPI hierarchy, progressive disclosure**
These points are drawn from an aggregated WebSearch summary across several dashboard-design blogs (UXPin, DataCamp, uxpilot.ai, aufaitux, and similar practitioner sources); no single primary source, so treat as convergent industry consensus rather than one citable authority. Representative source: https://www.uxpin.com/studio/blog/dashboard-design-principles/

- Before laying out a dashboard, write down the specific plain-language questions it must answer (e.g., "are sign-ups on pace for Q3?"); design each section as the answer to one such question.
- Phrase card/section titles as answers or claims ("Weekly sign-ups vs. target"), not neutral labels ("Sign-ups").
- Use a three-tier hierarchy: summary (3-5 headline KPIs that need immediate attention) at top, context (trend over time) in the middle, and detail (tables, drill-downs) at the bottom.
- Keep the number of headline KPIs on one view in roughly the 5-7 range, consistent with working-memory limits (see Miller's Law above); anything beyond that belongs behind a drill-down, filter, or secondary view, not on the primary screen.
- Progressive disclosure is the mechanism for reconciling "show what matters at a glance" with "let power users go deep": start with the summary, let users opt into detail rather than defaulting to maximum density.

**Chart selection driven by the question, not the data's shape**
Source: aggregated from multiple data-visualization guides surfaced via WebSearch (e.g., Datawrapper's chart-type guide, GoodData.AI, Flourish); representative source: https://www.datawrapper.de/blog/chart-types-guide

- Decide what you're trying to communicate (change over time, ranking, correlation, part-to-whole, distribution) before picking a chart type; the chart choice should follow the communicative goal, not just "what shape is this table."
- A dashboard that is an "exhibition of charts" (charts chosen because a chart library offered them, not because they answer a question) is a recognizable anti-pattern to avoid.

## 6. Navigation / information architecture

Combines NN/g sources already cited above plus general IA framing.

- Nav model choice should follow content volume and structure, not preference: horizontal top nav suits roughly 5-7 main sections; left sidebar/vertical nav suits broad, growing, or deep IAs (7+ top-level items), and is the conventional choice for dashboards and enterprise apps. Source: https://www.nngroup.com/articles/vertical-nav/
- There is no fixed "magic number" of nav items; the right count is set by what the product actually offers, not a memory-derived rule of thumb like 7. Source: https://www.nngroup.com/articles/ia-questions-navigation-menus/
- Always show the user's current location within navigation (breadcrumbs, active-state highlighting); this is one of the 17 menu-design guidelines and also a direct application of heuristic #1 (visibility of system status). Source: https://www.nngroup.com/articles/menu-design/
- Keep navigation structurally identical across every screen of an app; the position, order, and active-state behavior of nav should not shift page to page. This follows directly from heuristic #4 (consistency and standards): https://www.nngroup.com/articles/ten-usability-heuristics/
- Don't hide primary navigation behind a hamburger icon on desktop/larger screens; screen space is available, so show the categories. Source: https://www.nngroup.com/articles/menu-design/
- Order nav items by frequency of use, not alphabetically, except for large (20+) lists of proper nouns users already know by name. Source: https://www.nngroup.com/articles/ia-questions-navigation-menus/
- Provide local/contextual navigation for closely related pages so users don't have to keep returning to a top-level menu to move sideways. Source: https://www.nngroup.com/articles/menu-design/
- Left-side placement benefits from real reading behavior: NN/g eye-tracking found roughly 80 percent of fixations land on the left half of the screen. Source: https://www.nngroup.com/articles/vertical-nav/

## Sources I could not verify

- A statistic attributed to "a 2025 Nielsen Norman Group analysis of 50 AI-generated dashboards" (92 percent missing empty states, 78 percent missing error states, 100 percent using a generic spinner) circulates on at least one third-party blog (blog.vibecoder.me) and is echoed in search-engine AI summaries, but I could not find this study on nngroup.com itself, nor any other primary citation for it. The blog post that states it provides no source link. I am treating this figure as unverified and possibly fabricated, and have not used it as a cited NN/g finding above.
- Kole Jain's content: I could not fetch YouTube video pages or captions directly (YouTube serves a non-content shell to the fetch tool, and a third-party transcript site returned 403). All Kole Jain material above is sourced to sozai.app's AI-generated transcript-and-summary pages for specific named videos, not to Kole Jain's own written words or to YouTube directly. Update 2026-07-20: a human review of the videos confirmed the four phrases now shown in quotation marks ("Never let an AI choose any of your colors", "Never let an AI choose your layout either", "Less visual noise equals a better design", "the spine of the product"). The room-and-house framing could not be located and remains unverified paraphrase, and the video ID originally listed for "Stop Making Pretty UIs" actually belonged to "How to think like a GENIUS UI/UX designer" and has been corrected. The rest of the summaries remain unverified paraphrase.
- Stephen Few's "13 mistakes" list: the primary source PDF (perceptualedge.com whitepaper) could not be parsed as readable text by the fetch tool; the list above comes from a third-party (Medium) summary of the same material, not Few's original wording.
- Refactoring UI: no official free full text exists; the points above are concept-level paraphrase gathered from secondary coverage of the book, not verified against the book's own text.

## Top 20 principles by impact for agent-generated UIs

1. Never let generated color or layout choices go unreviewed; AI-picked palettes and layouts trend toward oversaturated colors and repeated/generic KPI blocks. (Kole Jain, sozai.app/transcript/saas-ui-ux-mistakes-vibe-code/)
2. Design and implement empty, loading, and error states for every data view; a blank or perpetually-spinning container is a common, damaging default. (NN/G, nngroup.com/articles/empty-state-interface-design/)
3. Show the single most important number or chart with clearly greater visual weight than everything else on the screen; don't give every metric equal size and color. (Refactoring UI, paraphrase; Von Restorff Effect, lawsofux.com)
4. Pick chart type by the question being answered (trend, ranking, correlation, part-to-whole), not by whatever shape the data happens to be in. (Datawrapper chart guide; NN/G preattentive processing, nngroup.com/articles/dashboards-preattentive/)
5. Use length and 2D position (bar/line/scatter) for quantitative comparison; avoid pie charts, gauges, and 3D charts for that purpose. (NN/G, nngroup.com/articles/dashboards-preattentive/)
6. Keep navigation structurally identical across every page: same position, same order, same active-state logic. (NN/G heuristic #4, nngroup.com/articles/ten-usability-heuristics/)
7. Choose sidebar (vertical) navigation over top nav once there are more than about 5-7 sections, especially for dashboard/enterprise apps. (NN/G, nngroup.com/articles/vertical-nav/)
8. Don't invent a nav item count from a "7 items" rule; size the menu to the product's actual structure, and order items by frequency of use. (NN/G, nngroup.com/articles/ia-questions-navigation-menus/)
9. Limit headline KPIs on one view to roughly 5-7 and push everything else behind a drill-down or filter (progressive disclosure). (Aggregated dashboard-design consensus, uxpin.com/studio/blog/dashboard-design-principles/; Miller's Law, lawsofux.com)
10. Give every data point context (a target, benchmark, or trend), not an isolated number. (Stephen Few, via medium.com/@antonioneto_17307/thirteen-common-mistakes-in-dashboard-design-cc1a0dc07750)
11. Use progressive disclosure for secondary actions and settings; don't surface every action at once. (Kole Jain, sozai.app/transcript/dashboard-ui-flaws-never-built-one/; NN/G complex-apps heuristics, nngroup.com/articles/usability-heuristics-complex-applications/)
12. Always show the user's current location in navigation (active states, breadcrumbs). (NN/G, nngroup.com/articles/menu-design/)
13. Give visible feedback for every user action (button states, spinners, confirmations, toasts); silent state transitions read as broken. (Kole Jain, sozai.app/transcript/ui-ux-mistakes-beginner/; NN/G heuristic #1, nngroup.com/articles/ten-usability-heuristics/)
14. Design real states, not just the happy path: empty, loading, error, and success must all be considered up front. (Kole Jain, sozai.app/transcript/stop-making-pretty-uis-think-product-designer/)
15. Group related elements with spacing and shared containers (proximity, common region), and make inter-group spacing clearly larger than intra-group spacing. (Refactoring UI, paraphrase; Laws of UX Gestalt laws, lawsofux.com)
16. Add tooltips or labels for any icon or abbreviation whose meaning isn't obvious. (Kole Jain, sozai.app/transcript/dashboard-ui-flaws-never-built-one/; NN/G heuristic #6, nngroup.com/articles/ten-usability-heuristics/)
17. Keep a small, consistent, purposeful color palette (roughly 6 working colors), with color reinforcing category or semantic meaning, never the sole carrier of meaning. (Stephen Few; NN/G, nngroup.com/articles/dashboards-preattentive/)
18. Standardize component styling (one corner radius, one button scale, one icon set) across the whole app rather than per-screen improvisation. (Kole Jain, sozai.app/transcript/ui-ux-mistakes-beginner/)
19. Prevent errors with real-time previews and confirmations for risky actions, rather than relying only on good error messages after the fact. (NN/G heuristic #5, nngroup.com/articles/ten-usability-heuristics/)
20. Every extra unit of information on screen competes with the important ones; strip anything irrelevant or rarely needed rather than adding "just in case." (NN/G heuristic #8, nngroup.com/articles/ten-usability-heuristics/)

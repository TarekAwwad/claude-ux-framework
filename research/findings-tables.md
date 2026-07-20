# Findings: data tables and data grids

Date: 2026-07-20. Produced by a web-research subagent; sources cited inline.

## 1. Nielsen Norman Group

### Data Tables: Four Major User Tasks
Source: https://www.nngroup.com/articles/data-tables/

- Tables need to support four jobs: finding rows that match some criteria, comparing values across rows or columns, viewing or editing a single row's data, and taking action on rows. The article is scoped to workplace/enterprise data tables, not ecommerce comparison tables, and mostly addresses desktop.
- Column order should reflect how important the data is to the people using it, and related columns should sit next to each other so comparing them doesn't require much eye movement. Use a human-readable identifier (not a raw generated ID) as the first, anchoring column.
- Let people hide and reorder columns cheaply, with clear visual indicators of which columns are currently hidden; a menu-driven reorder interface is more discoverable than dragging column headers directly.
- Filters "need to be discoverable, quick, and powerful," with a clear signal to the user when a filter is currently applied. Offer a one-click "select all" where it makes sense.
- People will reach for whichever way of finding data costs them the least effort, so support several: filtering, sorting, an in-page search box, and the browser's own find-in-page (Ctrl-F).
- "Freeze header rows and header columns (if the table is larger than the screen)" (quoted). Give frozen rows/columns a subtle drop shadow so they read as floating above the scrolling content underneath.
- Borders, zebra striping, and hover-triggered row highlighting all help people keep their place as their eyes move across a wide table.
- Keep inline row actions to one or two; more than that either crowds the row or has to move into a hidden menu, which hurts discoverability. Avoid icon-only actions with no text label.
- For bulk actions, use row checkboxes plus an action bar above or below the table (so it doesn't take permanent space), with a "select all" shortcut for full-dataset operations.
- For viewing or editing a single record, a non-modal side panel is preferred because it keeps the table visible for reference. Edit-in-place only works for narrow tables and needs a clear visual cue that a row is in edit mode. Avoid modals (they hide the neighboring rows people are comparing against) and avoid accordions (people rarely close them again once opened, and they block access to rows further down the list).

### Mobile Tables: Comparisons and Other Data Tables
Source: https://www.nngroup.com/articles/mobile-tables/

- Get the table right on a large screen first, then adapt it down. Problems compound as the screen shrinks: "the smaller the screen, the more likely that we'll get into trouble."
- Keep columns wide enough to read without zooming. Dense, number-heavy tables can use narrower columns than text-heavy comparison tables; on the narrowest screens a comparison table may only fit two columns legibly. Abbreviations only work for an audience that already knows the shorthand.
- Lock the header row in place once a table runs taller than one screen, and lock the leftmost label column in place once horizontal scrolling is required, so column and row labels stay visible while the user scrolls.
- Signal that a table continues off-screen with a cut-off row/column or an arrow (this tested better than dots), and place that indicator in the data area itself, not at the top of the page.
- Avoid asking people to rotate to landscape to see more columns; only do it if the extra width is a clear win over the annoyance of rotating the device.
- Two ways to cut what's on screen: let people filter down to a single item before viewing it (works when they don't need to compare items against each other), or let them choose which rows/columns display so they can focus on what matters to them.
- Group related attributes into accordions so people can jump straight to the section they want instead of scrolling past everything else.
- The recurring failure mode across these mobile patterns is forcing people to hold values in memory while they scroll or switch views in order to compare them.

## 2. Pencil and Paper, enterprise data tables UX
Source: https://www.pencilandpaper.io/articles/ux-pattern-analysis-enterprise-data-tables

- Left-align text columns consistently; right-align numeric columns so digits line up by place value, and use a monospaced or tabular-numeral font so numbers of different magnitudes ($999.99 vs. $1,111.11) don't visually distort against each other. Match each header's alignment to its column's content to cut visual noise. Treat "numbers" that are really identifiers (dates, postal codes, phone numbers) as text and left-align them despite being digits.
- Cut redundant words between header and cell: a column headed "Lead" can show just "Qualified" or "Nurturing" in each row instead of repeating "Lead" every time.
- Use a thin, light-grey column divider rather than a heavy rule, to avoid visual clutter.
- Let people reorder, hide, resize (a drag handle appears on hover of the column separator), and reset columns from an options menu, and remember their choices across sessions.
- Small chevrons beside column headers show sort state without disturbing the alignment between header and column. Typical sort options are alphabetical, chronological, or numeric in either direction. Pick a default sort that matches what people probably want first (most recent, needs action, lowest stock, most urgent) rather than an arbitrary order.
- Search results should highlight the matched text within a row so people can visually confirm the match.
- Pagination is mentioned only in passing; the article explicitly defers the topic, saying "for a deeper dive in the world of pagination, we'll be writing another piece on just that." No pagination/infinite-scroll/virtualization guidance is given here.
- Keep the header fixed during vertical scroll, and put any rollup/summary values in that fixed row. Freeze the leftmost column during horizontal scroll (row labels) and the rightmost column when it holds totals. Once rows are selected, a bulk-action bar can behave like a sticky footer so context is preserved while acting on the selection.
- Show row checkboxes on hover rather than pinned open, so they read as an available action rather than clutter; described as "key poweruser functionality for people to move faster." Only show bulk-action controls once something is selected. Typical bulk actions: delete, export, duplicate.
- Signal an editable cell with a text cursor on hover. Let people confirm an edit by clicking away, pressing Enter, or via an explicit checkmark/Save control; inline editing is framed as the lowest-friction option because it keeps neighboring rows and columns in view. For higher-stakes edits, move the interaction to a slower surface instead (an expandable row, a modal, a side panel), adding friction on purpose. Clear success feedback after an edit matters and is easy to skip.
- Options for row detail, roughly in order of how much content they can hold: an expandable inline row (stays in the table, least disruptive), a hover tooltip (desktop only), a modal or overlay (easiest to build, most disruptive), a side panel/quick-view (scales to sub-tabs and more content), and a full-screen view (most immersive, for the densest cases).
- On row styling: zebra striping is common but stacks awkwardly once other row states (disabled, hover, selected) each add their own shade of grey; a plain 1px divider or a card-style row with spacing avoids that pile-up. Vertically center-align cell content when row height varies little (up to about three lines); switch to top alignment once rows run longer, so content doesn't clip. Typical row-height presets are roughly 40px (condensed), 48px (regular), and 56px (relaxed), with density switchable and remembered per user.
- Empty, loading, and error states are not detailed in this article; it points to a separate piece on feedback and error messaging instead.
- Mobile strategy is not covered in depth either; the article notes table viewing differs a lot between mobile and desktop and points to a separate piece on mobile filter patterns.
- Accessibility is barely addressed here: the article is focused on visual and interaction patterns, with no ARIA or screen-reader guidance.

## 3. IBM Carbon Design System, data table usage
Listed URL: https://carbondesignsystem.com/components/data-table/usage/

Fetch note: the live page is client-rendered, and two direct fetch attempts (with and without a trailing slash) returned an empty shell with no readable guidance text. The bullets below come from two pages that did fetch successfully and appear to carry the same guidance: the page's own markdown source at https://github.com/carbon-design-system/carbon-website/blob/main/src/pages/components/data-table/usage.mdx, and the older static-rendered mirror at https://v10.carbondesignsystem.com/components/data-table/usage/. The two agreed on every point below, which is why I'm treating the content as reliable despite not reading the current live page directly.

- Keep column titles to one or two words describing the column's data, in sentence case. For a title that's too long, wrap it to two lines and then truncate what's left, showing the full text in a hover tooltip. Size the header row to match the body row height.
- Columns sort ascending or descending from the header; only the currently sorted column shows an arrow icon by default, and unsorted columns show their arrow only on hover.
- Search comes in two variants: a collapsed search opened via an icon button (appears below the table title), or an open search field that sits to the left of the title and stretches to meet other actions on the right.
- The toolbar is the place for global table actions (settings, complex filters, export, bulk edit); it comfortably holds up to five actions before the rest need to move into an overflow menu or combo button.
- Pagination splits data into pages with previous/next controls, always placed below the table; an advanced variant adds a page-size control and jump-to-page.
- Sticky headers are not explicitly covered in the guidance text reviewed; treating this as a documentation gap rather than an implied "no."
- Row selection defaults to multi-select checkboxes, or single-select radio buttons paired with a toolbar primary action; the header checkbox has a third, indeterminate state.
- Selecting rows opens a batch-action bar at the top of the table, described as a bar that "presents a set of possible actions to apply to all select[ed] items." Canceling or deselecting everything closes it, and single-row actions plus overflow menus are disabled while it's open.
- Inline editing is not explicitly documented in the usage guidance reviewed; another gap worth flagging rather than papering over.
- The expandable-row variant "helps present large amounts of data in a small space." Expanded content can hold supplementary or lazy-loaded information; an optional "expand all" control exists but isn't shown by default. When row selection and expansion are combined, the expand icon sits to the left of the checkbox.
- If a row has two or fewer actions, show them inline as icon buttons instead of hiding them behind an overflow menu: "this approach reduces a click and makes available actions visible at a glance." Overflow menus stay open by default on touch devices regardless of the hover setting.
- Prefer a skeleton loading state over a spinner whenever the load is expected to take a noticeable amount of time.
- Keep the row hover state on at all times, even on non-interactive tables, because it helps people track their place across a row.
- There are five row-height options (extra small through extra large); a tall toolbar pairs with the taller row heights and a small toolbar with the shorter ones. Reserve the tallest row height for content that genuinely needs two lines.
- Give the table generous space in the page's main content area; avoid nesting it inside another table or a cramped container.

## 4. Shopify Polaris, index table
Listed URL: https://polaris.shopify.com/components/tables/index-table (redirects, 301, to https://polaris-react.shopify.com/components/tables/index-table, which is the page actually fetched)

- Numeric cells and column titles are right-aligned using the Text component's numeric style.
- Per-column sorting is enabled via a boolean array; default sort direction is descending but configurable, with optional accessible sort-toggle labels. Guidance is to support sorting "if the list can be long, and especially if different merchant tasks benefit from different sort orders."
- Guidance is to "support filtering if the list can be long," pairing the table with the separate Filters or IndexFilters components rather than building filtering into the table itself.
- Explicit pagination threshold: "paginate when the current list contains more than 50 items." A separate hasMoreItems flag supports a load-more/infinite-scroll variant instead of page controls.
- A lastColumnSticky prop keeps the rightmost column pinned during horizontal scroll; a sticky scrollbar is also supported.
- Selection is multi-select checkboxes with an indeterminate state and shift-click range selection, plus dedicated copy for a "select all across pages" flow.
- Bulk actions split into promoted (always visible) and secondary (in a menu) actions, following a "verb + noun" naming convention. Below a 490px viewport width, the condensed prop can hide bulk actions entirely, with an explicit warning attached: "hiding bulk actions means a merchant can't select multiple items at once, so it should only be used when the bulk actions are not essential to the merchant's workflow."
- Row detail/expansion is handled through subheader rows (grouping, with scope="colgroup" on the subheader cell) and child rows (rendered indented under a parent), with a selectionRange prop to select a whole group at once.
- An emptyState prop covers the no-data case; a loading flag shows a skeleton, and the guidance is to pair it with the page-level skeleton component on first page load.
- The condensed prop (dropping bulk actions below 490px) is the specific mobile/narrow-viewport adaptation documented.
- Accessibility: header cells carry scope, a headers prop associates data cells with the correct column header, keyboard support includes Space to select a row and Shift+Space to select a range, and each row's accessible label defaults to "Select {resourceName}" (customizable).
- The table is framed as serving two roles at once: "a content format, presenting a set of individual resources with multiple columns," and a way of taking action on one or more of those resources; clicking a row is expected to navigate to that resource's detail page.

## 5. Salesforce Lightning Design System, data tables

Fetch note: I could not retrieve design-guideline prose from the marketing/blueprint site. Every URL tried under lightningdesignsystem.com returned only a client-rendered shell with no guidance text: the current site (https://www.lightningdesignsystem.com/components/data-tables/), the v1 archive (https://v1.lightningdesignsystem.com/components/data-tables/), and the react subdomain (https://react.lightningdesignsystem.com/components/data-tables/, which itself 301-redirects to the design-system-react GitHub repo rather than a guidance page). A guessed versioned-archive subdomain (archive-2_6_1.lightningdesignsystem.com) didn't resolve in DNS at all. What follows instead comes from a page I did fetch successfully:

Source: https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/lightning-datatable.html (the Lightning Web Components reference for the lightning-datatable component, i.e. the implementation of the same data-table pattern, documented at a more procedural level than a design-guideline page)

- Default alignment is right for number-like types (currency, percent) and left for everything else, overridable per cell via a cellAttributes alignment setting.
- Text is clipped to the column width by default; clipping also collapses newlines and runs of whitespace to a single space. An optional wrapText mode expands the row instead, with a wrap-text-max-lines cap that falls back to an ellipsis once exceeded.
- Sortable is set per column; clicking a header toggles ascending/descending and fires an onsort event carrying the field and direction, but the component does not sort the data itself, the host app is expected to re-sort its own array in response.
- There's no built-in filter or search. The only header-level built-ins are per-column "Wrap text" / "Clip text" toggles (removable via hideDefaultActions), so filtering and search have to be built by the consuming app.
- No page-by-page pagination control exists. The only built-in "more data" strategy is infinite scroll: enable-infinite-loading plus an onloadmore event with a default 20px-from-bottom trigger offset, and a totalNumberOfRows count so the component knows when to stop requesting more. This requires the table to sit inside a container with an explicit height.
- Sticky headers only happen if the table is nested in a height-constrained container; the header then stays fixed while rows scroll under it, and the scrollToTop() method only works in that configuration.
- A checkbox selection column shows by default (hideable); max-row-selection="1" switches it to radio-button single-select. Rows can be pre-selected or locked via selected-rows/disabled-rows. There's no dedicated bulk-action-bar primitive; an app builds bulk actions itself from the set exposed by the onrowselection event.
- Inline editing: setting editable on a column shows a pencil icon on hover; Enter or a click opens the cell, and moving away (or Enter/Tab) surfaces row-level Save/Cancel controls. Edited values arrive as event.detail.draftValues on save. Errors can be attached per row and per field: a red cell border, an error icon in the row-number column with a tooltip on click, and a table-level error region near the Save/Cancel buttons. Date and location fields don't support inline editing at all.
- Row detail/expansion is not supported; the component has no built-in expand or detail-row feature.
- isLoading shows a spinner (intended for the infinite-load case). There's no built-in empty-state message, that has to be built outside the component. Validation errors surface inline plus via the row-number error icon described above.
- Mobile is explicitly out of scope: "lightning-datatable isn't supported on mobile devices," with no touch gestures or responsive column behavior documented.
- Accessibility/keyboard: the table renders with an ARIA grid role. A navigation mode lets Tab focus the first data cell and arrow keys move the active cell (tabbing away and back returns to the last focused cell); a separate action mode, entered with Enter or Space, tabs between actionable elements inside a cell and exits on Escape. Column resizing has its own keyboard path once in action mode. A polite live region announces the mode switch.

## 6. ag-Grid docs: DOM virtualisation, pagination, and accessibility

### DOM Virtualisation
Source: https://www.ag-grid.com/javascript-data-grid/dom-virtualisation/

- Only the rows and columns inside the visible viewport are actually rendered as DOM nodes; the grid adds and removes nodes as the user scrolls, so loading 1,000 rows and 20 columns but only ever showing 50 rows and 10 columns means only those 50x10 cells exist in the DOM at once.
- Row buffer defaults to 10 rows rendered above and 10 below the visible area (rowBuffer, default 10), purely so a fast scroll on a slow machine doesn't flash blank space. Setting rowBuffer=0 removes the buffer but leaves virtualization itself on.
- A safety cap renders at most 500 rows at once by default, specifically to stop a misconfigured app from crashing the page; suppressMaxRenderedRowRestriction lifts that cap.
- Column virtualization has no equivalent buffer: "no column buffer, no additional columns are rendered apart from the visible set" (quoted), because keeping up with horizontal scroll is cheaper than vertical.
- suppressRowVirtualisation and suppressColumnVirtualisation turn each off independently. Turning virtualization off means value formatters run continuously during scroll instead of once at initial render.

### Row Pagination
Source: https://www.ag-grid.com/javascript-data-grid/row-pagination/

- Pagination is off by default. Turning it on (pagination=true) defaults to 100 rows per page with a page-size picker offering 20, 50, or 100.
- paginationAutoPageSize fits the page size to however many rows the viewport can actually show; the docs frame this as the right call for touch devices where "UX requirements state no scrolls should be visible."
- For grouped/tree data there are two modes: by default each page holds a fixed number of top-level groups regardless of how many child rows that pulls in; paginateChildRows=true instead caps the literal row count per page, recommended when a page must never exceed its stated size.
- Pagination is explicitly positioned as one option among several row models, distinct from the infinite and viewport row models, which stream data in rather than paging it.

### Accessibility
Source: https://www.ag-grid.com/javascript-data-grid/accessibility/

- Uses ARIA role="grid" for flat or master-detail data, and role="treegrid" for tree or grouped data; role="rowgroup" wraps header and body rows; row, columnheader, and gridcell roles carry aria-rowindex, aria-colindex, aria-sort, aria-expanded, and aria-selected as relevant, plus grid-level aria-rowcount, aria-colcount, and aria-multiselectable.
- Screen readers routinely fail to re-announce a change (a new sort order, an updated label) on the element that already has focus; the documented workaround is to move focus away and back.
- ensureDomOrder keeps the DOM order matching the visual order, which matters because a mismatch confuses screen-reader announcements. Grouped or spanned column headers are called out as a case where some screen readers announce the wrong column name regardless of this setting.
- The docs recommend testing directly against whichever screen reader your users actually use, since interpretation of the ARIA spec varies across them.

## 7. TanStack Table / TanStack Virtual, virtualization docs
Sources: https://tanstack.com/table/v8/docs/guide/virtualization and https://tanstack.com/virtual/latest/docs/introduction (also checked against the underlying markdown source on GitHub for each, which matched)

- TanStack Table ships no virtualization of its own: "TanStack Table packages do not come with any virtualization APIs or features built-in." Its guide hands the job to an external library, naming react-window and TanStack Table's sibling project TanStack Virtual as the two supported pairings, with example recipes for virtualized columns and for both fixed- and dynamic-height virtualized rows.
- TanStack Virtual is a headless utility, it "does not ship with or render any markup or styles," leaving styling and markup entirely to the developer. It supports vertical, horizontal, and combined grid-style virtualization by combining axis configurations, and works by estimating item size (estimateSize), tracking a total count, and positioning only the currently visible items with a transform.
- TanStack Virtual's own docs point to a separate "Chat guide" for reverse-scrolling feeds such as chat, AI streams, and logs, treating that as a distinct pattern from a plain virtualized list.
- Neither doc states a concrete row-count threshold for when to switch to virtualization, in contrast to ag-Grid, which gives specific numbers (a 10-row buffer, a 500-row render cap). This is a real gap in the TanStack docs rather than something I could paraphrase around.

## 8. Smashing Magazine, "Table Design Patterns On The Web"
Source: https://www.smashingmagazine.com/2019/01/table-design-patterns-web/ (Chen Hui Jing, 2019)

- Skip a responsive rework entirely when a table has few columns and lots of rows and doesn't need sorting or pagination; plain CSS is enough in that case, since "features like pagination and sorting are not necessary."
- "Do nothing": works when values are short (numbers, short phrases). Cap the table with max-width so it doesn't stretch absurdly wide on a large screen, while still letting it shrink freely on a small one.
- "Style the scroll": scroll the table horizontally and signal that there's more content with a background-image gradient trick (using background-attachment: local) that fades at the scrollable edge. A variant flips headers from the top row into a left-hand column using flexbox, so headers stay in view without scrolling ("headers always in view").
- "Rows to blocks": at narrow widths, restack the table as blocks via a media query. Visually hide the real header cells while keeping them in the accessibility tree, and re-label each value using a data attribute plus a pseudo-element, laying out label next to value with flex auto-margins or CSS grid.
- "Column toggle": hide non-essential columns below a breakpoint but give people a menu to bring any of them back, framed as a way to hide content without users losing access to it.
- Tablesaw (Filament Group's table plugin suite) implements column toggle plus sorting, row selection, and internationalization, and by the time of the article no longer depends on jQuery.
- Whichever technique is chosen, don't let it compromise accessibility as a side effect. The article calls out display: contents by name as "currently has issues with accessibility" and not production-ready, and notes that CSS display changes generally need a small amount of matching DOM manipulation to keep the accessibility tree correct.

## 9. Adrian Roselli, responsive accessible tables

Fetch note: the original article, https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html, returned HTTP 403 Forbidden on every attempt: two direct fetches, and one attempt through a public text-proxy service that relayed the same 403. This looks like bot-blocking rather than the page being gone, but I could not read Roselli's own wording at all.

What follows instead comes from a secondary source I did fetch successfully: https://css-tricks.com/under-engineered-responsive-tables/, a short post by Chris Coyier that summarizes and links to Roselli's article. It is explicitly a summary and link-post, not a full republish, so treat everything below as secondhand paraphrase of Roselli's ideas rather than his own words, except where CSS-Tricks itself puts something in quotation marks (noted below).

- Core technique: wrap the table in a `<div>` with `overflow: auto` so it scrolls horizontally without breaking the surrounding page layout, instead of reflowing the table's contents into another shape.
- Recommended attributes on that wrapper div: `role="region"`, `aria-labelledby` pointing at an id placed on the table's `<caption>`, and `tabindex="0"` so keyboard users can actually scroll it. A visible focus style on the wrapper is called out as necessary, since it's now an interactive, focusable region in its own right.
- Per the CSS-Tricks summary, this is framed as "the safest way of handling responsive tables when you have no idea what content the table contains" (quoted from the CSS-Tricks post), better suited to tables people cross-reference, as opposed to a rows-to-blocks approach that only works when each row makes sense read in isolation.
- The CSS-Tricks summary mentions that Roselli tested this approach with users and that it performed better than a version that reflowed the content, but it doesn't carry over any detail on method or results. I can't state Roselli's actual testing findings first-hand or reliably secondhand here; flagging this as a real gap rather than guessing at numbers or methodology.

## Sources I could not fetch directly, or could only partially fetch

- Adrian Roselli's original article (adrianroselli.com) blocked every fetch attempt with a 403; findings for that source rest entirely on a secondary summary (CSS-Tricks), as detailed in section 9.
- IBM Carbon Design System's live usage page (carbondesignsystem.com) returned a client-rendered shell with no readable text on two attempts; findings for that source come from the page's own markdown source on GitHub plus an older static mirror, as detailed in section 3.
- Salesforce Lightning Design System's guideline site (lightningdesignsystem.com, in three different versions/subdomains) returned client-rendered shells with no readable guidance text, and one guessed archive subdomain didn't resolve at all; findings for that source come from Salesforce's developer-reference documentation for the concrete lightning-datatable component instead, as detailed in section 5.

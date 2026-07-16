# UX audit checklist

Used two ways: as the self-audit before declaring build work done, and as
the scoring rubric in audit mode. Each check is a yes/no question. "View"
means each independently loading region.

Severity: BLOCKER (user cannot complete a top task), MAJOR (user completes
it with friction or confusion), MINOR (polish).

## How to run an audit

1. Inventory screens and flows (routes/pages; or ask the user for the top 3
   tasks and walk those).
2. Prefer looking at the rendered UI: run the app, screenshot key screens
   and states. Fall back to reading templates/components when you cannot run
   it.
3. Answer every applicable check. Not-applicable is a valid answer; silence
   is not.
4. Report using the format at the bottom.

## Checks: hierarchy and focus

- C5 (MAJOR): Does each screen have exactly one visually dominant primary action?
- C6 (MAJOR): Is there a single clear visual hierarchy, with the most important element visibly distinct in size, weight, or color?
- C11 (MAJOR): Does the UI read as purpose-built for the user and task rather than a generic template?
- C13 (MINOR): Is inter-group spacing visibly larger than intra-group spacing?
- C14 (MINOR): Is text limited to two or three colors with legible weight (no sub-400 body, no illegible gray)?
- C15 (MINOR): Are decorative effects (shadows, gradients, glows, `transition: all`) kept subtle or absent?
- C16 (MINOR): Is paragraph or text-column width constrained to roughly 45 to 75 characters?

## Checks: states

- C1 (BLOCKER): Does every data-backed view implement empty, loading, error, and partial-data states, not just the populated view?
- C2 (BLOCKER): Does every user action produce visible feedback (pending or disabled state, spinner, toast, or confirmation)?
- C3 (BLOCKER): Are destructive actions guarded by an undo, cancel, or confirmation step?
- C4 (BLOCKER): Is every state or category reinforced by text, icon, or shape rather than conveyed by color alone?
- C10 (MAJOR): Do interactive elements have a visible keyboard focus state?

## Checks: navigation and consistency

- C7 (MAJOR): Do UI icons come from a real icon set rather than emojis?
- C8 (MAJOR): Does every icon-only control have a text label or tooltip?
- C9 (MAJOR): Is the palette small, with semantic hues (e.g. red for destructive) used consistently?
- C12 (MINOR): Are spacing and radius values drawn from a defined scale or tokens rather than arbitrary one-off values?
- C25 (MAJOR): Is navigation structurally identical across screens (same position, order, active-state logic)?
- C26 (MAJOR): Does the nav always indicate the user's current location (active state or breadcrumbs)?
- C27 (MAJOR): Does the nav model fit the IA (sidebar for 7+ sections or enterprise, no desktop hamburger, text labels not icon-only)?
- C28 (MINOR): Are nav items ordered by frequency of use and sized to the product's actual structure, not alphabetized or padded?

## Checks: dashboards (apply only to data-heavy screens)

- C17 (MAJOR): Is the dashboard free of duplicated or generic filler KPI tiles?
- C18 (MAJOR): Are headline KPIs on the primary view limited to roughly 5 to 7, with the rest behind drill-downs?
- C19 (MAJOR): Does every metric carry context (target, benchmark, delta, or trend)?
- C20 (MAJOR): Is chart type matched to the question, avoiding pie, donut, gauge, or 3D for quantitative comparison?
- C21 (MAJOR): Does every data table provide search, filter, and sort?
- C22 (MAJOR): Is the critical dashboard content visible on one screen without scrolling?
- C23 (MINOR): Are numeric table columns right-aligned and categorical fields shown as chips?
- C24 (MINOR): Is each card titled as the insight it answers rather than a bare field label?

## Report format

For each failed check:

    <C-id> <severity> | <screen/view> | what fails, in one sentence |
    concrete fix, in one sentence | effort: S/M/L

Order findings by severity then by effort (small first). End with the three
fixes that most improve the user's #1 task.

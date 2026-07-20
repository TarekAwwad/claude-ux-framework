# UX spec: <feature or screen name>

Fill every section before writing UI code. For a small feature, one line per
section is fine. Delete the guidance comments as you fill it in.

## Context

- Primary user: <role and expertise, e.g. "ops engineer, expert, uses daily">
- Usage context: <focused work / ambient monitoring / interrupted often /
  first-run>
- Device/viewport reality: <desktop-only? laptop 1366px? also mobile?>

## Tasks

What the user comes here to do, ranked. Task #1 dictates the layout: it gets
the primary position and the least clicks. If you cannot rank tasks, you do
not understand the screen yet; ask the user.

1. <most important task>
2. ...
3. ...

## Placement in IA

- Entry points: <how the user gets here: nav item, link from where, deep link>
- One level up: <the screen this belongs under>
- Onward paths: <where the user goes next, per task>

## States matrix

Every view must handle all five. "View" means each independently loading
region, not just the page.

| View | Empty (no data yet) | Loading | Error | Partial (some data) | Ideal |
|------|---------------------|---------|-------|---------------------|-------|
| <view> | <what shows + call to action> | <skeleton/spinner; no layout jump> | <message + recovery action> | <what shows> | <what shows> |

## Density & hierarchy decisions

- The one thing the user must see first: <metric, status, item>
- At a glance vs on demand: <what is always visible; what sits behind a
  click, hover, or expand>
- At the narrowest supported width, what survives: <which fields each table
  or grid keeps, and where the rest go: stacked rows, expandable detail, or
  horizontal scroll>
- What was deliberately left out: <features/data excluded and why>

---
name: ux-framework
description: Use when creating or modifying any web UI (pages, dashboards, navigation, multi-screen features) or when asked to review/audit an app's UX. Enforces a UX pass before UI code and provides audit checklists. Not for single-component styling tweaks.
---

# ux-framework

UIs must be designed around what the user is trying to do, then built.
This skill enforces that order.

## Hard rules

1. No UI code before a written UX spec exists (templates/ux-spec.md). Scale
   it down for small features; never skip it.
2. Every view handles all five states: empty, loading, error, partial,
   ideal.
3. Every screen answers: what is the one thing the user does here?
4. Do not declare UI work done before the self-audit (step 4 below).

## Build mode

1. UX pass: copy templates/ux-spec.md, fill every section, show the user.
2. Load references by the routing table below.
3. Build, following references/principles.md plus the routed module.
4. Self-audit with references/audit-checklist.md; fix or explicitly justify
   every failed check before declaring done.

## Audit mode

When asked to review/audit UX: follow "How to run an audit" in
references/audit-checklist.md. Deliver findings in its report format.

## Routing table

| Work involves | Also load |
|---------------|-----------|
| dashboard, analytics, monitoring, reports, charts, KPIs | references/dashboards.md |
| app shell, nav, sidebar, menu, IA, new pages, multi-screen flows | references/navigation.md |
| anything else UI | references/principles.md only |

references/principles.md is always loaded in build mode.

## Boundaries

- Visual aesthetics (typography, color, personality): defer to a
  frontend-design skill if available.
- Chart styling and palettes: defer to a dataviz skill if available; chart
  SELECTION rules stay here (references/dashboards.md).
- This skill owns: structure, flows, states, IA, hierarchy, density.

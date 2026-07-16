# ux-framework Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `ux-framework` skill: a process-first skill that forces UX-driven UI development (build mode) and UX review of existing apps (audit mode), backed by researched, source-traceable rules.

**Architecture:** A standalone skill repo. `skills/ux-framework/SKILL.md` holds the enforced workflow and routing table; knowledge lives in four on-demand reference files plus one template. Content is distilled from a research phase (existing skills + practitioner sources) recorded in `research/`.

**Tech Stack:** Markdown only. Git for versioning. Research via web-search-capable subagents. No runtime dependencies, no scripts.

## Global Constraints

- **No em dashes (—) in any produced file.** User's global writing rule. Verify with `grep -rn "—" <file>`; expect no output. Use periods, commas, or parentheses.
- **Avoid AI-tell writing** in all content: no "The headline: X" appositives, no stacked punchy one-liners, no relentlessly parallel bold-label bullet lists, no hype words ("game-changer"), no forced triads. Plain sentences a busy human would type.
- **Web-focused, stack-agnostic.** No framework-specific code or recipes (no React/Tailwind snippets) anywhere in skill content.
- **Line budgets (hard):** `SKILL.md` ≤ 150 lines; each file in `references/` ≤ 300 lines; `templates/ux-spec.md` ≤ 80 lines.
- **Every rule is imperative and checkable.** "One primary action per screen", never "consider visual hierarchy". If you cannot imagine checking it during an audit, rewrite or cut it.
- **Every rule is traceable.** Each rule in the final skill maps to an entry in `research/rule-candidates.md` (which cites a source or names a known agent failure mode).
- **Rules only where agents fail by default.** If Claude already does it reliably without the skill, cut the rule.
- **Skill folder self-contained** under `skills/ux-framework/`. Reference files are referred to by relative path from SKILL.md.
- **Commit after every task** with the footer: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Repo root: `d:/Code/Claude-UX-skill-creator`. All paths below are relative to it.

---

### Task 1: Repo scaffolding and README

**Files:**
- Create: `README.md`
- Create: `skills/ux-framework/references/.gitkeep`, `skills/ux-framework/templates/.gitkeep`, `research/.gitkeep`

**Interfaces:**
- Produces: the directory layout every later task writes into.

- [ ] **Step 1: Create directories**

Run:
```bash
cd "d:/Code/Claude-UX-skill-creator"
mkdir -p skills/ux-framework/references skills/ux-framework/templates research
touch skills/ux-framework/references/.gitkeep skills/ux-framework/templates/.gitkeep research/.gitkeep
```

- [ ] **Step 2: Write README.md**

Write `README.md` with exactly this content:

```markdown
# ux-framework

A Claude Code skill that moves agents from "nice UI" to UX-driven UI
development. Agents are good at local polish (a pretty component, a clean
color scheme) and bad at project-wide UX: information architecture, user
goals, flows across screens, state handling, density decisions. This skill
fixes that with an enforced process, not a rulebook.

## What it does

**Build mode.** Before any UI code, the agent writes a short UX spec (who the
user is, their top tasks, where the screen sits in the app, a states matrix).
It then loads the reference module matching the UI type (dashboards,
navigation), builds, and self-audits against a checklist before declaring
done.

**Audit mode.** Ask for a UX review of an existing app and the agent
inventories screens and flows, looks at the rendered UI where possible, and
returns prioritized findings scored by severity and effort.

## Install

Copy or link `skills/ux-framework/` into your skills directory:

    # PowerShell (junction, no admin needed)
    New-Item -ItemType Junction -Path "$HOME\.claude\skills\ux-framework" -Target "<repo>\skills\ux-framework"

    # or just copy
    cp -r skills/ux-framework ~/.claude/skills/

## Scope

Web apps, stack-agnostic. v1 modules: dashboards and data-heavy UIs,
navigation and app shell. Forms and tables are planned as future modules.

## Repo layout

- `skills/ux-framework/` is the installable skill (self-contained)
- `research/` holds the findings the rules were distilled from, with sources
- `docs/superpowers/` holds the design spec and this plan
```

- [ ] **Step 3: Verify no em dashes and commit**

Run:
```bash
cd "d:/Code/Claude-UX-skill-creator"
grep -rn "—" README.md ; echo "exit: $?"
```
Expected: no matches printed, `exit: 1` (grep found nothing).

```bash
git add README.md skills research
git commit -m "Scaffold repo layout and README

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Research sweep of existing skills

Can run in parallel with Task 3 (independent outputs). Use the
superpowers:dispatching-parallel-agents skill if executing both at once.

**Files:**
- Create: `research/findings-skills.md`

**Interfaces:**
- Produces: `research/findings-skills.md`, consumed by Task 4.

- [ ] **Step 1: Dispatch a web-research subagent**

Dispatch a general-purpose subagent with exactly this prompt:

```
Research existing Claude/agent skills for UI and UX work. You have web
access (WebSearch, WebFetch).

Targets, in priority order:
1. Anthropic's official skills repo (github.com/anthropics/skills): look for
   frontend/design/UI-related skills. Fetch and read the actual SKILL.md
   files, not just descriptions.
2. The superpowers plugin's skill-writing conventions
   (github.com/obra/superpowers): how do the best skills structure
   enforcement (hard gates, checklists, workflows)?
3. Community skill collections: search "awesome claude skills", "claude code
   skills UX", "claude skill dashboard design", "agent skill UI design".
   Fetch the top 3-5 UX/UI/design-relevant skills you find.

For EACH skill reviewed, record:
- Name, URL, what it covers
- Structure: single file or progressive disclosure? line counts? how does it
  trigger?
- Enforcement mechanism: does it change agent behavior (gates, required
  artifacts, checklists) or just provide knowledge?
- 2-4 concrete content ideas worth adopting for a UX skill
- 1-2 things to avoid (too long, vague rules, duplicated model knowledge)

End with a section "Recommendations for ux-framework" summarizing the 5-8
strongest structural and content takeaways.

Return the full findings as markdown. Cite every claim with the URL it came
from. Do not pad; if a source is thin, say so.
```

- [ ] **Step 2: Save findings**

Save the subagent's output to `research/findings-skills.md`, prepended with:

```markdown
# Findings: existing skills review

Date: <today's date>. Produced by a web-research subagent; sources cited inline.

```

- [ ] **Step 3: Verify sources and commit**

Run:
```bash
cd "d:/Code/Claude-UX-skill-creator"
grep -c "http" research/findings-skills.md
```
Expected: a count ≥ 5 (the doc cites real URLs). If 0, the research failed;
re-dispatch with the same prompt before proceeding.

```bash
grep -rn "—" research/findings-skills.md ; echo "exit: $?"
```
Expected: `exit: 1`. If the subagent used em dashes, replace them (commas,
periods, parentheses) before committing.

```bash
git add research/findings-skills.md
git commit -m "Add research findings: existing skills review

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Research sweep of practitioner UX best practices

Can run in parallel with Task 2.

**Files:**
- Create: `research/findings-practices.md`

**Interfaces:**
- Produces: `research/findings-practices.md`, consumed by Task 4.

- [ ] **Step 1: Dispatch a web-research subagent**

Dispatch a general-purpose subagent with exactly this prompt:

```
Research practitioner UX best practices for web application UI, with special
depth on (a) dashboards / data-heavy UIs and (b) navigation / app shell /
information architecture. You have web access (WebSearch, WebFetch).

Sources to mine, in priority order:
1. Kole Jain (YouTube channel about UI/UX best practices). Search for his
   channel, video titles, transcripts, summaries, and any written versions of
   his advice. Extract his recurring principles, especially anything on
   dashboards, hierarchy, spacing, and app layout. If transcripts are not
   directly fetchable, use video titles + descriptions + third-party
   summaries and say which you used.
2. Nielsen Norman Group: the 10 usability heuristics, plus NN/g articles on
   dashboard design, navigation, information architecture, complex
   applications.
3. Laws of UX (lawsofux.com): fetch the laws, note which apply to dashboards
   and navigation specifically.
4. Refactoring UI (book by Wathan & Schoger): find summaries/excerpts of its
   key principles (hierarchy, spacing, de-emphasis over emphasis).
5. Dashboard-specific literature: Stephen Few's principles (information
   dashboard design), plus modern takes (e.g. dashboards as answers to
   questions, progressive disclosure of detail, KPI hierarchy).
6. Navigation/IA: nav model selection (sidebar vs top nav), depth vs breadth,
   wayfinding signals, consistency across screens.

Output format: for each source, a section with the extracted principles as
short imperative statements (e.g. "Show the single most important number
largest and first"), each with the source URL. Prioritize principles that a
code-generating agent would plausibly violate: burying the primary metric,
equal visual weight for everything, missing empty/loading/error states,
inconsistent nav between pages, too many top-level nav items, charts chosen
by data shape rather than user question.

End with a section "Top 20 principles by impact for agent-generated UIs",
deduplicated across sources, each one line + source.

Return full markdown. Cite everything. No padding.
```

- [ ] **Step 2: Save findings**

Save output to `research/findings-practices.md`, prepended with:

```markdown
# Findings: practitioner UX best practices

Date: <today's date>. Produced by a web-research subagent; sources cited inline.

```

- [ ] **Step 3: Verify sources and commit**

Run:
```bash
cd "d:/Code/Claude-UX-skill-creator"
grep -c "http" research/findings-practices.md
```
Expected: count ≥ 10. If the Kole Jain section came back empty, note that
explicitly in the doc (do not fabricate; his advice may only exist as video).

```bash
grep -rn "—" research/findings-practices.md ; echo "exit: $?"
```
Expected: `exit: 1`; fix any em dashes before committing.

```bash
git add research/findings-practices.md
git commit -m "Add research findings: practitioner UX best practices

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Distill research into rule candidates (user checkpoint)

**Files:**
- Create: `research/rule-candidates.md`
- Read: `research/findings-skills.md`, `research/findings-practices.md`

**Interfaces:**
- Produces: `research/rule-candidates.md` with rule IDs (`P-*`, `D-*`, `N-*`,
  `C-*`), consumed by Tasks 5-9. Later tasks copy rules from this file.

- [ ] **Step 1: Write rule-candidates.md**

Read both findings files. Produce `research/rule-candidates.md` with this
exact structure:

```markdown
# Rule candidates for ux-framework

Distilled from research/findings-skills.md and
research/findings-practices.md. Each rule: imperative, checkable, sourced.
"Agent failure?" answers: would a code-generating agent plausibly get this
wrong without the skill? Rules marked no are cut and listed at the bottom.

## P: Generic principles (target: references/principles.md)

| ID | Rule (imperative, one line) | Source | Agent failure? |
|----|------------------------------|--------|----------------|
| P1 | ... | <url or "known failure mode"> | yes: <one clause why> |

## D: Dashboards (target: references/dashboards.md)

| ID | Rule | Source | Agent failure? |
...

## N: Navigation & app shell (target: references/navigation.md)

| ID | Rule | Source | Agent failure? |
...

## C: Audit checks (target: references/audit-checklist.md)

Checks derived from P/D/N rules, phrased as binary questions.

| ID | Check (yes/no question) | Derived from | Severity |
...

## Cut (model already does this reliably)

- <rule>: <why cut>
```

Aim for 15-25 P rules, 15-25 D rules, 10-20 N rules, 20-30 C checks before
cutting. Apply the cut filter honestly; the Cut section must not be empty
(if it is, the filter was not applied).

- [ ] **Step 2: Verify and commit**

Run:
```bash
cd "d:/Code/Claude-UX-skill-creator"
grep -rn "—" research/rule-candidates.md ; echo "exit: $?"
```
Expected: `exit: 1`.

```bash
git add research/rule-candidates.md
git commit -m "Distill research into sourced rule candidates

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 3: USER CHECKPOINT**

Present to the user: the Top-20 list from findings-practices.md, the rule
counts per section, and 5 sample rules from each of P/D/N. Ask whether to
adjust emphasis (more/fewer rules in an area, missing topics) before writing
skill content. Do not proceed to Task 5 without an answer.

---

### Task 5: Write the UX spec template

**Files:**
- Create: `skills/ux-framework/templates/ux-spec.md`

**Interfaces:**
- Produces: template section names (`Context`, `Tasks`, `Placement in IA`,
  `States matrix`, `Density & hierarchy decisions`) that SKILL.md (Task 10)
  refers to verbatim.

- [ ] **Step 1: Write templates/ux-spec.md**

Write exactly this content (this template is final, not a skeleton):

```markdown
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
- What was deliberately left out: <features/data excluded and why>
```

- [ ] **Step 2: Verify budget and commit**

Run:
```bash
cd "d:/Code/Claude-UX-skill-creator"
wc -l skills/ux-framework/templates/ux-spec.md
grep -rn "—" skills/ux-framework/templates/ux-spec.md ; echo "exit: $?"
```
Expected: ≤ 80 lines; `exit: 1`.

```bash
git add skills/ux-framework/templates/ux-spec.md
git commit -m "Add UX spec template

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: Write references/principles.md

**Files:**
- Create: `skills/ux-framework/references/principles.md`
- Read: `research/rule-candidates.md` (section P)

**Interfaces:**
- Consumes: P rules from `research/rule-candidates.md`.
- Produces: `references/principles.md`, loaded by SKILL.md in every build.

- [ ] **Step 1: Write the file**

Use this skeleton. Populate each section with the P rules from
`research/rule-candidates.md` (keep their IDs as `<!-- P1 -->` HTML comments
for traceability; comments do not count against readability). Rules are
imperative one-liners, optionally followed by one sentence of "how to check".
The two rules shown are real and final; write the rest in the same register.

```markdown
# Generic UX principles

Apply to every UI. Ordered by how often agents get them wrong.

## Hierarchy and focus

- One primary action per screen. If two things compete for "most prominent",
  demote one. Check: squint test; exactly one element should pull the eye.
- Size, weight, and color express importance, not decoration. The largest
  text on screen must be the most important thing on screen.
<!-- populate from P rules -->

## Task flow

<!-- P rules about ranked tasks, click depth for primary task, defaults,
progressive disclosure of advanced actions -->

## States

<!-- P rules: five states per view, skeletons vs spinners, error recovery,
empty states as onboarding -->

## Feedback and affordance

<!-- P rules: response to every action, optimistic vs confirmed, destructive
action friction, loading over 1s gets progress -->

## Density and disclosure

<!-- P rules: glanceable vs on-demand, disclosure over cramming, whitespace
as grouping -->

## Consistency

<!-- P rules: same action same place same label everywhere, one interaction
pattern per problem across the app -->

## Accessibility floor

<!-- P rules: contrast, focus visibility, keyboard reachability, touch
target sizes; only the ones agents actually miss -->
```

- [ ] **Step 2: Verify and commit**

Run:
```bash
cd "d:/Code/Claude-UX-skill-creator"
wc -l skills/ux-framework/references/principles.md
grep -rn "—" skills/ux-framework/references/principles.md ; echo "exit: $?"
grep -c "consider\|should think about\|keep in mind" skills/ux-framework/references/principles.md
```
Expected: ≤ 300 lines; em-dash grep `exit: 1`; weasel-word count 0 (all rules
imperative).

```bash
git add skills/ux-framework/references/principles.md
git commit -m "Add generic UX principles reference

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: Write references/dashboards.md

**Files:**
- Create: `skills/ux-framework/references/dashboards.md`
- Read: `research/rule-candidates.md` (section D)

**Interfaces:**
- Consumes: D rules from `research/rule-candidates.md`.
- Produces: `references/dashboards.md`, loaded via SKILL.md routing table.

- [ ] **Step 1: Write the file**

Skeleton; populate from D rules with `<!-- D# -->` traceability comments. The
opening triage section is final as written; it is the module's core move.

```markdown
# Dashboards and data-heavy UIs

Load this before building any dashboard, analytics view, monitoring screen,
or report page.

## First: what question does this dashboard answer?

A dashboard is an answer, not a collection of charts. Before layout, write
one sentence per widget: "This tells the user ___ so they can decide ___."
Any widget without a decision attached gets cut or demoted. Classify the
dashboard:

- Monitoring (is everything OK right now?): status first, big and binary,
  anomalies pop, details on demand.
- Analytical (why did X happen?): comparisons and drill-down first, filters
  prominent, time control global.
- Operational (what do I act on next?): a queue or worklist first; charts
  support the queue, not the reverse.

Mixing types on one screen is the #1 agent failure. Pick one per screen.

## KPI hierarchy

<!-- D rules: single most important number largest and first-in-scan-order,
max N top-level KPIs, deltas + comparison context on every KPI, sparklines -->

## Layout and scan order

<!-- D rules: F/Z scan pattern, above-the-fold priority, grid alignment,
consistent card anatomy (title, value, context, action) -->

## Time and comparison

<!-- D rules: one global time range control, always show the comparison
basis, timezone/freshness labeling -->

## Drill-down and filtering

<!-- D rules: overview to zoom to detail, filters visible not buried, every
aggregate clickable to its underlying list -->

## Data states

<!-- D rules: per-widget loading/empty/error (not whole-page), zero data vs
zero value distinction, stale data marking -->

## Chart choice basics

<!-- D rules: chart selected by user question not data shape; the 4-5
mappings agents get wrong. If a dedicated dataviz skill is available, defer
chart styling and palette to it; keep only selection rules here. -->

## Density

<!-- D rules: information density appropriate to monitoring vs analytical,
tables beat charts for lookup tasks, no decoration gauges -->
```

- [ ] **Step 2: Verify and commit**

Run:
```bash
cd "d:/Code/Claude-UX-skill-creator"
wc -l skills/ux-framework/references/dashboards.md
grep -rn "—" skills/ux-framework/references/dashboards.md ; echo "exit: $?"
```
Expected: ≤ 300 lines; `exit: 1`.

```bash
git add skills/ux-framework/references/dashboards.md
git commit -m "Add dashboards reference module

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: Write references/navigation.md

**Files:**
- Create: `skills/ux-framework/references/navigation.md`
- Read: `research/rule-candidates.md` (section N)

**Interfaces:**
- Consumes: N rules from `research/rule-candidates.md`.
- Produces: `references/navigation.md`, loaded via SKILL.md routing table.

- [ ] **Step 1: Write the file**

Skeleton; populate from N rules with `<!-- N# -->` comments:

```markdown
# Navigation and app shell

Load this when creating an app's shell, adding/reorganizing pages, or when
work spans more than two screens.

## Choose the nav model deliberately

<!-- N rules: sidebar vs top nav vs hybrid selection by app size and
IA depth; when to add a second nav level; never three -->

## Structure

<!-- N rules: max top-level items, group by user task not by data model or
team org, label with user words not internal jargon, depth vs breadth -->

## Wayfinding

<!-- N rules: active state always visible, breadcrumbs when depth > 2, page
title matches nav label matches URL, user always answers "where am I" -->

## Cross-screen consistency

<!-- N rules: shell identical on every page, same slot for page actions,
persistent state (filters, scroll) on back-navigation -->

## Search and shortcuts

<!-- N rules: when app search is required, command palette threshold,
keyboard reachability of primary nav -->
```

- [ ] **Step 2: Verify and commit**

Run:
```bash
cd "d:/Code/Claude-UX-skill-creator"
wc -l skills/ux-framework/references/navigation.md
grep -rn "—" skills/ux-framework/references/navigation.md ; echo "exit: $?"
```
Expected: ≤ 300 lines; `exit: 1`.

```bash
git add skills/ux-framework/references/navigation.md
git commit -m "Add navigation and app shell reference module

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: Write references/audit-checklist.md

**Files:**
- Create: `skills/ux-framework/references/audit-checklist.md`
- Read: `research/rule-candidates.md` (section C)

**Interfaces:**
- Consumes: C checks from `research/rule-candidates.md`.
- Produces: check IDs and the findings report format; SKILL.md (Task 10)
  references this file for both build-mode step 4 and audit mode.

- [ ] **Step 1: Write the file**

Skeleton; populate C checks keeping their IDs visible (IDs are part of the
report format, not comments):

```markdown
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

- C1 (MAJOR): Does exactly one element on each screen read as the primary
  action or number?
<!-- populate from C checks -->

## Checks: states

<!-- C checks -->

## Checks: navigation and consistency

<!-- C checks -->

## Checks: dashboards (apply only to data-heavy screens)

<!-- C checks -->

## Report format

For each failed check:

    <C-id> <severity> | <screen/view> | what fails, in one sentence |
    concrete fix, in one sentence | effort: S/M/L

Order findings by severity then by effort (small first). End with the three
fixes that most improve the user's #1 task.
```

- [ ] **Step 2: Verify and commit**

Run:
```bash
cd "d:/Code/Claude-UX-skill-creator"
wc -l skills/ux-framework/references/audit-checklist.md
grep -rn "—" skills/ux-framework/references/audit-checklist.md ; echo "exit: $?"
```
Expected: ≤ 300 lines; `exit: 1`.

```bash
git add skills/ux-framework/references/audit-checklist.md
git commit -m "Add UX audit checklist

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 10: Write SKILL.md

**Files:**
- Create: `skills/ux-framework/SKILL.md`
- Read: all files from Tasks 5-9 (their real section names must be referenced
  accurately)

**Interfaces:**
- Consumes: filenames and section names from Tasks 5-9 exactly as written.
- Produces: the installable skill entry point.

- [ ] **Step 1: Invoke superpowers:writing-skills**

Invoke the superpowers:writing-skills skill and follow its guidance for
frontmatter, description phrasing, and testing while executing the steps
below. Where its guidance conflicts with this plan's skeleton, its guidance
wins on frontmatter/format; this plan wins on content.

- [ ] **Step 2: Write SKILL.md**

Skeleton (frontmatter description is final; body sections must keep these
names; fill bodies to match files actually written in Tasks 5-9):

```markdown
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
```

- [ ] **Step 3: Verify and commit**

Run:
```bash
cd "d:/Code/Claude-UX-skill-creator"
wc -l skills/ux-framework/SKILL.md
grep -rn "—" skills/ux-framework/SKILL.md ; echo "exit: $?"
ls skills/ux-framework/references/ skills/ux-framework/templates/
```
Expected: ≤ 150 lines; `exit: 1`; every file named in SKILL.md exists.
Cross-check: every relative path mentioned in SKILL.md resolves
(references/principles.md, references/dashboards.md,
references/navigation.md, references/audit-checklist.md,
templates/ux-spec.md).

```bash
git rm --cached skills/ux-framework/references/.gitkeep skills/ux-framework/templates/.gitkeep 2>/dev/null
rm -f skills/ux-framework/references/.gitkeep skills/ux-framework/templates/.gitkeep
git add skills/ux-framework/SKILL.md
git commit -m "Add ux-framework SKILL.md entry point

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 11: Validation smoke test

**Files:**
- Create: `docs/validation.md`
- Scratch: use the session scratchpad directory for generated apps (do not
  commit them)

**Interfaces:**
- Consumes: the complete skill from Tasks 5-10.

- [ ] **Step 1: Generate baseline (no skill)**

Dispatch a subagent with exactly this prompt (replace `<SCRATCH>` with the
session scratchpad path):

```
Build a single-page analytics dashboard as one self-contained HTML file
(vanilla JS + inline CSS, hardcoded fake data) for a B2B SaaS product. It
must cover: MRR, churn, active users, feature adoption, and recent signups.
Save to <SCRATCH>/ux-smoke/baseline/index.html. Do not ask questions; make
reasonable assumptions. Return the file path when done.
```

- [ ] **Step 2: Generate with-skill version**

Dispatch a second subagent with exactly this prompt:

```
Read d:/Code/Claude-UX-skill-creator/skills/ux-framework/SKILL.md and follow
it fully, including its hard rules, referenced files, and templates (resolve
relative paths against the SKILL.md location). Then: build a single-page
analytics dashboard as one self-contained HTML file (vanilla JS + inline
CSS, hardcoded fake data) for a B2B SaaS product covering MRR, churn, active
users, feature adoption, and recent signups. The primary user is a startup
founder checking business health each morning. Save the filled UX spec to
<SCRATCH>/ux-smoke/with-skill/ux-spec.md and the app to
<SCRATCH>/ux-smoke/with-skill/index.html. Do not ask questions; make
reasonable assumptions and record them in the spec. Return both file paths.
```

- [ ] **Step 3: Compare and record**

Open both HTML files (screenshot via available browser tooling, or evaluate
the code directly). Score BOTH against
`skills/ux-framework/references/audit-checklist.md`, honestly. Write
`docs/validation.md`:

```markdown
# Validation: with/without smoke test

Date: <date>. Same prompt, one subagent with the skill, one without.

## Checklist scores

| Check group | Baseline failures | With-skill failures |
|-------------|-------------------|---------------------|
| ...         | ...               | ...                 |

## Observations

- <did the with-skill version rank tasks and show it in layout?>
- <states handling difference>
- <hierarchy difference>
- <anything the skill failed to change; candidate fixes>

## Verdict

<ship / iterate>. <If iterate: the 1-3 skill edits to make.>
```

- [ ] **Step 4: Iterate if needed**

If the with-skill version fails more than 2 MAJOR checks that the skill
explicitly covers, make the targeted skill edits named in the verdict,
re-run Step 2's subagent once, and update docs/validation.md. One iteration
max in this plan; further tuning is future work.

- [ ] **Step 5: Commit**

```bash
cd "d:/Code/Claude-UX-skill-creator"
grep -rn "—" docs/validation.md ; echo "exit: $?"
git add docs/validation.md
git commit -m "Add with/without validation smoke test results

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 12: Final sweep and install

**Files:**
- Modify: `README.md` (only if paths/claims drifted from reality)

- [ ] **Step 1: Full-repo constraint sweep**

Run (note: docs/superpowers/ is excluded on purpose; this plan file contains
the em-dash character inside its own grep commands):
```bash
cd "d:/Code/Claude-UX-skill-creator"
grep -rn "—" README.md skills/ research/ docs/validation.md ; echo "exit: $?"
wc -l skills/ux-framework/SKILL.md skills/ux-framework/references/*.md skills/ux-framework/templates/*.md
```
Expected: em-dash `exit: 1`; SKILL.md ≤ 150, references each ≤ 300, template
≤ 80. Fix any violation now.

- [ ] **Step 2: Verify README accuracy**

Read README.md against the final repo. Fix any drift (paths, module names).
Commit only if changed:

```bash
git add README.md && git commit -m "Align README with final structure

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 3: Install for the user**

Run (PowerShell):
```powershell
New-Item -ItemType Junction -Path "$HOME\.claude\skills\ux-framework" -Target "d:\Code\Claude-UX-skill-creator\skills\ux-framework"
```
Expected: junction created. Verify:
```powershell
Get-Item "$HOME\.claude\skills\ux-framework" | Select-Object FullName, LinkType, Target
```
Expected: `LinkType : Junction` pointing at the repo. Tell the user the
skill is installed and will be active in new sessions.

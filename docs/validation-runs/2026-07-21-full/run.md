# Run 2026-07-21-full (full suite v1, first scored full pair)

- Date: 2026-07-21
- Scenario: full (prompts/full-common-body.md + fixtures/data.json +
  fixtures/tables-data.json). One build carries both a dashboard region
  and the 400-account grid, so the whole framework is exercised on a
  single artifact and the entire 40-check audit checklist applies.
- Suite commit: 5ba3ddb (full scenario: prompt body, checkFullBuild, and
  the dashboardReachProbe/tablesGridProbes extraction, all in 5ba3ddb;
  reuses the pinned dashboard fixture 6922be1-era data.json and the
  tables fixture 6922be1).
- Skill commit: 5ba3ddb (ux-framework with the tables module b40a500 +
  audit checks C31-C40; checklist total 40).
- Disclosure: no diagnostic run was used to source rules for this
  scenario. The full scenario reuses only rules already validated by the
  dashboard and tables scenarios; it introduces no new rules. Both sides
  are fresh agents.
- Supervising session model: claude-opus-4-8[1m] (Claude Code, VSCode
  extension, Windows). Both sides: general-purpose subagents, fresh, no
  model override (inherit the session model), launched in parallel in a
  single message, neither seeing the other's output, dispatched with
  exactly the composed prompts below.
- Other skills present in the session and available to both agents:
  dataviz, frontend-design (plugin), superpowers suite, codex plugin,
  skill-creator. Shared by both sides; their wins are excluded from the
  skill's claimed delta.
- Screenshots deferred until after scoring, per protocol.

## Composed baseline prompt (verbatim)

Build an operations overview screen as one self-contained HTML file
(vanilla JS + inline CSS, no external dependencies) for a B2B SaaS product
named Ledgerline. The primary user is an operations lead who opens this
screen each morning: first to read the health of the business, then to
work the customer accounts list, finding specific accounts, spotting
accounts that need attention, and fixing bad data. Both jobs live on this
one screen.

Data contract, business health: read d:/Code/Claude-UX-skill-creator/validation/fixtures/data.json
and hardcode exactly that data. Do not invent, rename, omit, or add data
elements. Every one of the following must be reachable in the rendered UI
(visible directly, or behind a visible control such as a tab, toggle,
filter, or scroll; never only in source or comments): (1) MRR and its
13-month history; (2) monthly churn rate and its history; (3) weekly
active users and its history; (4) the feature adoption percentages for all
7 listed features; (5) the recent signups list, with all six fields for
all 14 rows.

Data contract, customer accounts: read
d:/Code/Claude-UX-skill-creator/validation/fixtures/tables-data.json and
hardcode exactly that data. Do not invent, rename, omit, or add data
elements. Every one of the 400 account rows, and every field of each row,
must be reachable in the rendered UI (visible directly, or behind a
visible control such as search, a filter, a pager, a row expander, or
scroll; never only in source or comments).

In the accounts area, the user must be able to do all of the following in
the rendered UI: (1) find a specific account by name and see all of its
fields; (2) act on several accounts at once; (3) correct a wrong field
value on an account; (4) remove an account. How each of these works
(controls, layout, interaction patterns) is entirely your decision.

How you combine the business-health view and the accounts view on the one
screen (layout, order, hierarchy, whether either sits behind a tab or
section) is entirely your decision, as long as everything above stays
reachable on this single page.

Style contract: inline the design tokens from
d:/Code/Claude-UX-skill-creator/validation/fixtures/tokens.css verbatim and build strictly from
them. Every color, font, radius, shadow, and spacing value must come from
a token; do not introduce new colors or one-off spacing values. Light is
the token default; a dark theme is optional and comes only from the
provided prefers-color-scheme block. How you apply the tokens (layout,
hierarchy, emphasis, components, states) is entirely your decision.

Apart from the two fixture files (and any files your instructions above
require), do not read other files from d:/Code/Claude-UX-skill-creator.

Save the app to d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-21-full/baseline/index.html. Do not ask questions; make
reasonable assumptions. When done, return the paths of every file you
wrote.

## Composed with-skill prompt (verbatim)

Read d:/Code/Claude-UX-skill-creator/skills/ux-framework/SKILL.md and follow it fully, including its
hard rules, referenced files, and templates (resolve relative paths against
the SKILL.md location). Save the filled UX spec to d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-21-full/with-skill/ux-spec.md. Record your assumptions in the spec. Then complete the task below.

---

Build an operations overview screen as one self-contained HTML file
(vanilla JS + inline CSS, no external dependencies) for a B2B SaaS product
named Ledgerline. The primary user is an operations lead who opens this
screen each morning: first to read the health of the business, then to
work the customer accounts list, finding specific accounts, spotting
accounts that need attention, and fixing bad data. Both jobs live on this
one screen.

Data contract, business health: read d:/Code/Claude-UX-skill-creator/validation/fixtures/data.json
and hardcode exactly that data. Do not invent, rename, omit, or add data
elements. Every one of the following must be reachable in the rendered UI
(visible directly, or behind a visible control such as a tab, toggle,
filter, or scroll; never only in source or comments): (1) MRR and its
13-month history; (2) monthly churn rate and its history; (3) weekly
active users and its history; (4) the feature adoption percentages for all
7 listed features; (5) the recent signups list, with all six fields for
all 14 rows.

Data contract, customer accounts: read
d:/Code/Claude-UX-skill-creator/validation/fixtures/tables-data.json and
hardcode exactly that data. Do not invent, rename, omit, or add data
elements. Every one of the 400 account rows, and every field of each row,
must be reachable in the rendered UI (visible directly, or behind a
visible control such as search, a filter, a pager, a row expander, or
scroll; never only in source or comments).

In the accounts area, the user must be able to do all of the following in
the rendered UI: (1) find a specific account by name and see all of its
fields; (2) act on several accounts at once; (3) correct a wrong field
value on an account; (4) remove an account. How each of these works
(controls, layout, interaction patterns) is entirely your decision.

How you combine the business-health view and the accounts view on the one
screen (layout, order, hierarchy, whether either sits behind a tab or
section) is entirely your decision, as long as everything above stays
reachable on this single page.

Style contract: inline the design tokens from
d:/Code/Claude-UX-skill-creator/validation/fixtures/tokens.css verbatim and build strictly from
them. Every color, font, radius, shadow, and spacing value must come from
a token; do not introduce new colors or one-off spacing values. Light is
the token default; a dark theme is optional and comes only from the
provided prefers-color-scheme block. How you apply the tokens (layout,
hierarchy, emphasis, components, states) is entirely your decision.

Apart from the two fixture files (and any files your instructions above
require), do not read other files from d:/Code/Claude-UX-skill-creator.

Save the app to d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-21-full/with-skill/index.html. Do not ask questions; make
reasonable assumptions. When done, return the paths of every file you
wrote.

## Post-launch note: baseline re-run as an explicit control

The first baseline agent, dispatched with the byte-symmetric common body
above (no preamble), invoked the ux-framework skill on its own: it wrote a
UX spec, ran the audit checklist, and cited specific checks (C34, C37)
while self-correcting. The skill is available as a tool to subagents in
this session, and the agent reached for it despite the prompt not asking
it to. That contaminates the control arm (a "without skill" build that
actually followed the skill), so its output was discarded and the baseline
was rebuilt by a fresh agent with an explicit control preamble that
forbids invoking or following the skill. The with-skill arm is unaffected;
it is supposed to use the skill.

This is a stronger isolation than the byte-symmetric common body relied on
by earlier runs (2026-07-20*, 2026-07-21-tables), where the baseline
agent's skill-awareness was disclosed but not actively suppressed. The
experimental variable is unchanged (skill vs no skill); only the control
is now enforced rather than assumed. Both arms are still fresh agents,
launched without seeing each other's output.

### Composed control-baseline prompt (verbatim, the scored baseline)

CONTROL CONDITION. Build the task below using only your own judgment and
knowledge. Do NOT invoke, read, or follow the ux-framework skill, its
SKILL.md, its audit checklist, or any other skill, checklist, framework,
or guidance file in this repository, even if one seems relevant or is
available to you as a tool. Do not write a UX spec. Do not run a UX audit.
Just build the task below directly, the way you would if no such skill
existed. (You may still read the fixture data files named below; those are
data, not guidance.)

---

(followed by the identical common body shown under "Composed baseline
prompt (verbatim)" above, with OUTPUT_DIR = .../baseline)

## Results

(filled in after scoring)

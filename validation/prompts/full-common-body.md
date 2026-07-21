# Full common prompt body

This body is shared verbatim by both test prompts of the full scenario.
The only difference between the two prompts is the preamble defined in
baseline.md and with-skill.md. `<REPO>` and `<OUTPUT_DIR>` are substituted
at run time. This scenario puts both UI types the framework covers, a
dashboard and a data grid, on a single screen so the whole framework is
exercised on one build.

---

Build an operations overview screen as one self-contained HTML file
(vanilla JS + inline CSS, no external dependencies) for a B2B SaaS product
named Ledgerline. The primary user is an operations lead who opens this
screen each morning: first to read the health of the business, then to
work the customer accounts list, finding specific accounts, spotting
accounts that need attention, and fixing bad data. Both jobs live on this
one screen.

Data contract, business health: read <REPO>/validation/fixtures/data.json
and hardcode exactly that data. Do not invent, rename, omit, or add data
elements. Every one of the following must be reachable in the rendered UI
(visible directly, or behind a visible control such as a tab, toggle,
filter, or scroll; never only in source or comments): (1) MRR and its
13-month history; (2) monthly churn rate and its history; (3) weekly
active users and its history; (4) the feature adoption percentages for all
7 listed features; (5) the recent signups list, with all six fields for
all 14 rows.

Data contract, customer accounts: read
<REPO>/validation/fixtures/tables-data.json and hardcode exactly that
data. Do not invent, rename, omit, or add data elements. Every one of the
400 account rows, and every field of each row, must be reachable in the
rendered UI (visible directly, or behind a visible control such as search,
a filter, a pager, a row expander, or scroll; never only in source or
comments).

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
<REPO>/validation/fixtures/tokens.css verbatim and build strictly from
them. Every color, font, radius, shadow, and spacing value must come from
a token; do not introduce new colors or one-off spacing values. Light is
the token default; a dark theme is optional and comes only from the
provided prefers-color-scheme block. How you apply the tokens (layout,
hierarchy, emphasis, components, states) is entirely your decision.

Apart from the two fixture files (and any files your instructions above
require), do not read other files from <REPO>.

Save the app to <OUTPUT_DIR>/index.html. Do not ask questions; make
reasonable assumptions. When done, return the paths of every file you
wrote.

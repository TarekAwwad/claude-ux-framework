# Common prompt body

This body is shared verbatim by both test prompts. The only difference
between the two prompts is the preamble defined in baseline.md and
with-skill.md. `<REPO>` and `<OUTPUT_DIR>` are substituted at run time.

---

Build a single-page analytics dashboard as one self-contained HTML file
(vanilla JS + inline CSS, no external dependencies) for a B2B SaaS product
named Ledgerline. The primary user is a startup founder checking business
health each morning.

Data contract: read <REPO>/validation/fixtures/data.json and hardcode
exactly that data. Do not invent, rename, omit, or add data elements. Every
one of the following must be reachable in the rendered UI (visible
directly, or behind a visible control such as a tab, toggle, filter, or
scroll; never only in source or comments): (1) MRR and its 13-month
history; (2) monthly churn rate and its history; (3) weekly active users
and its history; (4) the feature adoption percentages for all 7 listed
features; (5) the recent signups list, with all six fields for all 14
rows. You may combine or separate views however you judge best, as long
as everything stays reachable.

Style contract: inline the design tokens from
<REPO>/validation/fixtures/tokens.css verbatim and build strictly from
them. Every color, font, radius, shadow, and spacing value must come from
a token; do not introduce new colors or one-off spacing values. Light is
the token default; a dark theme is optional and comes only from the
provided prefers-color-scheme block. How you apply the tokens (layout,
hierarchy, emphasis, components, states) is entirely your decision.

Apart from the fixture file (and any files your instructions above require),
do not read other files from <REPO>.

Save the app to <OUTPUT_DIR>/index.html. Do not ask questions; make
reasonable assumptions. When done, return the paths of every file you
wrote.

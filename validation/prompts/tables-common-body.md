# Tables common prompt body

This body is shared verbatim by both test prompts of the tables scenario.
The only difference between the two prompts is the preamble defined in
baseline.md and with-skill.md. `<REPO>` and `<OUTPUT_DIR>` are substituted
at run time.

---

Build a customer accounts screen as one self-contained HTML file (vanilla
JS + inline CSS, no external dependencies) for a B2B SaaS product named
Ledgerline. The primary user is a customer-success lead who works in this
screen all day: finding specific accounts, spotting accounts that need
attention, and fixing bad data.

Data contract: read <REPO>/validation/fixtures/tables-data.json and
hardcode exactly that data. Do not invent, rename, omit, or add data
elements. Every one of the 400 account rows, and every field of each row,
must be reachable in the rendered UI (visible directly, or behind a
visible control such as search, a filter, a pager, a row expander, or
scroll; never only in source or comments).

The user must be able to do all of the following in the rendered UI:
(1) find a specific account by name and see all of its fields; (2) act on
several accounts at once; (3) correct a wrong field value on an account;
(4) remove an account. How each of these works (controls, layout,
interaction patterns) is entirely your decision.

Style contract: inline the design tokens from
<REPO>/validation/fixtures/tokens.css verbatim and build strictly from
them. Every color, font, radius, shadow, and spacing value must come from
a token; do not introduce new colors or one-off spacing values. Light is
the token default; a dark theme is optional and comes only from the
provided prefers-color-scheme block. How you apply the tokens (layout,
hierarchy, emphasis, components, states) is entirely your decision.

Apart from the fixture file (and any files your instructions above
require), do not read other files from <REPO>.

Save the app to <OUTPUT_DIR>/index.html. Do not ask questions; make
reasonable assumptions. When done, return the paths of every file you
wrote.

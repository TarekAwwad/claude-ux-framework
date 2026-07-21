# Run 2026-07-20-tables-diag (tables suite v1, diagnostic)

- Date: 2026-07-20
- Diagnostic run: single no-skill build used to source T rules. Not a
  scored pair.
- Suite commit: 8b9cdc9 (tables suite v1: fixture, prompt body, scenario
  checks; settle-wait fix included)
- Skill last changed at 681458d (no tables module exists yet; that is the
  point of this run)
- Supervising session model: claude-fable-5 (Claude Code, VSCode
  extension, Windows). Builder subagent: general-purpose, fresh, no model
  override (inherits the session model), dispatched with exactly the
  composed prompt below, matching the 2026-07-20c dispatch precedent.
- Other skills present in the session and available to the agent: dataviz,
  frontend-design (plugin), superpowers suite, codex plugin, skill-creator.
  ux-framework is installed in the session but the prompt does not
  reference it; any self-triggering would be recorded here (none observed
  in prior runs).
- Screenshots: none planned for this run (diagnostic, not documentation).

## Composed baseline prompt (verbatim)

Build a customer accounts screen as one self-contained HTML file (vanilla
JS + inline CSS, no external dependencies) for a B2B SaaS product named
Ledgerline. The primary user is a customer-success lead who works in this
screen all day: finding specific accounts, spotting accounts that need
attention, and fixing bad data.

Data contract: read d:/Code/Claude-UX-skill-creator/validation/fixtures/tables-data.json and
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
d:/Code/Claude-UX-skill-creator/validation/fixtures/tokens.css verbatim and build strictly from
them. Every color, font, radius, shadow, and spacing value must come from
a token; do not introduce new colors or one-off spacing values. Light is
the token default; a dark theme is optional and comes only from the
provided prefers-color-scheme block. How you apply the tokens (layout,
hierarchy, emphasis, components, states) is entirely your decision.

Apart from the fixture file (and any files your instructions above
require), do not read other files from d:/Code/Claude-UX-skill-creator.

Save the app to d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-20-tables-diag/baseline/index.html. Do not ask questions; make
reasonable assumptions. When done, return the paths of every file you
wrote.

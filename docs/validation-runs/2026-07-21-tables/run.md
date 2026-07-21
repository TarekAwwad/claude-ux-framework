# Run 2026-07-21-tables (tables suite v1, first scored tables pair)

- Date: 2026-07-21
- Suite commit: 63cf649 (tables suite v1: fixture 6922be1, prompt body
  0028e22, scenario checks 3b39f30 + settle fix 8b9cdc9)
- Skill commit: 63cf649 (tables module b40a500 + audit checks C31-C40;
  checklist total 40)
- Disclosure: T rules were partly sourced from diagnostic run
  2026-07-20-tables-diag on this same scenario; see
  docs/validation-runs/2026-07-20-tables-diag/ once published. This
  pair's baseline is a fresh agent.
- Supervising session model: claude-fable-5 (Claude Code, VSCode
  extension, Windows). Both sides: general-purpose subagents, fresh, no
  model override (inherit the session model), launched in parallel in a
  single message, neither seeing the other's output, dispatched with
  exactly the composed prompts below (2026-07-20c precedent).
- Other skills present in the session and available to both agents:
  dataviz, frontend-design (plugin), superpowers suite, codex plugin,
  skill-creator. Shared by both sides; their wins are excluded from the
  skill's claimed delta.
- Screenshots deferred until after scoring, per protocol.
- Post-run note: the baseline agent reported that it inferred from the
  fixture's description line ("both test builds must hardcode them
  verbatim") that it was the without-skill arm of a comparison, and that
  it therefore deliberately did not invoke the ux-framework skill. Good
  for isolation, but the awareness itself is a confound this log
  discloses. The with-skill agent followed the skill because its preamble
  told it to, as designed.

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

Save the app to d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-21-tables/baseline/index.html. Do not ask questions; make
reasonable assumptions. When done, return the paths of every file you
wrote.

## Composed with-skill prompt (verbatim)

Read d:/Code/Claude-UX-skill-creator/skills/ux-framework/SKILL.md and follow
it fully, including its hard rules, referenced files, and templates (resolve
relative paths against the SKILL.md location). Save the filled UX spec to
d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-21-tables/with-skill/ux-spec.md.
Record your assumptions in the spec. Then complete the task below.

---

[Identical to the baseline prompt above, with the save path
d:/Code/Claude-UX-skill-creator/validation/runs/2026-07-21-tables/with-skill/index.html]

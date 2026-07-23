# Baseline prompt (no skill)

The baseline agent receives the preamble below, then the scenario's body
(common-body.md, tables-common-body.md, or full-common-body.md), verbatim,
with placeholders substituted.

This preamble exists because the ux-framework skill is installed in the
running session and auto-triggers on "build a UI"; without an explicit
exclusion a fresh subagent invokes it on its own and contaminates the
control. The exclusion is the mirror of prompts/with-skill.md: one side is
told to follow the skill, the other is told not to. That opposed pair is
the experimental variable.

---

Do not use, read, or follow the ux-framework skill, and do not read any
file under <REPO>/skills. Build using only your own judgment and the
fixture files named in the task. Do not write a UX spec or run the
project's audit checklist. Then complete the task below.

---

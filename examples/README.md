# Examples: the published with/without pair

Two builds of the same prompt from validation run 2026-07-20c: a B2B SaaS
analytics dashboard, vanilla JS, with the dataset and the design tokens
pinned by fixture so both builds share data, palette, type, and spacing.
One agent had the ux-framework skill, one did not; the prompts were
otherwise byte-identical. Method, scores for every run, and caveats:
[../docs/validation.md](../docs/validation.md). The suite that produced
this pair is in [../validation/](../validation/).

- `baseline/` is the build without the skill
- `with-skill/` is the build with it, plus the `ux-spec.md` the skill made
  the agent write before any code
- `shots/` holds the screenshots referenced by the validation doc
- `shots.js` re-renders every screenshot (Node + Playwright + Chrome)

Open either `index.html` in a browser. The with-skill build has no demo
state switcher; its states are real code paths. To see them: disable
JavaScript for the loading skeletons and the noscript notice, search the
signups table for gibberish for the empty state, and see `shots.js` for
the injected-fault capture of the per-panel error state. The artifact
files are unedited agent output from the test run; earlier published
pairs remain in git history (the original ad hoc pair up to commit
cde3274).

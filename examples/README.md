# Examples: the with/without smoke test

Two builds of the same prompt (a B2B SaaS analytics dashboard, vanilla JS,
fake data). One agent had the ux-framework skill, one did not. Method,
scoring, and caveats: [../docs/validation.md](../docs/validation.md).

- `baseline/` is the build without the skill
- `with-skill/` is the build with it, plus the `ux-spec.md` the skill made
  the agent write before any code
- `shots/` holds the screenshots referenced by the validation doc
- `shots.js` re-renders every screenshot (Node + Playwright + Chrome)

Open either `index.html` in a browser. On the with-skill build, use the
"Preview state" control (top right) to walk the loading, empty, error, and
partial states. The artifact files are unedited output from the test run.

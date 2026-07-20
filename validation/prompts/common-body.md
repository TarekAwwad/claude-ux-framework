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
exactly that data. Do not invent, rename, omit, or add data elements. The
dashboard must present all of the following, and nothing outside the
fixture: (1) MRR and its 13-month history; (2) monthly churn rate and its
history; (3) weekly active users and its history; (4) the feature adoption
percentages for all 7 listed features; (5) the recent signups list, with
all six fields for all 14 rows reachable in the UI.

Apart from the fixture file (and any files your instructions above require),
do not read other files from <REPO>.

Save the app to <OUTPUT_DIR>/index.html. Do not ask questions; make
reasonable assumptions. When done, return the paths of every file you
wrote.

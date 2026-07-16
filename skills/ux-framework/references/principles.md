# Generic UX principles

Apply to every UI. Ordered by how often agents get them wrong.

## Hierarchy and focus

- One primary action per screen. If two things compete for "most prominent", demote one. Check: squint test; exactly one element should pull the eye. <!-- P2 -->
- Size, weight, and color express importance, not decoration. The largest text on screen must be the most important thing on screen. <!-- P5 -->
- Create hierarchy by de-emphasizing competing elements (lower contrast, muted color), not by enlarging the primary one. <!-- P6 -->
- Use two or three text colors (dark primary, gray secondary, lighter tertiary) and keep body text at weight 400 or above. <!-- P7 -->

## Task flow

- Before writing UI code, do a UX pass: name the primary user, their top task, and every state this screen can be in. Check: you can state the top task in one sentence before any markup exists. <!-- P1 -->
- Reserve modals for focused multi-field tasks; use popovers or inline UI for lightweight, non-blocking interactions. <!-- P20 -->

## States

- Design and build the empty, loading, and error states for every data-backed view, not just the populated one. Check: each data view renders sensibly with zero rows, in flight, and on failure. <!-- P3 -->
- Write empty states and error messages as guidance (what happened, what to do next), not bare "No data" or raw error text. <!-- P18 -->

## Feedback and affordance

- Give every user action visible feedback: a disabled or pending button, spinner, toast, or confirmation. No silent state change. <!-- P4 -->
- Give any icon-only control or abbreviation a visible text label or a tooltip. <!-- P12 -->
- Guard destructive actions with an undo, cancel, or confirmation step; never execute them irreversibly. <!-- P17 -->

## Density and disclosure

- Make spacing between groups visibly larger than spacing within a group so grouping reads without borders. Check: related items sit closer to each other than to the next group. <!-- P8 -->
- Remove anything that does not serve the primary task; every extra element competes with the important ones. <!-- P16 -->
- Keep shadows, gradients, and glows subtle, and never use `transition: all`. <!-- P15 -->
- Constrain paragraph and text-column width to roughly 45 to 75 characters. <!-- P19 -->

## Consistency

- Draw every margin and padding from a defined spacing scale (for example 4/8/12/16/24/32); no arbitrary one-off pixel values. Check: no ad hoc values like 13px or 27px. <!-- P9 -->
- Standardize one corner-radius value, one button-size scale, and one icon set across the whole UI, and reuse those tokens. <!-- P10 -->
- Use a single icon library, and never use emojis as UI iconography in a professional product. <!-- P11 -->
- Keep the working palette small (roughly 6 colors) and reserve specific hues for consistent semantic meaning, for example red only for destructive or error. <!-- P13 -->

## Accessibility floor

- Never use color as the sole signal of state or category; reinforce it with text, icon, or shape. Check: the UI still reads correctly in grayscale. <!-- P14 -->
- Give every interactive element a visible keyboard focus state (focus-visible), not just a hover style. Check: tabbing through the page shows a clear focus indicator on each control. <!-- P21 -->

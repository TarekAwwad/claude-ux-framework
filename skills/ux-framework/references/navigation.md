# Navigation and app shell

Load this when creating an app's shell, adding/reorganizing pages, or when
work spans more than two screens.

## Choose the nav model deliberately

- Use a left sidebar once there are more than roughly 5 to 7 top-level sections, or for any dashboard or enterprise app; use a top nav bar only for roughly 5 to 7 sections. Check: count the top-level sections; more than 7, or a dashboard or enterprise app, selects the sidebar. <!-- N3 -->
- On desktop and large screens, show the nav categories directly; do not hide primary navigation behind a hamburger menu. <!-- N4 -->
- Render sidebar items as left-aligned text labels (icons optional); do not build an icon-only rail. <!-- N5 -->
- Do not pair a sidebar with a redundant second horizontal menu of the same links. <!-- N9 -->
- For closely related pages, provide local or contextual navigation so users move sideways without returning to the top menu. <!-- N8 -->
- Avoid deep multilevel cascading menus; use a mega-menu or a landing page for broad sub-navigation. <!-- N14 -->

## Structure

- Size the nav to the product's actual structure; do not invent a fixed "7 items" cap or pad the menu to a round number. <!-- N10 -->
- Order nav items by frequency of use, not alphabetically, and push rarely-used items like settings to the bottom. <!-- N6 -->
- Consolidate secondary or duplicated top-level links (for example settings and billing) into grouped menus or popovers. <!-- N13 -->
- Mark expandable items with a caret or arrow and open their submenus on click, not on hover alone. <!-- N11 -->

## Wayfinding

- Always show the user's current location in the nav via an active state and/or breadcrumbs. Check: on any screen the user can answer "where am I" from the nav alone. <!-- N2 -->
- Add breadcrumbs or a back control whenever navigation moves to a deeper page or level. <!-- N7 -->

## Cross-screen consistency

- Keep navigation structurally identical on every screen: same position, same order, same active-state logic. Check: the shell reads the same after moving between any two screens. <!-- N1 -->

## Search and shortcuts

- Treat the sidebar as the product spine: put primary navigation, search, and profile or account there. <!-- N12 -->
- Nav is built from interactive controls, so give each a visible keyboard focus state (see P21 in principles.md).

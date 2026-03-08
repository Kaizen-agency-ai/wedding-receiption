# TODO — Wedding Reception Dashboard

## Priority 1: Core Improvements

- [ ] **Persist state to localStorage** — currently all check-in and ang bao data is lost on page refresh; add auto-save/restore with a version key
- [ ] **CSV/Excel import for guest list** — let the receptionist upload a spreadsheet instead of editing `guests.js`; parse with SheetJS or Papaparse
- [ ] **CSV/Excel export of ang bao records** — end-of-night export with guest name, table, amount, timestamp for the couple to reconcile
- [ ] **Mobile responsiveness polish** — the dashboard works on tablet but the floor plan SVG and checklist need more testing on phone-sized screens; consider a bottom tab bar for mobile

## Priority 2: Features Discussed but Not Built

- [ ] **Vendor contact list page** — add a 4th tab with vendor name, role, phone, arrival status, and notes (florist, photographer, caterer, AV, emcee, etc.)
- [ ] **Event itinerary / timeline page** — show the run-of-show with times (e.g. 6:00 PM Doors Open, 7:00 PM Dinner Served, 8:30 PM Cake Cutting) with a "now" indicator
- [ ] **Walk-in / unregistered guest handling** — add a quick-add form for guests who show up unannounced; assign them to a table on the fly
- [ ] **Guest search with table direction** — when searching a guest name, show which table they're at with a visual highlight on the floor plan
- [ ] **Ang bao envelope numbering** — track physical envelope numbers alongside amounts for accountability
- [ ] **Multi-receptionist support** — if multiple friends are helping at the reception desk, sync state via a simple backend (Firebase Realtime Database or Supabase) so check-ins don't conflict

## Priority 3: Polish and UX

- [ ] **Add TypeScript** — convert `.jsx` → `.tsx` for type safety on guest/table data shapes
- [ ] **Confirmation on check-in undo** — if a guest is accidentally unchecked, show a brief toast/snackbar with an undo option instead of silently toggling
- [ ] **Table quick-jump from floor plan** — clicking a table on the SVG floor plan switches to the checklist tab and scrolls to that table group
- [ ] **Print view** — generate a clean printable guest list sorted by table (for backup physical copies at the reception desk)
- [ ] **Dark mode** — the charcoal + gold palette lends itself well to a dark theme; wire up CSS variables toggle
- [ ] **Accessibility audit** — add ARIA labels to the SVG floor plan, improve keyboard navigation on the checklist checkboxes
- [ ] **Floor plan editor** — let the user drag tables to match their actual venue layout instead of hard-coding `TABLE_POSITIONS`

## Known Issues / Rough Edges

- [ ] Floor plan tooltip position can drift if the SVG container is scrolled horizontally on small screens
- [ ] The clock in the top bar updates every 30 seconds (not every minute boundary); minor visual jitter possible
- [ ] Guest list is currently hard-coded with 120 sample Singaporean names; needs to be replaced with real data before the event
- [ ] No loading or empty states — if the guest list is empty the pages just render blank
- [ ] The ang bao modal doesn't validate for negative numbers (the `min="0"` attribute helps but isn't foolproof)
- [ ] `&apos;` entity in FloorPlanSVG.jsx may render differently across browsers — test on Safari/Firefox

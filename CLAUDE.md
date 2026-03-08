# CLAUDE.md — Project Instructions for Claude Code

## Project Overview

Wedding Reception Dashboard — a client-side React app for managing a Singaporean Chinese wedding banquet reception. The receptionist uses it to check in guests, record ang bao (red packet) amounts, and monitor table occupancy in real time via a visual floor plan.

## Architecture

### Stack
- **Vite + React 18** — no Next.js, no SSR; this is a single-page client-side app
- **Vanilla CSS** — no Tailwind, no CSS-in-JS; styles live in `src/styles/index.css`
- **No backend** — all state is in-memory React state via a custom hook; no database yet

### State Management
- All guest/table state lives in `src/hooks/useGuests.js` (custom hook using `useState` + `useMemo`)
- The hook returns `{ guests, stats, toggleCheckIn, setAngBao }`
- `stats` is a derived object recalculated via `useMemo` whenever `guests` changes
- State flows down from `App.jsx` → page components → child components via props
- No context providers or state libraries yet; add if the component tree deepens significantly

### Routing
- Tab-based navigation managed by `useState` in `App.jsx` — not React Router
- Three tabs: `dashboard`, `checklist`, `floorplan`
- If adding more pages, consider switching to React Router

### Data Layer
- Seed data in `src/data/guests.js` and `src/data/tables.js` (plain JS arrays)
- Wedding config (couple name, date, currency) in `src/data/config.js`
- In production, these would be replaced by database queries or API calls

## Key Design Decisions

### Why Vite + React (not Next.js)
No server-side rendering needed. No API routes. No file-based routing. Vite gives fast HMR and tiny production builds for a purely client-side app.

### Why vanilla CSS (not Tailwind)
The design has a specific wedding aesthetic with custom CSS variables for the colour palette. The stylesheet is well-organised with clear section headers. Tailwind would add build complexity without significant benefit at this scale.

### Why inline SVG for the floor plan
The floor plan needs to react to live data (table colours change as guests check in). An inline SVG lets us bind React state directly to fill/stroke attributes without image manipulation.

### Colour palette
- **Gold** (`#B8860B`, `#D4A843`) — primary accent, check-in indicators, partial status
- **Charcoal** (`#2C2420`) — text, top bar
- **Cream** (`#FDF8F0`) — backgrounds
- **Red carpet** (`#A84448`) — full table status, matching the carpeted aisle in the floor plan
- **Rose** (`#C4767A`) — ang bao indicators before receipt

### Floor plan layout
The SVG mirrors a typical Chinese restaurant banquet layout: stage at top, parents' tables flanking, red carpeted aisle down centre, numbered round tables in two staggered columns. Table positions are defined in `TABLE_POSITIONS` in `FloorPlanSVG.jsx`.

## Coding Conventions

### File organisation
- Components → `src/components/` (reusable UI pieces)
- Pages → `src/pages/` (one per tab, composed of components)
- Data → `src/data/` (seed data and config)
- Hooks → `src/hooks/` (custom React hooks)
- Styles → `src/styles/` (single global CSS file)

### Naming
- Components: PascalCase filenames, default exports (`FloorPlanSVG.jsx`)
- Data files: camelCase (`guests.js`, `tables.js`)
- CSS classes: kebab-case (`.table-card`, `.ang-bao-tag`)
- CSS variables: prefixed with category (`--gold-light`, `--charcoal`)

### Component patterns
- Functional components only, no class components
- Hooks for state and effects (`useState`, `useMemo`, `useEffect`)
- Props for data flow; callbacks for mutations (`onToggleCheckIn`, `onOpenAngBao`)
- No prop-types or TypeScript yet (see TODO)

### CSS patterns
- CSS custom properties (`:root` variables) for all colours
- Section headers in CSS using `/* ══ SECTION ══ */` comments
- BEM-ish class naming without strict methodology
- No utility classes; each component has semantic class names
- Responsive breakpoints at 900px and 520px

## Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
```

## File Structure

```
src/
├── main.jsx                 # ReactDOM.createRoot entry
├── App.jsx                  # Tab state + page rendering + modal
├── components/
│   ├── AngBaoModal.jsx      # Amount input modal (controlled)
│   ├── FloorPlanSVG.jsx     # SVG floor plan with live data binding
│   ├── Icons.jsx            # CheckIcon, SearchIcon, RingsIcon, AngBaoIcon
│   └── TopBar.jsx           # Sticky header with clock
├── data/
│   ├── config.js            # { coupleName, date, venue, currency, locale }
│   ├── guests.js            # Array of 120 guest objects
│   └── tables.js            # Array of 12 table objects
├── hooks/
│   └── useGuests.js         # Central state: guests array + derived stats
├── pages/
│   ├── ChecklistPage.jsx    # Search, filter, accordion, check-in rows
│   ├── DashboardPage.jsx    # Stat cards, progress bar, occupancy grid
│   └── FloorPlanPage.jsx    # Legend + FloorPlanSVG wrapper
└── styles/
    └── index.css            # All styles (~450 lines, well-sectioned)
```

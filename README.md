# Wedding Reception Dashboard

A real-time wedding receptionist dashboard built for managing guest check-ins, ang bao (red packet) tracking, and live seating plan visualisation. Designed for the Singaporean Chinese wedding banquet context.

## What It Does

The dashboard gives the wedding receptionist a single tool to manage three core responsibilities on the night itself:

- **Dashboard** — real-time stats (guests arrived, tables full, ang bao count and total, pending guests), overall attendance percentage bar, and a card-based seating grid showing per-table occupancy.
- **Guest Checklist** — full guest list grouped by table number with search, filter (all / checked in / pending), one-tap check-in checkboxes, and inline ang bao recording with amount input modal.
- **Floor Plan** — an SVG restaurant layout matching a typical banquet hall (stage, parents' tables, carpeted aisle, 12 round guest tables). Tables change colour in real time as guests check in — pale gold (empty), gold (partial), red carpet tone (full).

All three pages share state, so checking in a guest on the checklist immediately updates the dashboard stats and floor plan colours.

## Tech Stack

| Layer       | Choice                          |
|-------------|---------------------------------|
| Framework   | React 18                        |
| Build tool  | Vite 6                          |
| Styling     | Vanilla CSS with CSS custom properties |
| Fonts       | Cormorant Garamond + DM Sans (Google Fonts) |
| Floor plan  | Inline SVG (no image dependencies) |

No external UI library, no state management library, no backend. The app is entirely client-side.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install and Run

```bash
# Clone or unzip the project
cd wedding-reception-app

# Install dependencies
npm install

# Start dev server (opens http://localhost:3000)
npm run dev
```

### Build for Production

```bash
npm run build
# Output in dist/ — deploy to any static host (Vercel, Netlify, S3, etc.)
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

None required. This is a fully client-side app with no API keys or external services.

## Customising for Your Event

Edit these files in `src/data/`:

| File         | What to change |
|--------------|----------------|
| `config.js`  | Couple name, date, venue, currency |
| `tables.js`  | Table count, names, capacity, labels |
| `guests.js`  | Full guest list with table assignments |

The floor plan layout in `src/components/FloorPlanSVG.jsx` has table positions defined in the `TABLE_POSITIONS` object — adjust coordinates if your venue layout differs.

## Project Structure

```
wedding-reception-app/
├── index.html                  # Vite entry HTML
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx                # React root mount
│   ├── App.jsx                 # Tab routing + state wiring
│   ├── components/
│   │   ├── AngBaoModal.jsx     # Ang bao amount input modal
│   │   ├── FloorPlanSVG.jsx    # Interactive SVG floor plan
│   │   ├── Icons.jsx           # Shared SVG icon components
│   │   └── TopBar.jsx          # Header with couple name + clock
│   ├── data/
│   │   ├── config.js           # Wedding event configuration
│   │   ├── guests.js           # Guest list seed data
│   │   └── tables.js           # Table definitions
│   ├── hooks/
│   │   └── useGuests.js        # Central state hook
│   ├── pages/
│   │   ├── ChecklistPage.jsx   # Guest checklist with search/filter
│   │   ├── DashboardPage.jsx   # Stats + occupancy grid
│   │   └── FloorPlanPage.jsx   # SVG floor plan wrapper
│   └── styles/
│       └── index.css           # Global stylesheet
├── CLAUDE.md                   # Claude Code project instructions
├── TODO.md                     # Planned features + next steps
└── README.md                   # This file
```

## License

Private project — not currently published under an open-source license.

import { useState } from 'react';

/**
 * Interactive SVG floor plan that reflects real-time check-in data.
 *
 * Layout mirrors the venue's official table plan (assets/Table Layout.png):
 *   - LED screen, VIP table and the centre aisle anchor the composition
 *   - Tables 1-9/R and 10-18/13A in two columns left of the aisle
 *   - Tables 19-25, 26-30/33A, and 31-33 to the right
 *   - The carpeted aisle runs from just below the VIP table to the entrance
 */

// Table centre positions (SVG coordinate space, viewBox 0 0 1090 1650).
// Row slots are 130px apart — well above the ~115px needed to clear all
// seat chairs (radius 34 table + 50 seat orbit + 7.5 seat radius) between
// any two adjacent tables in the same column.
const ROWS = [300, 430, 560, 690, 820, 950, 1080, 1210, 1340, 1470];
const AISLE_X = 470;
// VIP sits above row 0, closer to the LED screen, on its own larger table.
const VIP_Y = 230;

const TABLE_POSITIONS = {
  // Column 1 — left outer
  1:    { x: 130, y: ROWS[0] },
  2:    { x: 130, y: ROWS[1] },
  3:    { x: 130, y: ROWS[2] },
  '3A': { x: 130, y: ROWS[3] },
  5:    { x: 130, y: ROWS[4] },
  6:    { x: 130, y: ROWS[5] },
  7:    { x: 130, y: ROWS[6] },
  8:    { x: 130, y: ROWS[7] },
  9:    { x: 130, y: ROWS[8] },
  R:    { x: 130, y: ROWS[9] },

  // Column 2 — left inner
  10:   { x: 300, y: ROWS[0] },
  11:   { x: 300, y: ROWS[1] },
  12:   { x: 300, y: ROWS[2] },
  13:   { x: 300, y: ROWS[3] },
  '13A':{ x: 300, y: ROWS[4] },
  15:   { x: 300, y: ROWS[5] },
  16:   { x: 300, y: ROWS[6] },
  17:   { x: 300, y: ROWS[7] },
  18:   { x: 300, y: ROWS[8] },

  // Centre — VIP, nearer the stage
  VIP:  { x: AISLE_X, y: VIP_Y },

  // Column 4 — right inner
  19:   { x: 640, y: ROWS[0] },
  20:   { x: 640, y: ROWS[1] },
  21:   { x: 640, y: ROWS[2] },
  22:   { x: 640, y: ROWS[3] },
  23:   { x: 640, y: ROWS[4] },
  24:   { x: 640, y: ROWS[5] },
  25:   { x: 640, y: ROWS[6] },

  // Column 5 — right outer (starts one row down, then continues into 31-33)
  26:   { x: 790, y: ROWS[1] },
  27:   { x: 790, y: ROWS[2] },
  28:   { x: 790, y: ROWS[3] },
  29:   { x: 790, y: ROWS[4] },
  30:   { x: 790, y: ROWS[5] },
  31:   { x: 790, y: ROWS[6] },
  32:   { x: 790, y: ROWS[7] },
  33:   { x: 790, y: ROWS[8] },

  // Column 6 — spaced from column 5 the same as every other column gap
  '33A':{ x: 960, y: ROWS[3] },
};

const TABLE_RADIUS = 34;
const SEAT_ORBIT = 50;
// VIP is slightly larger than the standard round table.
const VIP_RADIUS = 42;
const VIP_ORBIT = 58;

function getColors(ts) {
  const isFull = ts.checkedIn === ts.guests && ts.guests > 0;
  const isPartial = ts.checkedIn > 0 && !isFull;

  if (isFull) {
    return { fill: '#A84448', stroke: '#8B3538', text: '#FDF8F0', seatOn: '#A84448', seatOnStroke: '#8B3538' };
  }
  if (isPartial) {
    return { fill: '#D4A843', stroke: '#B8860B', text: '#2C2420', seatOn: '#B8860B', seatOnStroke: '#8A6508' };
  }
  return { fill: '#F5E6C8', stroke: '#D4A843', text: '#5A4F47', seatOn: '#B8860B', seatOnStroke: '#8A6508' };
}

function seatRing(cx, cy, count, r) {
  const seats = [];
  for (let i = 0; i < count; i++) {
    const a = (Math.PI * 2 * i) / count - Math.PI / 2;
    seats.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
  }
  return seats;
}

export default function FloorPlanSVG({ tableStats }) {
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const onEnter = (e, ts) => {
    const rect = e.currentTarget.closest('svg').getBoundingClientRect();
    setTooltip(ts);
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Aisle starts just below the VIP table's seats (not behind/through it)
  // and runs down to the entrance.
  const aisleTop = VIP_Y + VIP_RADIUS + VIP_ORBIT + 20;
  const aisleBottom = 1430;

  return (
    <div style={{ position: 'relative' }}>
      {tooltip && (
        <div className="fp-tooltip" style={{ left: tooltipPos.x, top: tooltipPos.y }}>
          <strong style={{ fontSize: 13 }}>{tooltip.name}</strong><br />
          <span style={{ opacity: 0.7, fontSize: 11 }}>{tooltip.label}</span><br />
          <span style={{ color: '#D4A843', fontWeight: 600 }}>{tooltip.checkedIn} / {tooltip.guests}</span>
          <span style={{ opacity: 0.6 }}> checked in</span>
          {tooltip.checkedIn === tooltip.guests && tooltip.guests > 0 && (
            <span style={{ color: '#C4767A', marginLeft: 6 }}>FULL</span>
          )}
        </div>
      )}

      <svg viewBox="0 0 1090 1650" style={{ width: '100%', maxWidth: 900, display: 'block', margin: '0 auto' }}>
        <defs>
          <pattern id="fp-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.7" fill="#D4A843" opacity="0.12" />
          </pattern>
          <filter id="fp-sh">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2C2420" floodOpacity="0.10" />
          </filter>
          <filter id="fp-sh-lg">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#2C2420" floodOpacity="0.14" />
          </filter>
          <linearGradient id="aisle-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4767A" />
            <stop offset="50%" stopColor="#A84448" />
            <stop offset="100%" stopColor="#8B3538" />
          </linearGradient>
          <linearGradient id="stage-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EDE5D8" />
            <stop offset="100%" stopColor="#E0D6C6" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="1090" height="1650" rx="16" fill="#FDF8F0" />
        <rect width="1090" height="1650" rx="16" fill="url(#fp-dots)" />
        <rect x="16" y="16" width="1058" height="1618" rx="10" fill="none" stroke="#D4A843" strokeWidth="0.5" opacity="0.25" />

        {/* LED Screen */}
        <rect x={AISLE_X - 220} y="70" width="440" height="70" rx="8" fill="url(#stage-g)" stroke="#D4A843" strokeWidth="1" />
        <text x={AISLE_X} y="115" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fontWeight="600" fill="#5A4F47" letterSpacing="6">LED</text>

        {/* Carpeted Aisle — starts just below the VIP table, not behind it */}
        <rect x={AISLE_X - 22} y={aisleTop} width="44" height={aisleBottom - aisleTop} rx="5" fill="url(#aisle-g)" opacity="0.88" />
        <line x1={AISLE_X - 20} y1={aisleTop + 5} x2={AISLE_X - 20} y2={aisleBottom - 5} stroke="#fff" strokeWidth="0.5" opacity="0.15" />
        <line x1={AISLE_X + 20} y1={aisleTop + 5} x2={AISLE_X + 20} y2={aisleBottom - 5} stroke="#fff" strokeWidth="0.5" opacity="0.15" />
        <text textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="12" fontWeight="600" fill="#FDF8F0" letterSpacing="5.5" opacity="0.85" transform={`rotate(-90, ${AISLE_X}, ${(aisleTop + aisleBottom) / 2})`}>
          <tspan x={AISLE_X} y={(aisleTop + aisleBottom) / 2 + 4}>CARPETED AISLE</tspan>
        </text>

        {/* Service / reception table at foot of the aisle */}
        <rect x={AISLE_X - 40} y="1370" width="80" height="90" rx="4" fill="#F5EDE0" stroke="#D4A843" strokeWidth="1" opacity="0.7" />
        {[1388, 1403, 1418, 1433, 1448].map((y) => (
          <line key={y} x1={AISLE_X - 34} y1={y} x2={AISLE_X + 34} y2={y} stroke="#D4A843" strokeWidth="0.6" opacity="0.4" />
        ))}

        {/* Reserved-seat marker (dashed, unassigned) */}
        <circle cx="960" cy="605" r="24" fill="none" stroke="#5A4F47" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.3" />

        {/* Decorative flower divider */}
        <line x1="740" y1="1010" x2="860" y2="1010" stroke="#D4A843" strokeWidth="0.6" opacity="0.3" />
        <line x1="740" y1="1020" x2="860" y2="1020" stroke="#D4A843" strokeWidth="0.6" opacity="0.3" />
        {[755, 785, 815, 845].map((x) => (
          <circle key={x} cx={x} cy="1015" r="3" fill="#D4A843" opacity="0.4" />
        ))}

        {/* Structural rectangle at bottom-right */}
        <rect x="740" y="1405" width="120" height="105" rx="6" fill="none" stroke="#5A4F47" strokeWidth="1" opacity="0.18" />

        {/* Guest Tables */}
        {tableStats.map((ts) => {
          const pos = TABLE_POSITIONS[ts.id];
          if (!pos) return null;
          const c = getColors(ts);
          const isVIP = ts.id === 'VIP';
          const radius = isVIP ? VIP_RADIUS : TABLE_RADIUS;
          const orbit = isVIP ? VIP_ORBIT : SEAT_ORBIT;
          const seats = seatRing(pos.x, pos.y, ts.guests, orbit);
          const isFull = ts.checkedIn === ts.guests && ts.guests > 0;
          // Badge/number sizing scales with the table's own radius so the
          // slightly-larger VIP table keeps the same proportions as the rest.
          const badgeX = pos.x + radius * (20 / TABLE_RADIUS);
          const badgeY = pos.y - radius * (48 / TABLE_RADIUS);

          return (
            <g key={ts.id} onMouseEnter={(e) => onEnter(e, ts)} onMouseLeave={() => setTooltip(null)} style={{ cursor: 'pointer' }}>
              {seats.map((s, i) => (
                <circle key={i} cx={s.x} cy={s.y} r="7.5"
                  fill={i < ts.checkedIn ? c.seatOn : '#F5EDE0'}
                  stroke={i < ts.checkedIn ? c.seatOnStroke : '#E0D6C6'}
                  strokeWidth="1.2"
                  opacity={i < ts.checkedIn ? 1 : 0.55}
                />
              ))}
              <circle cx={pos.x} cy={pos.y} r={radius} fill={c.fill} stroke={c.stroke} strokeWidth="2.2" filter="url(#fp-sh-lg)" />
              {isFull && <circle cx={pos.x} cy={pos.y} r={radius + 4} fill="none" stroke="#A84448" strokeWidth="1" opacity="0.15" />}
              <text x={pos.x} y={pos.y - 5} textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="700" fill={c.text} letterSpacing="0.8">TABLE</text>
              <text x={pos.x} y={pos.y + 13} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize={isVIP ? 20 : 18} fontWeight="700" fill={c.text}>{ts.id}</text>
              <rect x={badgeX} y={badgeY} width={32} height={18} rx={9} fill={isFull ? '#A84448' : ts.checkedIn > 0 ? '#B8860B' : '#E8DFD0'} />
              <text x={badgeX + 16} y={badgeY + 12} textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="700" fill={isFull || ts.checkedIn > 0 ? '#fff' : '#5A4F47'}>{ts.checkedIn}/{ts.guests}</text>
            </g>
          );
        })}

        {/* Entrance */}
        <text x={AISLE_X} y="1600" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="600" fill="#5A4F47" letterSpacing="4" opacity="0.4">ENTRANCE</text>
        <path d={`M${AISLE_X - 8} 1585 L${AISLE_X} 1578 L${AISLE_X + 8} 1585`} stroke="#5A4F47" strokeWidth="1.5" fill="none" opacity="0.3" />
      </svg>
    </div>
  );
}

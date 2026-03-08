import { useState } from 'react';

/**
 * Interactive SVG floor plan that reflects real-time check-in data.
 *
 * Layout mirrors a typical Chinese restaurant banquet hall:
 *   - Stage at top with Groom's / Bride's Parents Tables
 *   - Red carpeted aisle down the centre
 *   - Tables 1-6 on the right, Tables 7-12 on the left (staggered)
 */

// Table centre positions (SVG coordinate space, viewBox 0 0 800 1020)
// Columns are 160px apart (x), rows 160px apart (y), stagger 80px — giving
// a minimum centre-to-centre distance of √(160²+80²) ≈ 179px between any
// two adjacent tables (well above the 115px needed to clear all seat chairs).
const TABLE_POSITIONS = {
  1:  { x: 510, y: 360 },  // right inner, row 1
  2:  { x: 670, y: 440 },  // right outer, row 1
  3:  { x: 510, y: 520 },  // right inner, row 2
  4:  { x: 670, y: 600 },  // right outer, row 2
  5:  { x: 510, y: 680 },  // right inner, row 3
  6:  { x: 670, y: 760 },  // right outer, row 3
  7:  { x: 290, y: 360 },  // left inner, row 1
  8:  { x: 130, y: 440 },  // left outer, row 1
  9:  { x: 290, y: 520 },  // left inner, row 2
  10: { x: 130, y: 600 },  // left outer, row 2
  11: { x: 290, y: 680 },  // left inner, row 3
  12: { x: 130, y: 760 },  // left outer, row 3
};

const TABLE_RADIUS = 34;
const SEAT_ORBIT = 50;

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

      <svg viewBox="0 0 800 1020" style={{ width: '100%', maxWidth: 820, display: 'block', margin: '0 auto' }}>
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
        <rect width="800" height="1020" rx="16" fill="#FDF8F0" />
        <rect width="800" height="1020" rx="16" fill="url(#fp-dots)" />
        <rect x="16" y="16" width="768" height="988" rx="10" fill="none" stroke="#D4A843" strokeWidth="0.5" opacity="0.25" />

        {/* Stage */}
        <rect x="180" y="118" width="440" height="62" rx="8" fill="url(#stage-g)" stroke="#D4A843" strokeWidth="1" />
        <text x="400" y="155" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="20" fontWeight="600" fill="#5A4F47" letterSpacing="5">STAGE</text>

        {/* Groom's Parents Table */}
        <rect x="178" y="198" width="120" height="44" rx="8" fill="#F5EDE0" stroke="#D4A843" strokeWidth="1" filter="url(#fp-sh)" />
        <text x="238" y="217" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="600" fill="#5A4F47">Groom&apos;s Parents</text>
        <text x="238" y="230" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="8" fill="#5A4F47" opacity="0.5">Table</text>

        {/* Bride's Parents Table */}
        <rect x="502" y="198" width="120" height="44" rx="8" fill="#F5EDE0" stroke="#D4A843" strokeWidth="1" filter="url(#fp-sh)" />
        <text x="562" y="217" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="600" fill="#5A4F47">Bride&apos;s Parents</text>
        <text x="562" y="230" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="8" fill="#5A4F47" opacity="0.5">Table</text>

        {/* Carpeted Aisle */}
        <rect x="378" y="310" width="44" height="650" rx="5" fill="url(#aisle-g)" opacity="0.88" />
        <line x1="380" y1="315" x2="380" y2="955" stroke="#fff" strokeWidth="0.5" opacity="0.15" />
        <line x1="420" y1="315" x2="420" y2="955" stroke="#fff" strokeWidth="0.5" opacity="0.15" />
        <text textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="11.5" fontWeight="600" fill="#FDF8F0" letterSpacing="5.5" opacity="0.85" transform="rotate(-90, 400, 635)">
          <tspan x="400" y="639">CARPETED AISLE</tspan>
        </text>

        {/* Sound Booth */}
        <text x="42" y="368" fontFamily="DM Sans, sans-serif" fontSize="8" fill="#5A4F47" opacity="0.3" fontWeight="600" letterSpacing="1.2">SOUND</text>
        <text x="42" y="379" fontFamily="DM Sans, sans-serif" fontSize="8" fill="#5A4F47" opacity="0.3" fontWeight="600" letterSpacing="1.2">BOOTH</text>
        <rect x="36" y="356" width="52" height="30" rx="4" fill="none" stroke="#5A4F47" strokeWidth="0.5" opacity="0.15" />

        {/* Guest Tables */}
        {tableStats.map((ts) => {
          const pos = TABLE_POSITIONS[ts.id];
          if (!pos) return null;
          const c = getColors(ts);
          const seats = seatRing(pos.x, pos.y, ts.guests, SEAT_ORBIT);
          const isFull = ts.checkedIn === ts.guests && ts.guests > 0;

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
              <circle cx={pos.x} cy={pos.y} r={TABLE_RADIUS} fill={c.fill} stroke={c.stroke} strokeWidth="2.2" filter="url(#fp-sh-lg)" />
              {isFull && <circle cx={pos.x} cy={pos.y} r={TABLE_RADIUS + 4} fill="none" stroke="#A84448" strokeWidth="1" opacity="0.15" />}
              <text x={pos.x} y={pos.y - 5} textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="700" fill={c.text} letterSpacing="0.8">TABLE</text>
              <text x={pos.x} y={pos.y + 13} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="20" fontWeight="700" fill={c.text}>{ts.id}</text>
              <rect x={pos.x + 20} y={pos.y - 48} width={32} height={18} rx={9} fill={isFull ? '#A84448' : ts.checkedIn > 0 ? '#B8860B' : '#E8DFD0'} />
              <text x={pos.x + 36} y={pos.y - 36} textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="700" fill={isFull || ts.checkedIn > 0 ? '#fff' : '#5A4F47'}>{ts.checkedIn}/{ts.guests}</text>
            </g>
          );
        })}

        {/* Entrance */}
        <text x="400" y="1000" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="600" fill="#5A4F47" letterSpacing="4" opacity="0.4">ENTRANCE</text>
        <path d="M392 985 L400 978 L408 985" stroke="#5A4F47" strokeWidth="1.5" fill="none" opacity="0.3" />
      </svg>
    </div>
  );
}

import FloorPlanSVG from '../components/FloorPlanSVG';

export default function FloorPlanPage({ tableStats }) {
  return (
    <div className="floorplan-page">
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 12 }}>
        Restaurant Floor Plan — Live View
      </h2>
      <p style={{ fontSize: 13, color: '#5A4F47', opacity: 0.6, marginBottom: 20, textAlign: 'center' }}>
        Hover over a table to see details. Check in guests on the Guest Checklist tab.
      </p>

      <div className="floorplan-legend">
        <div className="legend-item">
          <div className="legend-swatch" style={{ background: '#A84448', borderColor: '#8B3538' }} />
          <span>Full — all checked in</span>
        </div>
        <div className="legend-item">
          <div className="legend-swatch" style={{ background: '#D4A843', borderColor: '#B8860B' }} />
          <span>Partial arrival</span>
        </div>
        <div className="legend-item">
          <div className="legend-swatch" style={{ background: '#F5E6C8', borderColor: '#D4A843' }} />
          <span>No arrivals yet</span>
        </div>
      </div>

      <div className="floorplan-svg-wrap">
        <FloorPlanSVG tableStats={tableStats} />
      </div>
    </div>
  );
}

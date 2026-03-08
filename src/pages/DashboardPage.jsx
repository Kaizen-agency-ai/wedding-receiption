import TABLES from '../data/tables';
import WEDDING_CONFIG from '../data/config';

const formatCurrency = (n) =>
  n.toLocaleString(WEDDING_CONFIG.locale, {
    style: 'currency',
    currency: WEDDING_CONFIG.currency,
    minimumFractionDigits: 0,
  });

export default function DashboardPage({ stats }) {
  return (
    <div className="page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <img src="/hero.jpeg" alt="Steven & Candy" className="hero-img" />
        <div className="hero-overlay" />
        <div className="hero-text">
          <span className="hero-label">感谢您的祝福与回覆，期待与您相见</span>
          <h2 className="hero-names">Steven &amp; Candy — 志健 &amp; 姿吟</h2>
          <span className="hero-date">25 · 10 · 2026</span>
        </div>
      </div>

      {/* Attendance Bar */}
      <div className="att-bar-wrap">
        <div className="att-bar-header">
          <span className="att-bar-title">
            Overall Attendance
            <span className="zh-sub">整体出席率</span>
          </span>
          <span className="att-bar-pct">{stats.pct}%</span>
        </div>
        <div className="att-bar-track">
          <div className="att-bar-fill" style={{ width: `${stats.pct}%` }} />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stats-row">
        <div className="stat-card gold">
          <span className="stat-label">Guests Arrived<span className="zh-sub">宾客已到</span></span>
          <span className="stat-value">{stats.checkedIn}</span>
          <span className="stat-sub">of {stats.total} expected</span>
        </div>
        <div className="stat-card sage">
          <span className="stat-label">Tables Full<span className="zh-sub">满座桌数</span></span>
          <span className="stat-value">{stats.fullTables}</span>
          <span className="stat-sub">of {TABLES.length} tables</span>
        </div>
        <div className="stat-card rose">
          <span className="stat-label">Ang Bao Received<span className="zh-sub">红包收到</span></span>
          <span className="stat-value">{stats.angBaoCount}</span>
          <span className="stat-sub">{formatCurrency(stats.angBaoTotal)} total</span>
        </div>
        <div className="stat-card charcoal">
          <span className="stat-label">Pending Guests<span className="zh-sub">待到宾客</span></span>
          <span className="stat-value">{stats.total - stats.checkedIn}</span>
          <span className="stat-sub">not yet checked in</span>
        </div>
      </div>

      {/* Live Occupancy Grid */}
      <h2 className="section-title">
        Seating Plan — Live Occupancy
        <span className="zh-sub">座位表 — 实时入座情况</span>
      </h2>
      <div className="floor-plan">
        {stats.tableStats.map((t) => {
          const status =
            t.checkedIn === 0
              ? 'empty'
              : t.checkedIn === t.guests
                ? 'full'
                : 'partial';
          return (
            <div key={t.id} className={`table-card ${status}`}>
              <div className="table-card-header">
                <span className="table-num">{t.name}</span>
                <span className={`table-badge ${status === 'empty' ? 'empty-badge' : status}`}>
                  {status === 'full' ? 'Full' : status === 'partial' ? 'Partial' : 'Empty'}
                </span>
              </div>
              <div className="table-label">{t.label}</div>
              <div className="table-seats">
                {Array.from({ length: t.guests }).map((_, i) => (
                  <div key={i} className={`seat-dot ${i < t.checkedIn ? 'filled' : ''}`} />
                ))}
              </div>
              <div className="table-count">
                {t.checkedIn} / {t.guests} seated
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

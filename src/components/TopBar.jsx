import { useState, useEffect, useRef } from 'react';
import { RingsIcon } from './Icons';
import WEDDING_CONFIG from '../data/config';

export default function TopBar({ onExportCSV, onResetData }) {
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Close the menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  const formatTime = (d) =>
    d.toLocaleTimeString(WEDDING_CONFIG.locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  return (
    <div className="topbar">
      <div className="topbar-brand">
        <RingsIcon />
        <div>
          <h1>WEDDING RECEPTION</h1>
          <div className="topbar-couple">
            {WEDDING_CONFIG.coupleName} — {WEDDING_CONFIG.date}
          </div>
        </div>
      </div>

      <div className="topbar-right">
        <span className="topbar-time">{formatTime(time)}</span>

        {/* Mobile-only overflow menu for Export CSV / Reset Data,
            which .nav-actions hides on small screens */}
        <div className="topbar-menu" ref={menuRef}>
          <button
            className="topbar-menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="More actions"
            aria-expanded={menuOpen}
          >
            ⋮
          </button>
          {menuOpen && (
            <div className="topbar-menu-dropdown">
              <button
                className="topbar-menu-item"
                onClick={() => { setMenuOpen(false); onExportCSV(); }}
              >
                ↓ Export CSV
              </button>
              <button
                className="topbar-menu-item danger"
                onClick={() => { setMenuOpen(false); onResetData(); }}
              >
                Reset Data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

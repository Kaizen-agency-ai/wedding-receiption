import { useState, useEffect } from 'react';
import { RingsIcon } from './Icons';
import WEDDING_CONFIG from '../data/config';

export default function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

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
      <span className="topbar-time">{formatTime(time)}</span>
    </div>
  );
}

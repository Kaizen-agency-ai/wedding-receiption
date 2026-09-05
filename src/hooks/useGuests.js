import { useState, useMemo, useEffect } from 'react';
import INITIAL_TABLES from '../data/tables';
import INITIAL_GUESTS from '../data/guests';

const STORAGE_KEY = 'wedding_guests_v2';
const TABLES_STORAGE_KEY = 'wedding_tables_v1';

/**
 * Central state hook for all guest and table operations.
 * Persists to localStorage automatically.
 */
export default function useGuests() {
  const [guests, setGuests] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_GUESTS;
  });

  const [tables, setTables] = useState(() => {
    try {
      const saved = localStorage.getItem(TABLES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_TABLES;
  });

  // Auto-persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem(TABLES_STORAGE_KEY, JSON.stringify(tables));
  }, [tables]);

  // ── Mutations ──

  const toggleCheckIn = (id) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, checkedIn: !g.checkedIn } : g))
    );
  };

  const setAngBao = (id, amount) => {
    const amt = parseFloat(amount) || 0;
    setGuests((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, angBao: amt > 0, angBaoAmt: amt > 0 ? amt : null }
          : g
      )
    );
  };

  const addWalkIn = (name, tableId) => {
    const newId = Date.now();
    setGuests((prev) => [
      ...prev,
      {
        id: newId,
        name: name.trim(),
        table: tableId,
        checkedIn: false,
        angBao: false,
        angBaoAmt: null,
        walkIn: true,
      },
    ]);
  };

  const renameGuest = (id, newName) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, name: newName } : g))
    );
  };

  const moveGuest = (id, newTableId) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, table: newTableId } : g))
    );
  };

  const renameTable = (id, newLabel) => {
    setTables((prev) =>
      prev.map((t) => (t.id === id ? { ...t, label: newLabel } : t))
    );
  };

  const resetGuests = () => {
    setGuests(INITIAL_GUESTS);
    // Also reset the table list — otherwise a table layout saved to
    // localStorage from a previous version of tables.js (e.g. before a
    // seating-chart update) stays stuck forever and no longer matches the
    // guests we just regenerated from the current TABLES.
    setTables(INITIAL_TABLES);
  };

  // ── Derived Stats ──

  const stats = useMemo(() => {
    const total = guests.length;
    const checkedIn = guests.filter((g) => g.checkedIn).length;
    const pct = total ? Math.round((checkedIn / total) * 100) : 0;
    const angBaoCount = guests.filter((g) => g.angBao).length;
    const angBaoTotal = guests.reduce((s, g) => s + (g.angBaoAmt || 0), 0);

    const tableStats = tables.map((t) => {
      const tGuests = guests.filter((g) => g.table === t.id);
      const tChecked = tGuests.filter((g) => g.checkedIn).length;
      return { ...t, guests: tGuests.length, checkedIn: tChecked };
    });

    const fullTables = tableStats.filter(
      (t) => t.checkedIn === t.guests && t.guests > 0
    ).length;

    return { total, checkedIn, pct, angBaoCount, angBaoTotal, tableStats, fullTables };
  }, [guests, tables]);

  return { guests, stats, tables, toggleCheckIn, setAngBao, addWalkIn, renameGuest, moveGuest, resetGuests, renameTable };
}

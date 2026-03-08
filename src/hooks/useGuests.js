import { useState, useMemo, useEffect } from 'react';
import TABLES from '../data/tables';
import INITIAL_GUESTS from '../data/guests';

const STORAGE_KEY = 'wedding_guests_v2';

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

  // Auto-persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
  }, [guests]);

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

  const resetGuests = () => {
    setGuests(INITIAL_GUESTS);
  };

  // ── Derived Stats ──

  const stats = useMemo(() => {
    const total = guests.length;
    const checkedIn = guests.filter((g) => g.checkedIn).length;
    const pct = total ? Math.round((checkedIn / total) * 100) : 0;
    const angBaoCount = guests.filter((g) => g.angBao).length;
    const angBaoTotal = guests.reduce((s, g) => s + (g.angBaoAmt || 0), 0);

    const tableStats = TABLES.map((t) => {
      const tGuests = guests.filter((g) => g.table === t.id);
      const tChecked = tGuests.filter((g) => g.checkedIn).length;
      return { ...t, guests: tGuests.length, checkedIn: tChecked };
    });

    const fullTables = tableStats.filter(
      (t) => t.checkedIn === t.guests && t.guests > 0
    ).length;

    return { total, checkedIn, pct, angBaoCount, angBaoTotal, tableStats, fullTables };
  }, [guests]);

  return { guests, stats, toggleCheckIn, setAngBao, addWalkIn, renameGuest, moveGuest, resetGuests };
}

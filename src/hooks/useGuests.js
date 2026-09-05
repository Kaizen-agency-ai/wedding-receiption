import { useState, useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * Central state hook for all guest and table operations.
 *
 * Backed by Supabase (Postgres + Realtime) instead of localStorage: every
 * mutation writes straight to the database, and a realtime subscription on
 * both tables pushes every INSERT/UPDATE/DELETE — including the writer's
 * own — back down to all connected clients within milliseconds. There is
 * no local optimistic state; the UI always reflects what's actually in the
 * database, so every device agrees.
 */

// DB rows use snake_case; the rest of the app expects the camelCase shape
// the original localStorage version used, so map at the boundary.
const mapGuest = (row) => ({
  id: row.id,
  name: row.name,
  table: row.table_id,
  checkedIn: row.checked_in,
  angBao: row.ang_bao,
  angBaoAmt: row.ang_bao_amt,
  walkIn: row.walk_in,
});

const mapTable = (row) => ({
  id: row.id,
  name: row.name,
  capacity: row.capacity,
  label: row.label,
});

export default function useGuests() {
  const [guests, setGuests] = useState([]);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Initial fetch + realtime subscription ──
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [{ data: tableRows, error: tErr }, { data: guestRows, error: gErr }] = await Promise.all([
        supabase.from('tables').select('*').order('sort_order', { ascending: true }),
        supabase.from('guests').select('*').order('id', { ascending: true }),
      ]);
      if (cancelled) return;
      if (tErr) console.error('Failed to load tables:', tErr);
      if (gErr) console.error('Failed to load guests:', gErr);
      setTables((tableRows ?? []).map(mapTable));
      setGuests((guestRows ?? []).map(mapGuest));
      setLoading(false);
    }
    load();

    const channel = supabase
      .channel('db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'guests' }, (payload) => {
        setGuests((prev) => {
          if (payload.eventType === 'INSERT') {
            if (prev.some((g) => g.id === payload.new.id)) return prev; // already present
            return [...prev, mapGuest(payload.new)];
          }
          if (payload.eventType === 'UPDATE') {
            return prev.map((g) => (g.id === payload.new.id ? mapGuest(payload.new) : g));
          }
          if (payload.eventType === 'DELETE') {
            return prev.filter((g) => g.id !== payload.old.id);
          }
          return prev;
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tables' }, (payload) => {
        setTables((prev) => {
          if (payload.eventType === 'INSERT') {
            if (prev.some((t) => t.id === payload.new.id)) return prev;
            return [...prev, mapTable(payload.new)];
          }
          if (payload.eventType === 'UPDATE') {
            return prev.map((t) => (t.id === payload.new.id ? mapTable(payload.new) : t));
          }
          if (payload.eventType === 'DELETE') {
            return prev.filter((t) => t.id !== payload.old.id);
          }
          return prev;
        });
      })
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  // ── Mutations ──
  // Each of these only writes to Supabase — local state updates arrive via
  // the realtime subscription above, on this device and every other one.

  const toggleCheckIn = async (id) => {
    const guest = guests.find((g) => g.id === id);
    if (!guest) return;
    const { error } = await supabase
      .from('guests')
      .update({ checked_in: !guest.checkedIn })
      .eq('id', id);
    if (error) console.error('toggleCheckIn failed:', error);
  };

  const setAngBao = async (id, amount) => {
    const amt = parseFloat(amount) || 0;
    const { error } = await supabase
      .from('guests')
      .update({ ang_bao: amt > 0, ang_bao_amt: amt > 0 ? amt : null })
      .eq('id', id);
    if (error) console.error('setAngBao failed:', error);
  };

  const addWalkIn = async (name, tableId) => {
    const { error } = await supabase
      .from('guests')
      .insert({ name: name.trim(), table_id: tableId, walk_in: true });
    if (error) console.error('addWalkIn failed:', error);
  };

  const renameGuest = async (id, newName) => {
    const { error } = await supabase.from('guests').update({ name: newName }).eq('id', id);
    if (error) console.error('renameGuest failed:', error);
  };

  const moveGuest = async (id, newTableId) => {
    const { error } = await supabase.from('guests').update({ table_id: newTableId }).eq('id', id);
    if (error) console.error('moveGuest failed:', error);
  };

  const renameTable = async (id, newLabel) => {
    const { error } = await supabase.from('tables').update({ label: newLabel }).eq('id', id);
    if (error) console.error('renameTable failed:', error);
  };

  const resetGuests = async () => {
    // Remove walk-ins entirely (they didn't exist in the original seed) and
    // blank out the rest — same "back to a clean slate" behaviour as before,
    // just as two SQL statements instead of a full table re-seed.
    const [{ error: delErr }, { error: updErr }] = await Promise.all([
      supabase.from('guests').delete().eq('walk_in', true),
      supabase
        .from('guests')
        .update({ name: '', checked_in: false, ang_bao: false, ang_bao_amt: null })
        .eq('walk_in', false),
    ]);
    if (delErr) console.error('resetGuests (delete walk-ins) failed:', delErr);
    if (updErr) console.error('resetGuests (reset seats) failed:', updErr);
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

  return { guests, stats, tables, loading, toggleCheckIn, setAngBao, addWalkIn, renameGuest, moveGuest, resetGuests, renameTable };
}

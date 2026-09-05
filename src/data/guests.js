import TABLES from './tables';

/**
 * NOT USED AT RUNTIME. Guest data now lives in Supabase and syncs across
 * devices in real time (see src/hooks/useGuests.js). This file is kept only
 * because it's what supabase_migration.sql's seed data was generated from —
 * it is not imported by the app anymore.
 *
 * Initial guest list for the wedding reception.
 *
 * Each guest record:
 *   id        – unique identifier
 *   name      – display name (empty = placeholder, user fills in)
 *   table     – foreign key to TABLES[].id
 *   checkedIn – arrival status (toggled via the Guest Checklist page)
 *   angBao    – whether an ang bao was received
 *   angBaoAmt – recorded amount in SGD (null if not yet recorded)
 *
 * Generated from TABLES (one placeholder guest per seat) rather than
 * hand-listed — the venue's 42-table layout puts 420 seats in play, and a
 * loop keeps that in sync with tables.js instead of drifting out of it.
 */
let nextId = 1;
const GUESTS = TABLES.flatMap((t) =>
  Array.from({ length: t.capacity }, () => ({
    id: nextId++,
    name: '',
    table: t.id,
    checkedIn: false,
    angBao: false,
    angBaoAmt: null,
  }))
);

export default GUESTS;

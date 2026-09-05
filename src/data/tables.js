/**
 * NOT USED AT RUNTIME. The app now reads/writes tables live from Supabase
 * (see src/hooks/useGuests.js) so every device stays in sync in real time.
 * This file is kept only as a human-readable reference for the table
 * layout — it's what supabase_migration.sql's seed data was generated
 * from. To add/rename/remove a table for real, edit it in Supabase
 * (SQL Editor or Table Editor), not here.
 *
 * Table configuration for the wedding reception.
 * Each table has an id, display name, seat capacity, and descriptive label.
 *
 * IDs follow the venue's official table layout (see assets/Table Layout.png):
 * numbers skip 4 and 14 (considered unlucky), 'R' is the venue reserve/overflow
 * table, and 'VIP' is the single head table by the aisle. VIP is listed first
 * and Reserve last so both the Dashboard and Guest Checklist surface them at
 * the top and bottom of the table list.
 *
 * The `id` must be unique and is used as the foreign key in the guest list.
 */
const TABLES = [
  { id: 'VIP', name: 'VIP Table',  capacity: 10, label: 'VIP' },

  { id: 1,     name: 'Table 1',    capacity: 10, label: '' },
  { id: 2,     name: 'Table 2',    capacity: 10, label: '' },
  { id: 3,     name: 'Table 3',    capacity: 10, label: '' },
  { id: '3A',  name: 'Table 3A',   capacity: 10, label: '' },
  { id: 5,     name: 'Table 5',    capacity: 10, label: '' },
  { id: 6,     name: 'Table 6',    capacity: 10, label: '' },
  { id: 7,     name: 'Table 7',    capacity: 10, label: '' },
  { id: 8,     name: 'Table 8',    capacity: 10, label: '' },
  { id: 9,     name: 'Table 9',    capacity: 10, label: '' },

  { id: 10,    name: 'Table 10',   capacity: 10, label: '' },
  { id: 11,    name: 'Table 11',   capacity: 10, label: '' },
  { id: 12,    name: 'Table 12',   capacity: 10, label: '' },
  { id: 13,    name: 'Table 13',   capacity: 10, label: '' },
  { id: '13A', name: 'Table 13A',  capacity: 10, label: '' },
  { id: 15,    name: 'Table 15',   capacity: 10, label: '' },
  { id: 16,    name: 'Table 16',   capacity: 10, label: '' },
  { id: 17,    name: 'Table 17',   capacity: 10, label: '' },
  { id: 18,    name: 'Table 18',   capacity: 10, label: '' },

  { id: 19,    name: 'Table 19',   capacity: 10, label: '' },
  { id: 20,    name: 'Table 20',   capacity: 10, label: '' },
  { id: 21,    name: 'Table 21',   capacity: 10, label: '' },
  { id: 22,    name: 'Table 22',   capacity: 10, label: '' },
  { id: 23,    name: 'Table 23',   capacity: 10, label: '' },
  { id: 24,    name: 'Table 24',   capacity: 10, label: '' },
  { id: 25,    name: 'Table 25',   capacity: 10, label: '' },

  { id: 26,    name: 'Table 26',   capacity: 10, label: '' },
  { id: 27,    name: 'Table 27',   capacity: 10, label: '' },
  { id: 28,    name: 'Table 28',   capacity: 10, label: '' },
  { id: 29,    name: 'Table 29',   capacity: 10, label: '' },
  { id: 30,    name: 'Table 30',   capacity: 10, label: '' },

  { id: 31,    name: 'Table 31',   capacity: 10, label: '' },
  { id: 32,    name: 'Table 32',   capacity: 10, label: '' },
  { id: 33,    name: 'Table 33',   capacity: 10, label: '' },
  { id: '33A', name: 'Table 33A',  capacity: 10, label: '' },

  { id: 'R',   name: 'Reserve',    capacity: 10, label: 'Reserve Table' },
];

export default TABLES;

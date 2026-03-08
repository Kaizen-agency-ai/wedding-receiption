/**
 * Table configuration for the wedding reception.
 * Each table has an id, display name, seat capacity, and descriptive label.
 *
 * To customise for your event, edit the entries below.
 * The `id` must be unique and is used as the foreign key in the guest list.
 */
const TABLES = [
  { id: 1,  name: 'Table 1',  capacity: 10, label: "VIP - Bride's Family" },
  { id: 2,  name: 'Table 2',  capacity: 10, label: "VIP - Groom's Family" },
  { id: 3,  name: 'Table 3',  capacity: 10, label: 'Relatives - Bride' },
  { id: 4,  name: 'Table 4',  capacity: 10, label: 'Relatives - Groom' },
  { id: 5,  name: 'Table 5',  capacity: 10, label: 'University Friends' },
  { id: 6,  name: 'Table 6',  capacity: 10, label: 'Work Colleagues' },
  { id: 7,  name: 'Table 7',  capacity: 10, label: 'School Friends' },
  { id: 8,  name: 'Table 8',  capacity: 10, label: 'Neighbours & Family Friends' },
  { id: 9,  name: 'Table 9',  capacity: 10, label: 'Extended Family' },
  { id: 10, name: 'Table 10', capacity: 10, label: "Couple's Close Friends" },
  { id: 11, name: 'Table 11', capacity: 10, label: 'Overseas Guests' },
  { id: 12, name: 'Table 12', capacity: 10, label: "Parents' Colleagues" },
];

export default TABLES;

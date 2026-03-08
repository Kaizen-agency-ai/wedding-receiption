/**
 * Initial guest list for the wedding reception.
 *
 * Each guest record:
 *   id        – unique identifier
 *   name      – display name (empty = placeholder, user fills in)
 *   table     – foreign key to TABLES[].id
 *   checkedIn – arrival status (toggled via the Guest Checklist page)
 *   angBao    – whether an ang bao was received
 *   angBaoAmt – recorded amount in SGD (null if not yet recorded)
 */
const GUESTS = [
  // Table 1 — VIP Bride's Family
  { id: 1,  name: '', table: 1, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 2,  name: '', table: 1, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 3,  name: '', table: 1, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 4,  name: '', table: 1, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 5,  name: '', table: 1, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 6,  name: '', table: 1, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 7,  name: '', table: 1, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 8,  name: '', table: 1, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 9,  name: '', table: 1, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 10, name: '', table: 1, checkedIn: false, angBao: false, angBaoAmt: null },

  // Table 2 — VIP Groom's Family
  { id: 11, name: '', table: 2, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 12, name: '', table: 2, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 13, name: '', table: 2, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 14, name: '', table: 2, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 15, name: '', table: 2, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 16, name: '', table: 2, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 17, name: '', table: 2, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 18, name: '', table: 2, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 19, name: '', table: 2, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 20, name: '', table: 2, checkedIn: false, angBao: false, angBaoAmt: null },

  // Table 3 — Relatives Bride
  { id: 21, name: '', table: 3, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 22, name: '', table: 3, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 23, name: '', table: 3, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 24, name: '', table: 3, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 25, name: '', table: 3, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 26, name: '', table: 3, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 27, name: '', table: 3, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 28, name: '', table: 3, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 29, name: '', table: 3, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 30, name: '', table: 3, checkedIn: false, angBao: false, angBaoAmt: null },

  // Table 4 — Relatives Groom
  { id: 31, name: '', table: 4, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 32, name: '', table: 4, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 33, name: '', table: 4, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 34, name: '', table: 4, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 35, name: '', table: 4, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 36, name: '', table: 4, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 37, name: '', table: 4, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 38, name: '', table: 4, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 39, name: '', table: 4, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 40, name: '', table: 4, checkedIn: false, angBao: false, angBaoAmt: null },

  // Table 5 — University Friends
  { id: 41, name: '', table: 5, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 42, name: '', table: 5, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 43, name: '', table: 5, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 44, name: '', table: 5, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 45, name: '', table: 5, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 46, name: '', table: 5, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 47, name: '', table: 5, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 48, name: '', table: 5, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 49, name: '', table: 5, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 50, name: '', table: 5, checkedIn: false, angBao: false, angBaoAmt: null },

  // Table 6 — Work Colleagues
  { id: 51, name: '', table: 6, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 52, name: '', table: 6, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 53, name: '', table: 6, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 54, name: '', table: 6, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 55, name: '', table: 6, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 56, name: '', table: 6, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 57, name: '', table: 6, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 58, name: '', table: 6, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 59, name: '', table: 6, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 60, name: '', table: 6, checkedIn: false, angBao: false, angBaoAmt: null },

  // Table 7 — School Friends
  { id: 61, name: '', table: 7, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 62, name: '', table: 7, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 63, name: '', table: 7, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 64, name: '', table: 7, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 65, name: '', table: 7, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 66, name: '', table: 7, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 67, name: '', table: 7, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 68, name: '', table: 7, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 69, name: '', table: 7, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 70, name: '', table: 7, checkedIn: false, angBao: false, angBaoAmt: null },

  // Table 8 — Neighbours & Family Friends
  { id: 71, name: '', table: 8, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 72, name: '', table: 8, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 73, name: '', table: 8, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 74, name: '', table: 8, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 75, name: '', table: 8, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 76, name: '', table: 8, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 77, name: '', table: 8, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 78, name: '', table: 8, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 79, name: '', table: 8, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 80, name: '', table: 8, checkedIn: false, angBao: false, angBaoAmt: null },

  // Table 9 — Extended Family
  { id: 81, name: '', table: 9, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 82, name: '', table: 9, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 83, name: '', table: 9, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 84, name: '', table: 9, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 85, name: '', table: 9, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 86, name: '', table: 9, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 87, name: '', table: 9, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 88, name: '', table: 9, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 89, name: '', table: 9, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 90, name: '', table: 9, checkedIn: false, angBao: false, angBaoAmt: null },

  // Table 10 — Couple's Close Friends
  { id: 91,  name: '', table: 10, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 92,  name: '', table: 10, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 93,  name: '', table: 10, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 94,  name: '', table: 10, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 95,  name: '', table: 10, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 96,  name: '', table: 10, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 97,  name: '', table: 10, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 98,  name: '', table: 10, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 99,  name: '', table: 10, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 100, name: '', table: 10, checkedIn: false, angBao: false, angBaoAmt: null },

  // Table 11 — Overseas Guests
  { id: 101, name: '', table: 11, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 102, name: '', table: 11, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 103, name: '', table: 11, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 104, name: '', table: 11, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 105, name: '', table: 11, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 106, name: '', table: 11, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 107, name: '', table: 11, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 108, name: '', table: 11, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 109, name: '', table: 11, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 110, name: '', table: 11, checkedIn: false, angBao: false, angBaoAmt: null },

  // Table 12 — Parents' Colleagues
  { id: 111, name: '', table: 12, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 112, name: '', table: 12, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 113, name: '', table: 12, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 114, name: '', table: 12, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 115, name: '', table: 12, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 116, name: '', table: 12, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 117, name: '', table: 12, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 118, name: '', table: 12, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 119, name: '', table: 12, checkedIn: false, angBao: false, angBaoAmt: null },
  { id: 120, name: '', table: 12, checkedIn: false, angBao: false, angBaoAmt: null },
];

export default GUESTS;

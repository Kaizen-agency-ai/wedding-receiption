export const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M11.5 4L5.5 10L2.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="7" cy="7" r="5" />
    <path d="M11 11l3 3" />
  </svg>
);

export const RingsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="10" cy="16" r="7" stroke="#D4A843" strokeWidth="1.5" />
    <circle cx="18" cy="16" r="7" stroke="#D4A843" strokeWidth="1.5" />
    <path d="M14 10.5a7 7 0 0 1 0 11" stroke="#D4A843" strokeWidth="1.5" opacity="0.4" />
  </svg>
);

export const AngBaoIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="10" rx="1.5"
      stroke={filled ? '#B8860B' : '#C4767A'} strokeWidth="1.3"
      fill={filled ? '#F5E6C8' : 'none'} />
    <path d="M8 6v4M6 8h4"
      stroke={filled ? '#B8860B' : '#C4767A'} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

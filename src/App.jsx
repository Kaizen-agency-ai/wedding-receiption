import { useState, useCallback } from 'react';
import TopBar from './components/TopBar';
import AngBaoModal from './components/AngBaoModal';
import WalkInModal from './components/WalkInModal';
import Toast from './components/Toast';
import DashboardPage from './pages/DashboardPage';
import ChecklistPage from './pages/ChecklistPage';
import FloorPlanPage from './pages/FloorPlanPage';
import useGuests from './hooks/useGuests';
import WEDDING_CONFIG from './data/config';

const TABS = [
  { key: 'dashboard',  label: 'Dashboard',      zh: '仪表板', icon: '⊞' },
  { key: 'checklist',  label: 'Guest Checklist', zh: '宾客清单', icon: '✓' },
  { key: 'floorplan',  label: 'Floor Plan',      zh: '平面图',  icon: '⊡' },
];

// ── CSV Export ─────────────────────────────────
function buildCSV(guests, tableStats) {
  const headers = ['Name', 'Table', 'Table Label', 'Walk-in', 'Checked In', 'Ang Bao', 'Amount (SGD)'];
  const rows = guests.map((g) => {
    const t = tableStats.find((t) => t.id === g.table);
    return [
      g.name,
      t?.name ?? `Table ${g.table}`,
      t?.label ?? '',
      g.walkIn ? 'Yes' : 'No',
      g.checkedIn ? 'Yes' : 'No',
      g.angBao ? 'Yes' : 'No',
      g.angBaoAmt ?? '',
    ];
  });
  return [headers, ...rows]
    .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
    .join('\n');
}

export default function App() {
  const [activeTab, setActiveTab]     = useState('dashboard');
  const [angBaoGuestId, setAngBaoGuestId] = useState(null);
  const [walkInOpen, setWalkInOpen]   = useState(false);
  const [toasts, setToasts]           = useState([]);

  const { guests, stats, toggleCheckIn, setAngBao, addWalkIn, renameGuest, moveGuest, resetGuests } = useGuests();

  const angBaoGuest = angBaoGuestId !== null
    ? guests.find((g) => g.id === angBaoGuestId) ?? null
    : null;

  // ── Toggle with undo toast ──
  const handleToggleCheckIn = useCallback((id) => {
    const guest = guests.find((g) => g.id === id);
    toggleCheckIn(id);
    // Only toast when unchecking a checked-in guest
    if (guest?.checkedIn) {
      const toastId = Date.now();
      setToasts((prev) => [...prev, { id: toastId, guestId: id, guestName: guest.name }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toastId));
      }, 5000);
    }
  }, [guests, toggleCheckIn]);

  const undoUncheck = (toastId, guestId) => {
    toggleCheckIn(guestId);
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  };

  const dismissToast = (toastId) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  };

  // ── CSV Export ──
  const exportCSV = () => {
    const csv = buildCSV(guests, stats.tableStats);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${WEDDING_CONFIG.coupleName.replace(/\s+/g, '-')}-reception-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Reset ──
  const handleReset = () => {
    if (window.confirm('Reset ALL check-in and ang bao data? This cannot be undone.')) {
      resetGuests();
      setToasts([]);
    }
  };

  return (
    <div className="app">
      <TopBar />

      {/* Navigation */}
      <div className="nav">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`nav-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="nav-tab-icon">{tab.icon}</span>
            <span className="nav-tab-label">
              {tab.label}
              <span className="nav-tab-zh">{tab.zh}</span>
            </span>
          </button>
        ))}

        {/* Toolbar actions (right side) */}
        <div className="nav-actions">
          <button className="nav-action-btn" onClick={exportCSV} title="Export guest data as CSV">
            ↓ Export CSV
          </button>
          <button className="nav-action-btn danger" onClick={handleReset} title="Reset all check-in data">
            Reset Data
          </button>
        </div>
      </div>

      {/* Pages */}
      {activeTab === 'dashboard' && <DashboardPage stats={stats} />}

      {activeTab === 'checklist' && (
        <ChecklistPage
          guests={guests}
          onToggleCheckIn={handleToggleCheckIn}
          onOpenAngBao={setAngBaoGuestId}
          onAddWalkIn={() => setWalkInOpen(true)}
          onRenameGuest={renameGuest}
          onMoveGuest={moveGuest}
        />
      )}

      {activeTab === 'floorplan' && <FloorPlanPage tableStats={stats.tableStats} />}

      {/* Modals */}
      <AngBaoModal
        guest={angBaoGuest}
        onSave={setAngBao}
        onClose={() => setAngBaoGuestId(null)}
      />

      {walkInOpen && (
        <WalkInModal
          onAdd={addWalkIn}
          onClose={() => setWalkInOpen(false)}
        />
      )}

      {/* Toast notifications */}
      <Toast toasts={toasts} onUndo={undoUncheck} onDismiss={dismissToast} />
    </div>
  );
}

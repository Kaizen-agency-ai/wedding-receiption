import { useState, useMemo, useRef } from 'react';
import TABLES from '../data/tables';
import WEDDING_CONFIG from '../data/config';
import { SearchIcon, AngBaoIcon, CheckIcon } from '../components/Icons';

const formatCurrency = (n) =>
  n.toLocaleString(WEDDING_CONFIG.locale, {
    style: 'currency',
    currency: WEDDING_CONFIG.currency,
    minimumFractionDigits: 0,
  });

export default function ChecklistPage({ guests, onToggleCheckIn, onOpenAngBao, onAddWalkIn, onRenameGuest, onMoveGuest }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | checked | unchecked

  // Inline editing state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTable, setEditTable] = useState(null);
  const nameInputRef = useRef(null);

  // Expand all by default; collapse only when no search
  const [expandedTables, setExpandedTables] = useState(
    new Set(TABLES.map((t) => t.id))
  );

  const toggleExpand = (id) => {
    setExpandedTables((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Build the set of table IDs present in guests (includes walk-in tables)
  const allTableIds = useMemo(() => {
    const ids = new Set(guests.map((g) => g.table));
    return TABLES.filter((t) => ids.has(t.id));
  }, [guests]);

  const filteredTables = useMemo(() => {
    return allTableIds.map((t) => {
      let tGuests = guests.filter((g) => g.table === t.id);
      if (search) {
        const q = search.toLowerCase();
        tGuests = tGuests.filter((g) => g.name.toLowerCase().includes(q));
      }
      if (filter === 'checked')   tGuests = tGuests.filter((g) => g.checkedIn);
      if (filter === 'unchecked') tGuests = tGuests.filter((g) => !g.checkedIn);
      return { ...t, guests: tGuests };
    }).filter((t) => t.guests.length > 0);
  }, [guests, search, filter, allTableIds]);

  const handlePrint = () => window.print();

  const startEdit = (g) => {
    setEditingId(g.id);
    setEditName(g.name);
    setEditTable(g.table);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const saveEdit = () => {
    if (editingId === null) return;
    onRenameGuest(editingId, editName.trim());
    if (editTable !== null) onMoveGuest(editingId, editTable);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <div className="page">
      {/* Controls */}
      <div className="checklist-controls">
        <div className="search-wrap">
          <span className="search-icon"><SearchIcon /></span>
          <input
            className="search-box"
            placeholder="Search guest name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className={`filter-btn ${filter === 'all'       ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-btn ${filter === 'checked'   ? 'active' : ''}`} onClick={() => setFilter('checked')}>Checked In</button>
        <button className={`filter-btn ${filter === 'unchecked' ? 'active' : ''}`} onClick={() => setFilter('unchecked')}>Pending</button>

        <button className="checklist-action-btn walkin-btn" onClick={onAddWalkIn}>
          + Walk-in
        </button>
        <button className="checklist-action-btn print-btn" onClick={handlePrint}>
          ⎙ Print
        </button>
      </div>

      {/* Table Groups */}
      {filteredTables.length === 0 && (
        <div className="empty-state">No guests match your search.</div>
      )}

      {filteredTables.map((t) => {
        const isExpanded = expandedTables.has(t.id);
        const tChecked   = t.guests.filter((g) => g.checkedIn).length;

        return (
          <div key={t.id} className="table-group">
            <div className="table-group-header" onClick={() => toggleExpand(t.id)}>
              <span className="table-group-title">
                {t.name} — {t.label}
                <span style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginLeft: 12, color: '#5A4F47' }}>
                  {isExpanded ? '▾' : '▸'}
                </span>
              </span>
              <span className="table-group-count">{tChecked} / {t.guests.length} arrived</span>
            </div>

            {isExpanded &&
              t.guests.map((g, idx) => {
                const isEditing = editingId === g.id;

                return (
                  <div key={g.id} className={`guest-row ${g.checkedIn ? 'checked' : ''} ${isEditing ? 'editing' : ''}`}>
                    <span className="guest-index">{idx + 1}</span>

                    {isEditing ? (
                      <div className="guest-edit-group">
                        <input
                          ref={nameInputRef}
                          className="guest-name-input"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={handleNameKeyDown}
                          placeholder="Enter guest name…"
                        />
                        <select
                          className="guest-table-select"
                          value={editTable}
                          onChange={(e) => setEditTable(Number(e.target.value))}
                        >
                          {TABLES.map((tbl) => (
                            <option key={tbl.id} value={tbl.id}>
                              {tbl.name} — {tbl.label}
                            </option>
                          ))}
                        </select>
                        <button className="guest-edit-save" onClick={saveEdit} title="Save">✓</button>
                        <button className="guest-edit-cancel" onClick={cancelEdit} title="Cancel">✕</button>
                      </div>
                    ) : (
                      <span
                        className={`guest-name ${g.checkedIn ? 'checked-name' : ''} ${!g.name ? 'guest-name-empty' : ''}`}
                        onClick={() => startEdit(g)}
                        title="Click to edit name or reassign table"
                      >
                        {g.name || 'Click to enter name…'}
                        {g.walkIn && <span className="walkin-badge">Walk-in</span>}
                        <span className="guest-edit-hint">✎</span>
                      </span>
                    )}

                    <div
                      className={`ang-bao-tag ${g.angBao ? 'received' : ''}`}
                      onClick={() => onOpenAngBao(g.id)}
                      title="Record ang bao"
                    >
                      <AngBaoIcon filled={g.angBao} />
                      {g.angBao ? formatCurrency(g.angBaoAmt) : 'Ang Bao'}
                    </div>

                    <label className="checkbox-wrap">
                      <input type="checkbox" checked={g.checkedIn} onChange={() => onToggleCheckIn(g.id)} />
                      <div className="checkbox-visual"><CheckIcon /></div>
                    </label>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

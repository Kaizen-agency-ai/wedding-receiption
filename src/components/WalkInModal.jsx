import { useState } from 'react';

export default function WalkInModal({ tables, onAdd, onClose }) {
  const [name, setName] = useState('');
  const [tableId, setTableId] = useState(tables[0].id);

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name.trim(), Number(tableId));
    onClose();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleAdd();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} onKeyDown={handleKey}>
        <h3>Add Walk-in Guest</h3>
        <p>Guest is not on the list — record them here.</p>

        <label className="walkin-label">Guest Name</label>
        <input
          className="walkin-input"
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        <label className="walkin-label" style={{ marginTop: 14 }}>Assign to Table</label>
        <select
          className="walkin-select"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
        >
          {tables.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} — {t.label}
            </option>
          ))}
        </select>

        <div className="modal-btns">
          <button className="modal-btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-btn primary"
            onClick={handleAdd}
            disabled={!name.trim()}
          >
            Add Guest
          </button>
        </div>
      </div>
    </div>
  );
}

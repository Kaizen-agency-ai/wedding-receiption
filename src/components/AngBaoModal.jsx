import { useState, useEffect } from 'react';

export default function AngBaoModal({ guest, onSave, onClose }) {
  const [amount, setAmount] = useState('');

  useEffect(() => {
    setAmount(guest?.angBaoAmt ? String(guest.angBaoAmt) : '');
  }, [guest]);

  if (!guest) return null;

  const handleSave = () => {
    onSave(guest.id, amount);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Record Ang Bao</h3>
        <p>{guest.name}</p>
        <input
          type="number"
          placeholder="Amount (SGD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus
          min="0"
          step="10"
        />
        <div className="modal-btns">
          <button className="modal-btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

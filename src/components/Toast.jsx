export default function Toast({ toasts, onUndo, onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          <span className="toast-msg">
            <span className="toast-name">{t.guestName}</span> unchecked
          </span>
          <button className="toast-undo" onClick={() => onUndo(t.id, t.guestId)}>
            Undo
          </button>
          <button className="toast-dismiss" onClick={() => onDismiss(t.id)} aria-label="Dismiss">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

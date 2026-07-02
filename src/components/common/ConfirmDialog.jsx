export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

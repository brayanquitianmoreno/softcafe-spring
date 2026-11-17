// Muestra mensajes de éxito o error al usuario.
export default function AlertMessage({ mensaje, tipo = 'success', onClose }) {
  if (!mensaje) return null;
  return (
    <div className={`alert ${tipo}`} role="status">
      <span>{mensaje}</span>
      <button className="alert-close" onClick={onClose} aria-label="Cerrar mensaje">×</button>
    </div>
  );
}

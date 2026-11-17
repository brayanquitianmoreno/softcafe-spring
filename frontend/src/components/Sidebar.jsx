// Navegación lateral de los módulos disponibles en esta versión.
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="side-label">MENÚ PRINCIPAL</p>
      <a className="nav-link active" href="#productos"><span>▦</span> Productos</a>
      <a className="nav-link" href="#resumen"><span>▤</span> Inventario</a>
      <div className="sidebar-note">
        <span className="note-icon">☕</span>
        <strong>Un buen café</strong>
        <small>comienza con una buena gestión.</small>
      </div>
    </aside>
  );
}

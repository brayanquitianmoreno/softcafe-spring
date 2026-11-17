// Barra superior con la identidad del sistema.
export default function Navbar() {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Inicio SoftCafé">
        <span className="brand-icon">SC</span>
        <span>Soft<span className="brand-light">Café</span></span>
      </a>
      <span className="topbar-caption">Administración de cafetería</span>
      <span className="user-chip">Administrador</span>
    </header>
  );
}

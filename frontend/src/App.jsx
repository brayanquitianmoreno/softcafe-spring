import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import SearchBar from './components/SearchBar.jsx';
import ProductForm from './components/ProductForm.jsx';
import ProductList from './components/ProductList.jsx';
import AlertMessage from './components/AlertMessage.jsx';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from './services/productService.js';

const MONEDA = (valor) => Number(valor || 0).toLocaleString('es-CO', {
  style: 'currency', currency: 'COP', maximumFractionDigits: 0
});

export default function App() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');

  // Consulta los datos reales del backend al iniciar la pantalla.
  async function cargarProductos() {
    try {
      setCargando(true);
      setProductos(await obtenerProductos());
    } catch (error) {
      mostrarMensaje(`No fue posible conectar con el servidor: ${error.message}`, 'error');
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => { cargarProductos(); }, []);

  function mostrarMensaje(texto, tipo = 'success') {
    setMensaje(texto);
    setTipoMensaje(tipo);
  }

  // Guarda un producto nuevo o actualiza el que se está editando.
  async function guardarProducto(datos) {
    try {
      setGuardando(true);
      if (productoEditando) {
        await actualizarProducto(productoEditando.id, datos);
        mostrarMensaje('Producto actualizado correctamente.');
      } else {
        await crearProducto(datos);
        mostrarMensaje('Producto registrado correctamente.');
      }
      setMostrarFormulario(false);
      setProductoEditando(null);
      await cargarProductos();
    } catch (error) {
      mostrarMensaje(`No se pudo guardar. Verifica el código y los datos. ${error.message}`, 'error');
    } finally {
      setGuardando(false);
    }
  }

  // Solicita confirmación antes de borrar definitivamente un registro.
  async function borrarProducto(producto) {
    const confirmar = window.confirm(`¿Deseas eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`);
    if (!confirmar) return;
    try {
      await eliminarProducto(producto.id);
      mostrarMensaje('Producto eliminado correctamente.');
      await cargarProductos();
    } catch (error) {
      mostrarMensaje(`No se pudo eliminar el producto: ${error.message}`, 'error');
    }
  }

  function iniciarEdicion(producto) {
    setProductoEditando(producto);
    setMostrarFormulario(true);
  }

  function iniciarRegistro() {
    setProductoEditando(null);
    setMostrarFormulario(true);
  }

  // Filtra la tabla sin volver a consultar la base de datos.
  const productosFiltrados = useMemo(() => {
    const termino = busqueda.toLocaleLowerCase('es');
    return productos.filter((producto) =>
      producto.nombre.toLocaleLowerCase('es').includes(termino) ||
      producto.codigo.toLocaleLowerCase('es').includes(termino)
    );
  }, [productos, busqueda]);

  const unidades = productos.reduce((total, producto) => total + Number(producto.stock || 0), 0);
  const valorInventario = productos.reduce((total, producto) =>
    total + Number(producto.precio || 0) * Number(producto.stock || 0), 0);

  return (
    <div className="app-shell">
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main-content" id="productos">
          <div className="page-heading">
            <div><span className="eyebrow">INVENTARIO / CATÁLOGO</span><h1>Productos</h1>
              <p>Administra el catálogo y controla las existencias de tu cafetería.</p></div>
            <button className="button button-primary" onClick={iniciarRegistro}>＋ Nuevo producto</button>
          </div>

          <AlertMessage mensaje={mensaje} tipo={tipoMensaje} onClose={() => setMensaje('')} />

          <section className="summary-grid" id="resumen">
            <article className="summary-card"><span className="summary-icon coffee">☕</span><div><small>Productos registrados</small><strong>{productos.length}</strong></div></article>
            <article className="summary-card"><span className="summary-icon stock">▤</span><div><small>Unidades en inventario</small><strong>{unidades}</strong></div></article>
            <article className="summary-card"><span className="summary-icon value">$</span><div><small>Valor del inventario</small><strong>{MONEDA(valorInventario)}</strong></div></article>
          </section>

          {mostrarFormulario && <section className="panel form-panel">
            <div className="panel-heading"><div><span className="eyebrow">GESTIÓN DE CATÁLOGO</span><h2>{productoEditando ? 'Editar producto' : 'Registrar producto'}</h2></div></div>
            <ProductForm producto={productoEditando} onSave={guardarProducto}
              onCancel={() => { setMostrarFormulario(false); setProductoEditando(null); }}
              guardando={guardando} />
          </section>}

          <section className="panel">
            <div className="panel-heading list-heading">
              <div><span className="eyebrow">CATÁLOGO</span><h2>Listado de productos</h2></div>
              <SearchBar value={busqueda} onChange={setBusqueda} />
            </div>
            {cargando ? <div className="loading">Cargando productos...</div> :
              <ProductList productos={productosFiltrados} onEdit={iniciarEdicion} onDelete={borrarProducto} />}
            <div className="panel-footer">Mostrando {productosFiltrados.length} de {productos.length} productos</div>
          </section>
          <footer className="footer">SoftCafé · Sistema de gestión para cafeterías</footer>
        </main>
      </div>
    </div>
  );
}

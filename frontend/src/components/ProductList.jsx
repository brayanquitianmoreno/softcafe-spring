// Tabla de productos con acciones para editar y eliminar.
export default function ProductList({ productos, onEdit, onDelete }) {
  if (!productos.length) {
    return <div className="empty-state"><span>☕</span><strong>No se encontraron productos</strong><p>Prueba otra búsqueda o registra un producto nuevo.</p></div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>PRODUCTO</th><th>CÓDIGO</th><th>PRECIO</th><th>STOCK</th><th>ESTADO</th><th>ACCIONES</th></tr></thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td><strong>{producto.nombre}</strong><small className="row-id">ID #{producto.id}</small></td>
              <td><span className="code-tag">{producto.codigo}</span></td>
              <td>{Number(producto.precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}</td>
              <td>{producto.stock} uds.</td>
              <td><span className={`stock-status ${producto.stock > 5 ? 'in-stock' : 'low-stock'}`}>{producto.stock > 5 ? 'Disponible' : 'Stock bajo'}</span></td>
              <td><div className="row-actions">
                <button className="icon-button" onClick={() => onEdit(producto)} aria-label={`Editar ${producto.nombre}`}>✎</button>
                <button className="icon-button delete-action" onClick={() => onDelete(producto)} aria-label={`Eliminar ${producto.nombre}`}>⌫</button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

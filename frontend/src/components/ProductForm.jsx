import { useEffect, useState } from 'react';

const FORMULARIO_VACIO = { codigo: '', nombre: '', precio: '', stock: '' };

// Formulario reutilizable para crear y editar productos.
export default function ProductForm({ producto, onSave, onCancel, guardando }) {
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);

  useEffect(() => {
    setFormulario(producto
      ? { codigo: producto.codigo, nombre: producto.nombre,
          precio: producto.precio, stock: producto.stock }
      : FORMULARIO_VACIO);
  }, [producto]);

  function cambiarCampo(event) {
    const { name, value } = event.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  }

  function enviar(event) {
    event.preventDefault();
    onSave({
      codigo: formulario.codigo.trim(),
      nombre: formulario.nombre.trim(),
      precio: Number(formulario.precio),
      stock: Number(formulario.stock)
    });
  }

  return (
    <form className="product-form" onSubmit={enviar}>
      <div className="form-grid">
        <label>Código del producto
          <input name="codigo" value={formulario.codigo} onChange={cambiarCampo}
            placeholder="Ej. CAF-006" maxLength="30" required />
        </label>
        <label>Nombre del producto
          <input name="nombre" value={formulario.nombre} onChange={cambiarCampo}
            placeholder="Nombre del producto" maxLength="100" required />
        </label>
        <label>Precio (COP)
          <input name="precio" type="number" min="0.01" step="0.01"
            value={formulario.precio} onChange={cambiarCampo} placeholder="8000" required />
        </label>
        <label>Unidades disponibles
          <input name="stock" type="number" min="0" step="1"
            value={formulario.stock} onChange={cambiarCampo} placeholder="20" required />
        </label>
      </div>
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={guardando}>
          {guardando ? 'Guardando...' : producto ? 'Guardar cambios' : 'Registrar producto'}
        </button>
        <button className="button button-quiet" type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

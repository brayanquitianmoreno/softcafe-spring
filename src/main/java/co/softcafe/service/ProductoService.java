
package co.softcafe.service;

import co.softcafe.model.Producto;
import co.softcafe.repository.ProductoRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Contiene la lógica de negocio para administrar
 * los productos del sistema SoftCafe.
 */
@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    // Inyección de dependencias mediante constructor.
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // Consulta todos los productos registrados.
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    // Busca un producto por su identificador.
    public Optional<Producto> buscarPorId(Integer id) {
        return productoRepository.findById(id);
    }

    // Registra un nuevo producto.
    public Producto guardarProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    // Actualiza un producto existente.
    public Producto actualizarProducto(Integer id, Producto producto) {
        producto.setId(id);
        return productoRepository.save(producto);
    }

    // Elimina un producto por su identificador.
    public void eliminarProducto(Integer id) {
        productoRepository.deleteById(id);
    }
}

package co.softcafe.controller;

import co.softcafe.model.Producto;
import co.softcafe.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * API REST que permite al frontend React consultar y administrar productos.
 */
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoRestController {

    private final ProductoService productoService;

    // El servicio se inyecta por constructor para facilitar el mantenimiento y las pruebas.
    public ProductoRestController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // Devuelve todos los productos registrados.
    @GetMapping
    public List<Producto> listar() {
        return productoService.listarProductos();
    }

    // Registra un producto nuevo y responde con código HTTP 201.
    @PostMapping
    public ResponseEntity<Producto> crear(@Valid @RequestBody Producto producto) {
        producto.setId(null);
        Producto guardado = productoService.guardarProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    // Actualiza los datos de un producto existente.
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(
            @PathVariable Integer id,
            @Valid @RequestBody Producto datos) {

        return productoService.buscarPorId(id)
                .map(productoExistente -> {
                    productoExistente.setCodigo(datos.getCodigo());
                    productoExistente.setNombre(datos.getNombre());
                    productoExistente.setPrecio(datos.getPrecio());
                    productoExistente.setStock(datos.getStock());
                    return ResponseEntity.ok(
                            productoService.guardarProducto(productoExistente));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Elimina el producto indicado; si no existe, responde 404.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (productoService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}

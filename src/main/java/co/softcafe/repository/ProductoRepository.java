
package co.softcafe.repository;

import co.softcafe.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio encargado de gestionar los productos
 * de SoftCafe mediante Spring Data JPA.
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {

    // Spring Data JPA proporciona automáticamente
    // registrar, consultar, actualizar y eliminar productos.
}

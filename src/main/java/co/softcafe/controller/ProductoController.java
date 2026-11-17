
package co.softcafe.controller;

import co.softcafe.model.Producto;
import co.softcafe.service.ProductoService;

import jakarta.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

/**
 * Controlador web encargado de recibir las solicitudes
 * y administrar las operaciones CRUD de productos.
 */
@Controller
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoService productoService;

    // Inyección de dependencias mediante constructor.
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // Muestra el listado de productos registrados.
    @GetMapping
    public String listar(Model model) {
        model.addAttribute("productos",
                productoService.listarProductos());
        return "productos/lista";
    }

    // Muestra el formulario para registrar un producto.
    @GetMapping("/nuevo")
    public String nuevo(Model model) {
        model.addAttribute("producto", new Producto());
        model.addAttribute("titulo", "Registrar producto");
        return "productos/formulario";
    }

    // Recibe y guarda los datos del formulario.
    @PostMapping("/guardar")
    public String guardar(
            @Valid @ModelAttribute("producto") Producto producto,
            BindingResult resultado,
            RedirectAttributes atributos,
            Model model) {

        if (resultado.hasErrors()) {
            model.addAttribute("titulo", "Registrar producto");
            return "productos/formulario";
        }

        productoService.guardarProducto(producto);
        atributos.addFlashAttribute("mensaje",
                "Producto registrado correctamente.");

        return "redirect:/productos";
    }

    // Busca un producto y carga sus datos para editarlo.
    @GetMapping("/editar/{id}")
    public String editar(@PathVariable Integer id,
                         Model model,
                         RedirectAttributes atributos) {

        Optional<Producto> producto =
                productoService.buscarPorId(id);

        if (producto.isEmpty()) {
            atributos.addFlashAttribute("error",
                    "No se encontró el producto.");
            return "redirect:/productos";
        }

        model.addAttribute("producto", producto.get());
        model.addAttribute("titulo", "Actualizar producto");

        return "productos/formulario";
    }

    // Elimina un producto seleccionado.
    @PostMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Integer id,
                           RedirectAttributes atributos) {

        if (productoService.buscarPorId(id).isPresent()) {
            productoService.eliminarProducto(id);
            atributos.addFlashAttribute("mensaje",
                    "Producto eliminado correctamente.");
        } else {
            atributos.addFlashAttribute("error",
                    "No se encontró el producto.");
        }

        return "redirect:/productos";
    }
}

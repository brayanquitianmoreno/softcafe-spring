# SoftCafé - Evidencia GA7-220501096-AA4-EV02

Aplicación web para administrar productos de una cafetería. El proyecto conserva el backend existente de Spring Boot y añade un frontend independiente desarrollado con React.

## Tecnologías

- Java 17 y Spring Boot
- Spring Data JPA y MySQL
- React y Vite
- JavaScript, HTML y CSS

## Estructura principal

- `src/main/java`: backend Java.
- `src/main/resources/templates`: interfaz anterior basada en Thymeleaf, conservada.
- `frontend/`: nueva interfaz React.
- `src/main/java/co/softcafe/controller/ProductoRestController.java`: API REST consumida por React.
- `enlace_repositorio.txt`: dirección del repositorio GitHub.

## Requisitos

- JDK 17.
- MySQL Server con la base de datos `softcafe` y la tabla `productos` creada.
- Node.js y npm.
- Maven (y Maven instalado).

## Configurar la conexión a MySQL

La contraseña no se almacena en este repositorio. Antes de iniciar Spring Boot, configura la variable de entorno `DB_PASSWORD` con la contraseña de tu usuario MySQL.

En PowerShell, dentro de la terminal donde ejecutarás el backend:

```powershell
$env:DB_PASSWORD="TU_CONTRASEÑA_MYSQL"
$env:DB_USERNAME="root"
```

Si tu base de datos usa otra dirección, puedes configurar también `DB_URL`. No publiques contraseñas ni archivos `.env` en GitHub.

## Ejecutar el backend

Desde la carpeta raíz del proyecto:

```powershell
.\mvnw.cmd spring-boot:run
```

El backend se ejecuta en `http://localhost:8080`.

La API REST de productos está disponible en:

- `GET http://localhost:8080/api/productos`
- `POST http://localhost:8080/api/productos`
- `PUT http://localhost:8080/api/productos/{id}`
- `DELETE http://localhost:8080/api/productos/{id}`

## Ejecutar el frontend React

Abre una segunda terminal y entra a la carpeta `frontend`:

```powershell
cd frontend
npm install
npm run dev
```

Vite mostrará la dirección local; normalmente será `http://localhost:5173`.

**Importante:** el backend y el frontend deben estar ejecutándose al mismo tiempo. React consulta los productos reales de MySQL a través de la API de Spring Boot. La interfaz antigua Thymeleaf se conserva y continúa disponible desde el backend en `/productos`.

## Funcionalidades del frontend

- Consultar productos registrados.
- Buscar por código o nombre.
- Registrar productos.
- Editar productos.
- Eliminar productos con confirmación.
- Visualizar cantidad de productos, unidades y valor estimado del inventario.
- Mostrar mensajes de éxito y error.

## Estándares aplicados

- Componentes React separados por responsabilidad.
- Nombres descriptivos para componentes, funciones y variables.
- Uso de `useState`, `useEffect` y `useMemo` para manejar estado y datos.
- Servicio independiente para las solicitudes HTTP.
- Comentarios en los componentes y operaciones principales.
- Validaciones del formulario y atributos accesibles básicos.

## Repositorio

https://github.com/brayanquitianmoreno/softcafe-spring

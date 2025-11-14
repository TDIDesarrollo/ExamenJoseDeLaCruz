# 💻 Prueba Técnica para Desarrollador - Jose de la Cruz

[cite_start]**Objetivo:** Desarrollar una aplicación web que consuma datos desde una API pública (JsonPlaceHolder) y los presente en una interfaz interactiva, implementando buenas prácticas de desarrollo, manejo de errores y persistencia de información[cite: 5].

---

## 🛠️ Tecnologías Utilizadas

| Componente | Tecnología | Versión | Propósito / Requisito Cumplido |
| :--- | :--- | :--- | :--- |
| **Backend (API)** | ASP.NET Core Web API | [cite_start].NET 6.0 o superior [cite: 10] | [cite_start]Lógica de negocio, consumo de API externa, manejo de errores[cite: 5]. |
| **Frontend (UI)** | React | Vite | [cite_start]Interfaz de usuario interactiva, búsqueda, y filtrado[cite: 5]. |
| **Estilos** | Tailwind CSS (v3.x) | npm | [cite_start]Diseño agradable y experiencia de usuario intuitiva[cite: 14]. |
| **Persistencia** | Logger Personalizado | .NET Class Library | [cite_start]Persistencia de errores de comunicación[cite: 23]. |
| **API Externa** | JsonPlaceHolder | REST | [cite_start]Fuente de datos para el consumo de API[cite: 16]. |

---

## 🚀 Instrucciones de Ejecución

Esta aplicación consta de dos proyectos que deben ejecutarse de forma concurrente.

### 1. ⚙️ Backend (ASP.NET Core Web API)

El backend es la capa de presentación (`Examen.Presentation`) que hospeda la lógica de consumo.

1.  **Abrir Solución:** Abre el archivo `ExamenJoseDeLaCruz.sln` en **Visual Studio**.
2.  **Verificar Puertos:** Asegúrate de que el proyecto `Examen.Presentation` esté configurado para ejecutarse en el puerto **HTTPS 7206** (o el que se muestre en el log de inicio).
3.  **Configurar Ejecución:** Modifica el perfil de inicio en Visual Studio para **desactivar la opción "Iniciar explorador"** (`Launch browser`). Esto permite que el servidor Kestrel se mantenga activo después de cerrar la ventana de Swagger (o que se ejecute en segundo plano).
4.  **Iniciar:** Presiona **F5** (Iniciar depuración).
5.  **Verificación:** La consola de Kestrel debe mostrar el mensaje `Now listening on: https://localhost:7206`.

### 2. ⚛️ Frontend (React/Vite)

El frontend consumirá el endpoint `https://localhost:7206/api/posts`.

1.  **Navegar a la Carpeta:** Abre la terminal (CMD/PowerShell) y navega a la carpeta **`Frontend-React`**.
2.  **Instalar Dependencias:** Si es la primera vez, ejecuta `npm install`.
3.  **Iniciar:** Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```
4.  **Acceder:** Abre la URL que proporciona Vite (ej: `http://localhost:5173/`).

**Resultado Esperado:** La aplicación React cargará la tabla con los datos de JsonPlaceHolder, si el backend (`https://localhost:7206`) está activo. Si falla, se mostrará una alerta de **SweetAlert2** informando el error de conexión.

---

## 🏗️ Arquitectura y Buenas Prácticas

[cite_start]La solución fue diseñada siguiendo los principios de **Arquitectura de N-Capas** (separación de responsabilidades) y **Mantenibilidad**[cite: 11].

### 1. Backend: Organización en Capas (.NET Core)

El backend se organiza en cuatro proyectos de biblioteca de clases/API:

* **`Examen.Presentation` (Capa de Presentación):** Es el proyecto **ASP.NET Core Web API**. Contiene el `PostsController` y la configuración de **CORS** e **Inyección de Dependencias (DI)**. Es el único punto de contacto con el frontend.
* **`Examen.Business` (Capa de Negocio):** Contiene la lógica central. [cite_start]Aquí se utiliza **`HttpClient`** para consumir la API de JsonPlaceHolder y se implementa el **manejo de errores y excepciones** (conexión fallida, error de formato)[cite: 17, 18]. Depende de `DataAccess` y `Models`.
* [cite_start]**`Examen.DataAccess` (Capa de Datos / Persistencia):** Implementa el **Logger Personalizado (`FileLogger`)** para persistir la información de los errores del sistema en un archivo local (`application.log`), cumpliendo con el requisito de persistencia[cite: 23].
* **`Examen.Models`:** Contiene los DTOs (Data Transfer Objects), como `PostDto`, utilizados para transferir datos de forma estructurada entre todas las capas.

### 2. Frontend: Interfaz y Filtros (React)

* **Custom Hooks:** Se utiliza `useDataFetcher` para gestionar el estado de los datos (carga, error, data) y `useThemeSwitcher` para manejar el estado del modo claro/oscuro. Esto centraliza la lógica y evita el *prop drilling*.
* [cite_start]**Búsqueda y Filtrado:** La funcionalidad cumple con el requisito[cite: 21]:
    * Se utiliza un desplegable (`ColumnFilter`) para seleccionar la columna de filtrado (`ID`, `Título`, `Contenido`).
    * Se utiliza `useMemo` en `DataDisplay.jsx` para optimizar el rendimiento del filtrado, recalculando la tabla solo cuando cambian la data o el término de búsqueda.
* [cite_start]**Manejo de Errores (UI):** **SweetAlert2** se utiliza en `postsService.js` para mostrar una **experiencia de usuario intuitiva** [cite: 14] al notificar inmediatamente cualquier fallo en la conexión del backend o error interno, actuando como el logger de presentación.
# 🚀 Willdom Angular Management System

---

## English Version

This is a professional management system built with **Angular 19**, **Taiga UI**, **NgRx**, and **Nx**, designed with a modular, scalable architecture and a premium user interface.

### 📋 Product Specifications
The system enables efficient user management through a fluid interface and highly reusable components.

#### Key Features
- **Persistent Authentication**: Secure login with session persistence using `localStorage`. Refreshing the page maintains the active session.
- **Facade Architecture**: Clear separation between business logic (`UsersFacade`) and identity logic (`AuthFacade`).
- **Reusable "Dumb" Components**:
  - `TableComponent`: Generic table supporting asynchronous data and custom cell templates.
  - `DetailModalComponent`: Data-agnostic detail modal configurable via schemas.
  - `SearchComponent` & `PaginationComponent`: Independent search and pagination controls.
- **Intelligent Routing**: Advanced guards to prevent unauthorized access and automatic redirections based on authentication status.

### 🖥️ How to Use (Step-by-Step)
1. **Login**: 
   - Enter credentials: `admin@willdom.com` / `admin123`.
   - The system validates and stores a mock token in `localStorage`.
2. **Dashboard**: 
   - A unified view appears with real API data.
   - You are protected by `AuthGuard`; if you log out or clear storage, you'll be sent back to login.
3. **Filtering & Search**: 
   - Use the **Search Bar** to filter by Name, Username, or Email.
   - Use the **Column Headers** if specific sorting/filtering is required.
4. **User Details**: 
   - Click on any row to open the **Detail Modal**.
   - Review comprehensive data (Address, Company, Geo-location).
5. **Pagination**: 
   - Change page size or navigate pages using the bottom controls.
6. **Data Export**: 
   - Click the **Export** button to generate a CSV file of your current filtered view.

### 🛠️ Installation & Running Guide
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Launch Dev Server**:
   ```bash
   npx nx serve users-app
   ```
3. **Build for Production**:
   ```bash
   npx nx build users-app --prod
   ```


## Versión en Español

Este es un sistema de gestión profesional construido con **Angular 19**, **Taiga UI**, **NgRx** y **Nx**, diseñado con una arquitectura modular, escalable y una interfaz de usuario premium.

### 📋 Especificaciones del Producto
El sistema permite la gestión eficiente de usuarios a través de una interfaz fluida y componentes altamente reutilizables.

#### Características Principales
- **Autenticación Persistente**: Inicio de sesión seguro con persistencia mediante `localStorage`. Al refrescar la página, mantienes tu sesión activa.
- **Arquitectura de Facades**: Separación clara entre la lógica de negocio (`UsersFacade`) y la lógica de identidad (`AuthFacade`).
- **Componentes "Dumb" Reutilizables**:
  - `TableComponent`: Tabla genérica con soporte para datos asíncronos y plantillas.
  - `DetailModalComponent`: Modal de detalle agnóstico al tipo de dato, configurable dinámicamente.
  - `SearchComponent` & `PaginationComponent`: Controles de búsqueda y paginación independientes.
- **Enrutamiento Inteligente**: Guards avanzados para evitar accesos no autorizados y redirecciones basadas en el estado.

### 🖥️ Cómo usar el sistema (Paso a Paso)
1. **Inicio de Sesión**: 
   - Ingresa credenciales: `admin@willdom.com` / `admin123`.
   - El sistema valida y guarda un token en `localStorage`.
2. **Dashboard**: 
   - Aparece una vista unificada con datos reales del API.
   - Estás protegido por `AuthGuard`; si cierras sesión, volverás al login automáticamente.
3. **Filtros y Búsqueda**: 
   - Usa la **Banda de Búsqueda** para filtrar por nombre, usuario o email.
   - El filtrado es reactivo y eficiente.
4. **Detalle de Usuario**: 
   - Haz clic en cualquier fila para abrir el **Modal de Detalle**.
   - Revisa datos completos como dirección, empresa y geolocalización.
5. **Paginación**: 
   - Cambia el tamaño de página o navega entre ellas con los controles inferiores.
6. **Exportación**: 
   - Clica en **Exportar** para generar un archivo CSV con la lista filtrada actual.

### 🛠️ Guía de Instalación y Ejecución
1. **Instalar Dependencias**:
   ```bash
   npm install
   ```
2. **Lanzar Servidor de Desarrollo**:
   ```bash
   npx nx serve users-app
   ```
3. **Construir para Producción**:
   ```bash
   npx nx build users-app --prod
   ```

*Developed with ❤️ to demonstrate superior technical Frontend skills. / Desarrollado con ❤️ para demostrar habilidad técnica superior.*

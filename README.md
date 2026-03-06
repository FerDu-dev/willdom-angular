# 🚀 Willdom Angular Management System

This is a professional management system built with **Angular 19**, **Taiga UI**, **NgRx**, and **Nx**, designed with a modular, scalable architecture and a premium user interface.

## 📋 Product Specifications

The system enables efficient user management through a fluid interface and highly reusable components.

### Key Features
- **Persistent Authentication**: Secure login with session persistence using `localStorage`. Refreshing the page maintains the active session.
- **Facade Architecture**: Clear separation between business logic (`UsersFacade`) and identity logic (`AuthFacade`).
- **Reusable "Dumb" Components**:
  - `TableComponent`: Generic table supporting asynchronous data and custom cell templates.
  - `DetailModalComponent`: Data-agnostic detail modal configurable via schemas.
  - `SearchComponent` & `PaginationComponent`: Independent search and pagination controls.
- **Intelligent Routing**: Advanced guards to prevent unauthorized access and automatic redirections based on authentication status.

---

## 🖥️ How to Use the System

### 1. Login
- Upon access, you will be greeted by a premium login screen.
- **Mock Credentials**: 
  - **Email**: `admin@willdom.com`
  - **Password**: `admin123`
- Once logged in, a mock token is generated and stored in the browser. You cannot return to the login page without logging out first.

### 2. Dashboard and List
- The dashboard centralizes all user information received from the real API.
- **Global Search**: Use the top search bar to instantly filter by any field (Name, Email, etc.).
- **Pagination**: Control the number of records per page for an optimized loading experience.

### 3. User Details
- Click on any row in the table to open the **Detail Modal**.
- This modal displays complete user information (Address, Company, etc.) in an elegant layout.

### 4. Data Exporting
- In the dashboard, you will find an **Export** button.
- Clicking it will automatically generate a CSV file with the user list currently in view (including applied filters).

---

## 🛠️ Installation Guide (From Scratch)

To run this project locally, ensure you have **Node.js** installed (version 18 or higher).

1. **Clone/Download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npx nx serve users-app
   ```
   The application will be available at `http://localhost:4200`.

4. **Build for production**:
   ```bash
   npx nx build users-app --prod
   ```

---

*Developed with ❤️ to demonstrate superior technical Frontend skills.*

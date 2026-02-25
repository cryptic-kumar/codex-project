# Multi-tenant Clinical Assistant SaaS

Production-ready full-stack starter for a **multi-tenant clinical assistant** with RBAC and clinic isolation.

## Tech Stack

- **Backend:** Java 17, Spring Boot 3, Spring Security (JWT), Spring Data JPA, PostgreSQL, Lombok
- **Frontend:** React (Vite), Tailwind CSS, Lucide React, React Router DOM

## Project Structure

- `backend/` → Spring Boot API
- `frontend/` → React SPA

## Core Features

### Roles
- **SUPER_ADMIN**
  - Register clinics
  - Register doctors and assign clinic
  - View global stats (clinics, doctors, patients)
- **DOCTOR**
  - Tenant-isolated access via `clinicId`
  - Manage patients in own clinic only
  - Manage appointments in own clinic only

### Entities
- `Clinic(id, name, address, contactNumber)`
- `AppUser(id, email, password, name, role, clinicId)`
- `Patient(id, name, phone, medicalHistory, clinicId)`
- `Appointment(id, patientId, doctorId, clinicId, appointmentDate, status)`

---

## 1) PostgreSQL Setup (Exact Steps)

### A. Start PostgreSQL
Make sure PostgreSQL is installed and running locally.

### B. Open psql
```bash
psql -U postgres
```

### C. Create database
```sql
CREATE DATABASE clinical_assistant;
```

### D. (Optional) Confirm DB
```sql
\l
```

### E. Exit psql
```sql
\q
```

### F. Align credentials with backend
Default backend config expects:
- DB URL: `jdbc:postgresql://localhost:5432/clinical_assistant`
- Username: `postgres`
- Password: `postgres`

If your credentials differ, update:
- `backend/src/main/resources/application.properties`

---

## 2) Run Spring Boot Backend (Maven)

### A. Go to backend folder
```bash
cd backend
```

### B. Build project
```bash
mvn clean install
```

### C. Run app
```bash
mvn spring-boot:run
```

Backend runs on:
- `http://localhost:8080`

### D. Main API base path
- `http://localhost:8080/api`

### E. Auth endpoint (public)
- `POST /api/auth/login`

> `spring.jpa.hibernate.ddl-auto=update` is already configured.

---

## 3) Run React Frontend (npm)

### A. Open new terminal and go to frontend
```bash
cd frontend
```

### B. Install dependencies
```bash
npm install
```

### C. Run dev server
```bash
npm run dev
```

Frontend runs on:
- `http://localhost:5173`

---

## 4) Default Dummy Credentials

Created automatically at backend startup via `DataInitializer`:

### SUPER_ADMIN
- Email: `admin@clinical.com`
- Password: `Admin@123`

### DOCTOR
- Email: `doctor@clinical.com`
- Password: `Doctor@123`

---

## 5) API Overview

### Public
- `POST /api/auth/login`

### SUPER_ADMIN (JWT + role required)
- `POST /api/admin/clinics`
- `POST /api/admin/doctors`
- `GET /api/admin/stats`

### DOCTOR (JWT + role required)
- `GET /api/doctor/patients`
- `POST /api/doctor/patients`
- `GET /api/doctor/appointments`
- `POST /api/doctor/appointments`
- `PATCH /api/doctor/appointments/{appointmentId}/status`

---

## 6) Notes for Production Hardening

- Replace JWT secret with strong secret via env vars.
- Use Docker + managed PostgreSQL for deployment.
- Enable centralized logging and monitoring.
- Add refresh tokens and stricter password policies.
- Add DTO mapping layer and integration/unit tests.

# Tax Management System (e-Tax)

A full-stack taxpayer management web application built for Togo's tax
authority (OTR) — a student project demonstrating a complete Angular +
Spring Boot stack with JWT authentication and a real relational database.

## Overview

Administrators log in and manage a registry of taxpayers (individuals —
*Personne Physique* — and companies — *Personne Morale*), with full
create/read/update/delete, search, sorting, and pagination.

| | |
|---|---|
| **Frontend** | Angular 22, Angular Material, responsive design (CDK `BreakpointObserver`) |
| **Backend** | Spring Boot 3, Spring Security (JWT), Spring Data JPA |
| **Database** | MySQL |
| **Auth** | JWT-based, stateless, BCrypt-hashed passwords |

## Repository structure

```
.
├── tax-management-frontend/   Angular app
└── etax-backend/              Spring Boot REST API
```

Each folder has its own README with setup details specific to that half of
the stack.

## Features

- Admin authentication (JWT) with a protected route guard
- Taxpayer CRUD with conditional form fields (Personne Physique vs. Personne
  Morale each require different fields, enforced with reactive form
  validators on the frontend and Bean Validation on the backend)
- Server-side validation matching the frontend's rules (NIF format, phone
  format, etc.) with clean JSON error responses
- Responsive layout: collapsible sidenav on mobile, permanent sidenav on
  desktop
- Sortable, searchable, paginated data table (Angular Material `MatTable`)
- Admin profile page with editable contact details

## Architecture

```
Angular (localhost:4200)  →  HTTP + JWT  →  Spring Boot (localhost:8080)  →  JPA/Hibernate  →  MySQL
```

The frontend and backend are two independently runnable applications that
communicate only over HTTP/JSON — see each subfolder's README for how to
run them.

## Quick start

```bash
# 1. Backend
cd etax-backend
# edit src/main/resources/application.properties with your MySQL credentials
mvn spring-boot:run

# 2. Frontend (separate terminal)
cd tax-management-frontend
npm install
npm start
```

Then open `http://localhost:4200` and log in with `admin` / `admin123`
(seeded automatically on first run — see `etax-backend/README.md`).

## What this project demonstrates

- Standalone Angular components, signals, reactive forms, and the CDK
  layout module for responsiveness
- A layered Spring Boot backend (controller → repository → entity) with
  JWT-based stateless authentication
- End-to-end validation consistency between frontend and backend
- Swappable persistence layer (originally H2, migrated to MySQL with no
  application code changes — only configuration)

# etax-backend

Spring Boot REST API for the OTR e-Tax taxpayer management system.

## Requirements
- JDK 17+
- Maven 3.9+
- MySQL 8+ running locally (or reachable over the network)

## 1. Create the database

```sql
CREATE DATABASE etax;
```

(The JDBC URL below also has `createDatabaseIfNotExist=true`, so on most setups
this happens automatically on first run — but create it manually if your
MySQL user doesn't have permission to create databases.)

## 2. Set your MySQL credentials

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=CHANGE_ME
```

Replace with your actual MySQL username/password.

## 3. Run it

```bash
cd etax-backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080**. On first run against an empty
database it seeds:

- One admin account — username `admin`, password `admin123`
- 15 test taxpayers

Seeding only happens if the tables are empty, so it's safe to leave
`DataSeeder` in place — it won't duplicate data on restart.

## Endpoints

| Method | Path                  | Auth required | Description               |
|--------|-----------------------|:---:|----------------------------|
| POST   | `/api/auth/login`     | No  | `{ username, password }` → `{ token, admin }` |
| GET    | `/api/auth/me`        | Yes | Current admin (used to restore session on refresh) |
| PUT    | `/api/auth/me`        | Yes | Update `fullName`/`email`/`phone` |
| GET    | `/api/taxpayers`      | Yes | List all taxpayers |
| GET    | `/api/taxpayers/{id}` | Yes | Get one taxpayer |
| POST   | `/api/taxpayers`      | Yes | Create a taxpayer |
| PUT    | `/api/taxpayers/{id}` | Yes | Update a taxpayer |
| DELETE | `/api/taxpayers/{id}` | Yes | Delete a taxpayer |

Every route except `/api/auth/login` requires an `Authorization: Bearer <token>`
header — the Angular app's HTTP interceptor adds this automatically.

## Configuration

Everything tunable lives in `src/main/resources/application.properties`:
`server.port`, the MySQL connection details, `app.jwt.secret` /
`app.jwt.expiration-ms`, and `app.cors.allowed-origin` (defaults to
`http://localhost:4200`).

**Before deploying anywhere real:** change `app.jwt.secret` to a long random
value kept out of source control (an environment variable, not this file),
change the seeded admin's password, and never commit real database
credentials to version control.

## Inspecting the database directly

Use any MySQL client (MySQL Workbench, DBeaver, `mysql` CLI, or your IDE's
built-in database tool) pointed at `localhost:3306`, database `etax`. The
tables (`admins`, `taxpayers`) are created and updated automatically by
Hibernate based on the `@Entity` classes — no `.sql` schema file to maintain.

## Switching to PostgreSQL (or back to H2) later

1. Swap the driver dependency in `pom.xml` (e.g. `org.postgresql:postgresql`).
2. Update `spring.datasource.*` and `spring.jpa.database-platform` in
   `application.properties`.
3. No Java code changes needed — Spring Data JPA generates the SQL for
   whichever dialect Hibernate detects from the driver.

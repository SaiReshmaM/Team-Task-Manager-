TEAM TASK MANAGER

A full-stack Team Task Manager web application built with Spring Boot (Backend) and React (Frontend), featuring JWT-based authentication and Role-Based Access Control (RBAC).

--- TECH STACK ---
* Backend: Java 17, Spring Boot, Spring Data JPA, Spring Security, JWT, Swagger/OpenAPI
* Frontend: React.js (Vite), React Router, Axios, JWT Decode
* Database: MySQL

--- FEATURES ---
* Authentication: JWT-based login and signup.
* RBAC: 
  - ADMIN: Can create/update/delete projects, add/remove members, create tasks.
  - MEMBER: Read-only for projects, can only update the status of tasks assigned to them.
* Dashboard: Displays total, pending, completed, and overdue tasks.
* REST APIs: Standard HTTP status codes and consistent JSON responses.

--- SETUP INSTRUCTIONS ---

1. Database (MySQL)
- Ensure you have MySQL running locally on port 3306.
- Create a database named `team_task_manager`:
  CREATE DATABASE team_task_manager;
- Update `backend/src/main/resources/application.properties` with your MySQL `root` password if it is different from `root`.

2. Run Backend (Spring Boot)
- Navigate to the `backend` directory.
- Run the application using Maven:
  mvn spring-boot:run
  (The backend will start on http://localhost:8080)
- View the Swagger API Docs at http://localhost:8080/swagger-ui/index.html

3. Run Frontend (React)
- Navigate to the `frontend` directory.
- Install dependencies (if you haven't already):
  npm install
- Start the Vite development server:
  npm run dev
  (The frontend will start on http://localhost:5173)

--- DEPLOYMENT ---

Railway (Backend & Database)
1. Create a MySQL database on Railway.
2. Create a Spring Boot service on Railway linked to your GitHub repo.
3. Add the following environment variables in Railway:
   - SPRING_DATASOURCE_URL (JDBC URL from Railway MySQL)
   - SPRING_DATASOURCE_USERNAME
   - SPRING_DATASOURCE_PASSWORD

Vercel (Frontend)
1. Import your GitHub repository to Vercel.
2. Set the build command to `npm run build` and output directory to `dist`.
3. In `frontend/src/utils/api.js`, update the `baseURL` to point to your deployed backend URL.

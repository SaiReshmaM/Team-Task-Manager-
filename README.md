# 🗂️ Team Task Manager

A **full-stack Team Task Manager** web application with **JWT-based authentication** and **Role-Based Access Control (RBAC)**. Built with a Spring Boot REST API backend and a React + Vite frontend, deployed on Railway.

---

## 🚀 Live Demo

| Service  | URL |
|----------|-----|
| 🌐 Frontend | [aware-serenity-production.up.railway.app](https://aware-serenity-production-1f56.up.railway.app) |
| 🔧 Backend API | [team-task-manager-production-a389.up.railway.app](https://team-task-manager-production-a389.up.railway.app) |
| 📖 Swagger Docs | [/swagger-ui/index.html](https://team-task-manager-production-a389.up.railway.app/swagger-ui/index.html) |

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Java 17 | Core language |
| Spring Boot 3 | REST API framework |
| Spring Security | Authentication & authorization |
| Spring Data JPA | Database ORM |
| JWT (jjwt) | Stateless token-based auth |
| MySQL | Relational database |
| Swagger / OpenAPI 3 | API documentation |
| Lombok | Boilerplate reduction |
| Maven | Build tool |

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| JWT Decode | Token parsing |

---

## ✨ Features

### 🔐 Authentication
- User **Signup** with role selection (`ADMIN` / `MEMBER`)
- User **Login** with JWT token generation
- Stateless JWT-based session (no cookies)
- Protected routes with token validation

### 👥 Role-Based Access Control (RBAC)

| Feature | ADMIN | MEMBER |
|---------|-------|--------|
| Create / Edit / Delete Projects | ✅ | ❌ |
| Add / Remove Project Members | ✅ | ❌ |
| Create / Assign Tasks | ✅ | ❌ |
| View Projects | ✅ | ✅ |
| View Assigned Tasks | ✅ | ✅ |
| Update Task Status | ✅ | ✅ (own tasks only) |
| View Dashboard Stats | ✅ | ✅ |

### 📊 Dashboard
- Total tasks count
- Pending tasks count
- Completed tasks count
- Overdue tasks count

### 📁 Project Management
- Create, update, and delete projects
- Add or remove team members from projects

### ✅ Task Management
- Create tasks with deadlines and assignments
- Filter tasks by status: `TODO`, `IN_PROGRESS`, `DONE`
- Visual status badges
- Overdue detection

---

## 🗄️ Database Schema

```
User
 ├── id (PK)
 ├── username
 ├── password (BCrypt)
 └── role (ADMIN | MEMBER)

Project
 ├── id (PK)
 ├── name
 ├── description
 └── members (ManyToMany → User)

Task
 ├── id (PK)
 ├── title
 ├── description
 ├── status (TODO | IN_PROGRESS | DONE)
 ├── dueDate
 ├── project (ManyToOne → Project)
 └── assignedTo (ManyToOne → User)
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/signup` | Register a new user | Public |
| POST | `/auth/login` | Login and receive JWT | Public |

### Projects
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/projects` | List all projects | Any |
| POST | `/projects` | Create a project | ADMIN |
| PUT | `/projects/{id}` | Update a project | ADMIN |
| DELETE | `/projects/{id}` | Delete a project | ADMIN |
| POST | `/projects/{id}/members/{userId}` | Add member | ADMIN |
| DELETE | `/projects/{id}/members/{userId}` | Remove member | ADMIN |

### Tasks
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/tasks` | List all tasks | Any |
| POST | `/tasks` | Create a task | ADMIN |
| PUT | `/tasks/{id}` | Update a task | Any |
| DELETE | `/tasks/{id}` | Delete a task | ADMIN |

### Dashboard
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/dashboard/stats` | Get task statistics | Any |

---

## ⚙️ Local Setup

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven 3.8+

---

### 1. 🗃️ Database Setup

```sql
CREATE DATABASE team_task_manager;
```

---

### 2. 🔧 Backend Setup

```bash
cd backend
```

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/team_task_manager?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

app.jwt.secret=413F4428472B4B6250655368566D5970337336763979244226452948404D6351
app.jwt.expiration=86400000
```

Run the backend:

```bash
mvn spring-boot:run
```

> API will be available at **http://localhost:8080**  
> Swagger UI: **http://localhost:8080/swagger-ui/index.html**

---

### 3. 🎨 Frontend Setup

```bash
cd frontend
npm install
```

Update `src/utils/api.js` to point to local backend:

```js
const api = axios.create({
    baseURL: 'http://localhost:8080'
});
```

Run the frontend:

```bash
npm run dev
```

> App will be available at **http://localhost:5173**

---

## ☁️ Deployment on Railway

Both the backend and frontend are deployed on **[Railway](https://railway.app)**.

### Backend Deployment
1. Push your code to GitHub.
2. Create a new **Railway project** → Add a **MySQL** database plugin.
3. Add a new **GitHub service** pointing to your backend directory.
4. Railway auto-detects Spring Boot and builds it with Maven.
5. Set the following environment variables in Railway:

| Variable | Value |
|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://<railway-mysql-host>:3306/railway` |
| `SPRING_DATASOURCE_USERNAME` | `root` |
| `SPRING_DATASOURCE_PASSWORD` | *(from Railway MySQL plugin)* |

### Frontend Deployment
1. Add a second **GitHub service** in the same Railway project pointing to your frontend directory.
2. Set the **Start Command** to: `npm run preview`
3. Set the **Build Command** to: `npm run build`
4. Set environment variable: `PORT=4173` (Vite preview default)
5. Update `frontend/src/utils/api.js` with your backend Railway URL:

```js
const api = axios.create({
    baseURL: 'https://your-backend.up.railway.app'
});
```

---

## 📂 Project Structure

```
Team-Task-Manager/
│
├── backend/
│   └── src/main/java/com/teamtask/backend/
│       ├── controller/        # REST controllers (Auth, Project, Task, Dashboard)
│       ├── dto/               # Request/Response DTOs
│       ├── entity/            # JPA entities (User, Project, Task)
│       ├── exception/         # Global exception handling
│       ├── repository/        # Spring Data JPA repositories
│       ├── security/          # JWT filter, SecurityConfig, UserDetailsService
│       └── service/           # Business logic services
│
├── frontend/
│   └── src/
│       ├── components/        # Reusable UI components
│       ├── context/           # React Auth context
│       ├── pages/             # Login, Signup, Dashboard, Projects, Tasks
│       ├── utils/             # Axios API instance
│       ├── App.jsx            # Routing setup
│       └── main.jsx           # App entry point
│
└── README.md
```

---

## 🔑 Default Test Accounts

You can sign up using the `/auth/signup` endpoint. Example:

```json
{
  "username": "admin_user",
  "password": "Password123",
  "role": "ADMIN"
}
```

```json
{
  "username": "member_user",
  "password": "Password123",
  "role": "MEMBER"
}
```

---

## 📸 Screenshots

> *(Add screenshots of Login, Dashboard, Projects, and Tasks pages here)*

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👩‍💻 Author

**Sai Reshma M**  
Full Stack Java Developer  
[GitHub](https://github.com/SaiReshmaM)

# Internal Project & Task Management Tool

A production-ready internal tool built using the MERN stack (MongoDB, Express, React, Node.js) with Tailwind CSS, where authenticated users can create projects and manage tasks using a Kanban-style board.

## Features
- **Authentication**: JWT-based secure registration and login
- **Projects**: Create, view, update, and delete projects
- **Tasks**: Add tasks to projects, categorize by status (Todo, In Progress, Done)
- **Task Management Modes**: Update task statuses seamlessly using two options:
  - **Native Drag and Drop**: Smoothly drag a task and drop it into any column.
  - **Quick Dropdown**: Choose the status from a dropdown directly on the task card.
- **Responsive UI**: Built with React, Vite, and Tailwind CSS v4

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Axios, React Router DOM, React Hot Toast, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

## Live Deployment URLs
- **Frontend (Vercel)**: [Insert Your Frontend URL Here]
- **Backend (Render)**: [Insert Your Backend URL Here]

## Folder Structure
```
project-management-tool/
├── backend/               # Node.js Express Server
│   ├── src/
│   │   ├── config/        # Database configurations
│   │   ├── controllers/   # Route handler logic
│   │   ├── middleware/    # Auth and error handlers
│   │   ├── models/        # Mongoose database models
│   │   ├── routes/        # Express routes definition
│   │   └── app.js         # App configuration
│   ├── .env.example       # Example environment variables
│   └── server.js          # Server entry point
└── frontend/              # React Vite Application
    ├── src/
    │   ├── api/           # Axios configuration with interceptors
    │   ├── components/    # Reusable UI components
    │   ├── context/       # Auth state management
    │   ├── pages/         # Application pages
    │   ├── routes/        # App routing logic
    │   └── App.jsx        # Main application component
    └── .env.example       # Frontend environment variables
```

## Installation & Setup

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository_url>
   cd project-management-tool
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update the .env file with your MongoDB connection string and JWT Secret
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Ensure VITE_API_URL matches your backend API endpoint
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/projects` | Get all projects for logged-in user | Private |
| POST | `/api/projects` | Create a new project | Private |
| PUT | `/api/projects/:id` | Update a project | Private |
| DELETE | `/api/projects/:id` | Delete a project | Private |
| GET | `/api/tasks/:projectId` | Get tasks for a specific project | Private |
| POST | `/api/tasks` | Create a new task | Private |
| PUT | `/api/tasks/:id` | Update task status | Private |
| DELETE | `/api/tasks/:id` | Delete a task | Private |

## Deployment Instructions

### Backend (Render)
1. Push the repository to GitHub.
2. Go to Render and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the Root Directory to `backend`.
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add your Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`).

### Frontend (Vercel)
1. Go to Vercel and import your GitHub repository.
2. Set the Root Directory to `frontend`.
3. Vercel will automatically detect Vite. Keep the default Build Command (`npm run build`) and Output Directory (`dist`).
4. Add the Environment Variable `VITE_API_URL` pointing to your deployed backend URL.
5. Deploy.

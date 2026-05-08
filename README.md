# Smart Police Assistance & Case Management System

A full stack system with:
- Frontend: React.js + Tailwind CSS
- Backend: Node.js (auth, upload, notifications)
- Backend: Go (case management, analytics, report generation)
- Database: MySQL
- Charts: Chart.js
- Authentication: JWT + role-based access + refresh tokens

## Structure

- `frontend/` - React + Tailwind application
- `backend-node/` - Node.js authentication, file upload, role access
- `backend-go/` - Go APIs for case management and analytics
- `db/` - SQL schema and seed examples

## Getting Started

1. Install dependencies for each service.
2. Configure environment variables from `.env.example`.
3. Create the MySQL schema using `db/schema.sql` or run `cd backend-node && npm run init-db` to initialize the `police_help_system` database.
4. Run Node backend on port `4000` and Go backend on port `5000`.
5. Start the React frontend.

## Notes

- Use separate API keys for internal communication between Node and Go services.
- Protect upload endpoints and validate files.
- Use JWT access tokens and refresh tokens for session maintenance.

# Employee Performance Analytics & Recommendation System

A MERN full-stack application with JWT authentication, employee management, analytics, and AI-powered recommendations.

## Features

- User signup / login with JWT
- Add, list, search, update, and delete employee records
- AI recommendation generation via OpenRouter/OpenAI-compatible API
- MongoDB persistence with validation
- React + Vite frontend with Tailwind CSS

## Setup

### Backend

1. Open a terminal in `backend`
2. Copy environment file:
   ```bash
   cp .env.example .env
   ```
3. Install packages:
   ```bash
   npm install
   ```
4. Set `AI_API_KEY`, `JWT_SECRET`, and `MONGO_URI` in `.env`
5. Start backend:
   ```bash
   npm run dev
   ```

### Frontend

1. Open a terminal in `frontend`
2. Copy environment file:
   ```bash
   cp .env.example .env
   ```
3. Install packages:
   ```bash
   npm install
   ```
4. Start frontend:
   ```bash
   npm run dev
   ```

## Default API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/employees`
- `GET /api/employees`
- `GET /api/employees/search?department=Development`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`
- `POST /api/ai/recommend`

## Notes

- Use the backend JWT token for protected API calls.
- The AI recommendation endpoint expects a `summary` string.
- Do not commit `.env` files or secret API keys.

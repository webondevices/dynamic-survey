# Dynamic Survey Builder

Full-stack survey app with dynamic form rendering, validation, and conditional questions.

## Tech Stack

**Backend**: Fastify, Prisma, SQLite, Zod, OpenAI
**Frontend**: React, TypeScript, Vite, Redux Toolkit, TanStack Query, React Router, CSS Modules

## Installation

```bash
npm install
npx prisma generate
npx prisma migrate dev
```

## Running

**Development** (two separate terminals):

```bash
npm run dev:server  # Server on http://localhost:3000
npm run dev:client  # Client on http://localhost:5173
```

## API Endpoints

- `GET /api/survey/config` - Get survey configuration
- `GET /api/survey/submissions` - Get all survey submissions
- `POST /api/survey/responses` - Submit survey responses (returns AI feedback)

## Client Routes

- `/` - Landing/intro page
- `/survey` - Multi-step survey form
- `/complete` - Completion page with AI feedback
- `/submissions` - View all submissions

## Features

- Dynamic form rendering from config
- Shared Zod validation (client + server)
- Conditional questions based on answers
- Multiple question types (text, textarea, rating, multiple choice, yes/no, etc.)
- Multi-step navigation with progress tracking
- Dark mode toggle
- AI-generated personalized feedback via OpenAI
- Responsive design

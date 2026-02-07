# Creator Connect Hub

Creator Connect Hub is a full-stack MVP that helps creators discover collaborators, build profiles, and view performance insights. The frontend is a Vite + React app, and the backend is an Express API backed by Firebase Firestore.

## What it does

- Public discovery of creator profiles and featured content
- User authentication (email + password) for access to the dashboard
- Creator onboarding that writes profiles to Firestore
- Analytics data fetched from Firestore through the backend API

## Project structure

```
client/   # Vite + React frontend
server/   # Express + Firestore backend
```

## Prerequisites

- Node.js 22.12+ (or 20.19+)
- A Firebase project with Firestore enabled
- A Firebase service account JSON for the backend

## Environment variables

**client/.env**
```
VITE_API_BASE_URL=http://localhost:5174
VITE_DEFAULT_CREATOR_ID=your_creator_doc_id
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**server/.env**
```
PORT=5174
CORS_ORIGIN=http://localhost:5173
FIREBASE_SERVICE_ACCOUNT_PATH=path_to_service_account.json
```

## Install

From the repo root:
```
npm install --workspaces
```

## Run (local)

Start the backend:
```
npm run dev:server
```

Start the frontend:
```
npm run dev
```

## Seed data (optional)

If you want sample creators and analytics:
```
npm run seed
```

## Tech stack

- Frontend: Vite, React, TypeScript, Tailwind, shadcn/ui
- Backend: Express
- Database: Firebase Firestore

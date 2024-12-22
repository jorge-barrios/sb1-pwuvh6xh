# Print Request Manager

A full-stack application for managing print requests with a React frontend and Express backend.

## Features

- Webhook endpoint for receiving print requests
- Real-time request management interface
- Accept/Reject functionality with webhook integration
- SQLite database for request storage
- Automatic UI updates every 5 seconds

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. In a separate terminal, start the backend server:
   ```bash
   npm run server
   ```

## API Endpoints

- `POST /webhook` - Receive new print requests
- `GET /requests` - Get all pending requests
- `POST /decide/:requestId` - Accept or reject a request

## Environment Variables

Update the `MAKE_WEBHOOK_URL` in `src/App.tsx` with your Make webhook endpoint.

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Express.js
- Database: SQLite (in-memory)
- Additional: Zod for validation, React Hot Toast for notifications
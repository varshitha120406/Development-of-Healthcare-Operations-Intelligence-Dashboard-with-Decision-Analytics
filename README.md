
# Development of Healthcare Operations Intelligence Dashboard with Decision Analytics

A Medical Operations Intelligence Dashboard built with React, Vite, Express, MongoDB, Recharts, JWT authentication, and an AI copilot with a local demo fallback.

## Requirements
- Windows 10/11
- Node.js 20+
- MongoDB Community Server running locally on port 27017

## First Setup

Open Command Prompt in the project folder and run:

```cmd
npm install
npm run install:all
npm run seed
npm run dev
```

If `npm run install:all` fails because a package is already installed, install the dependencies separately:

```cmd
cd server
npm install
cd ..
cd client
npm install
cd ..
```

## Demo Login

- Email: `admin@medops.local`
- Password: `Demo@12345`
- Display name: Gandhe Varshitha

Other demo users:
- `doctor@medops.local` / `Demo@12345`
- `billing@medops.local` / `Demo@12345`
- `pharmacy@medops.local` / `Demo@12345`

## Start the Application

From the root project folder, run:

```cmd
npm run dev
```

This starts the API at `http://localhost:5000` and the frontend at `http://localhost:5173`, depending on port availability.

## Features

- Executive KPI dashboard
- Patient trends and revenue analytics
- Patient flow and facility comparisons
- AI executive summary and copilot
- Navigation, search, filters, alerts, and quick actions
- Report downloads and workflow automation

## Data Notice

The included data is synthetic demo data. It is not real patient information and must not be used for clinical decision-making.

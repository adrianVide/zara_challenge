# MBST Mobile Phones - Zara Challenge

E-commerce web app for browsing and managing a mobile phone catalog. Built with Next.js 16, React 19, TypeScript, and deployed with Docker.

## Deployed on

> **Live Demo:** http://144.91.79.171:3060/

## Notes

1. First load might take longer since the backend server goes to sleep if not queried in a certain amount of time.
2. API URL and API key values hardcoded to make the assesment easier, avoiding using env variables.

## Quick Start

```bash
# Install dependencies
npm install

# Development mode (unminified assets)
npm run dev
# → http://localhost:3000

# Production build (concatenated & minified)
npm run build
npm start
# → http://localhost:3000
```

## Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Production build (no checks)
npm run build:with-checks # Build with quality checks
npm start                # Start production server

# Quality Checks
npm run lint             # Check code quality
npm run format           # Format code
npm run type-check       # TypeScript validation
npm run test             # Run tests (watch mode)
npm run test:run         # Run tests (once)
npm run test:coverage    # Generate coverage report
```

## Features Implemented

✅ **3 Main Views:** Phone list, detail, and cart
✅ **Real-time Search:** API-filtered by name/brand, debounced
✅ **Dynamic Pricing:** Updates with color/storage selection
✅ **Persistent Cart:** localStorage-based
✅ **Responsive Design:** Mobile-first approach
✅ **Accessibility:** ARIA labels & semantic HTML
✅ **64 Tests:** Vitest + React Testing Library

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** CSS Modules with Helvetica font
- **State:** React Context API
- **Testing:** Vitest + React Testing Library
- **Quality:** ESLint + Prettier + Husky
- **Deployment:** Docker (multi-stage build)

## Extras

🚀 **SSR:** Server-Side Rendering with Next.js
🚀 **Params URL:** URL with params for improved shareability
🚀 **Docker:** Production-ready containerization
🚀 **Pre-commit hooks:** Automated quality checks
🚀 **Pagination:** 20 items per page
🚀 **Loading states:** Enhanced UX

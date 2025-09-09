# Payzee Frontend

The frontend application for Payzee, a Solana-based payment gateway.

## Features

- User authentication (sign in/up)
- Dashboard for merchants
- Project management
- API key generation
- Transaction initiation and monitoring
- Wallet integration with Phantom
- QR code generation for payments

## Tech Stack

- React 18
- Vite
- TailwindCSS with DaisyUI
- React Router v6
- Axios for API requests
- Solana Web3.js for blockchain interactions
- Material UI and Heroicons for UI components

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables (copy `.env.example` to `.env` and update values):

   ```bash
   cp .env.example .env
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting with Prettier
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── features/              # Feature-based components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   ├── landing/           # Landing page components
│   ├── sidebar/           # Sidebar components
│   ├── transfer/          # Transfer page components
│   ├── DocsPage.jsx       # Documentation page
│   ├── NotFoundPage.jsx   # 404 page
│   └── index.js           # Feature exports
├── shared/                # Shared components and utilities
│   ├── auth/              # Authentication wrappers
│   ├── components/        # Reusable UI components
│   ├── layout/            # Layout components
│   ├── navigation/        # Navigation components
│   ├── wallet/            # Wallet wrappers
│   └── utils/             # Shared utility functions
├── context/               # React context providers
│   ├── api/               # API context
│   └── user/              # User context
├── routes/                # Application routing
│   ├── PublicRoutes.jsx   # Public routes
│   ├── DashboardRoutes.jsx # Dashboard routes
│   ├── SidebarRoutes.jsx  # Sidebar routes
│   └── index.jsx          # Main routing component
├── utils/                 # Utility functions
│   ├── helpers.js         # Helper functions
│   └── index.js           # Utility exports
├── layouts/               # Page layouts
│   └── DashboardLayout.jsx # Dashboard layout
├── styles/                # Global styles
└── assets/                # Static assets
```

## Environment Variables

- `VITE_PAYZEE_API_URL` - The URL of the backend API

## Development

The project follows a feature-first organization where components are grouped by feature rather than type. This makes it easier to locate and maintain related functionality.

### Code Quality

- ESLint is configured for code linting
- Prettier is configured for code formatting
- Run `npm run format` to format all files
- Run `npm run lint` to check for linting issues

## Deployment

To deploy the application:

1. Build the project:

   ```bash
   npm run build
   ```

2. The built files will be in the `dist` directory, which can be served by any static file server.

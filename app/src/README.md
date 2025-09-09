# Payzee Frontend Architecture

This document describes the frontend architecture for the Payzee application, organized following production-ready best practices.

## Directory Structure

```
src/
├── features/              # Feature-based components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   ├── landing/           # Landing page components
│   ├── sidebar/           # Sidebar components
│   ├── transfer/           # Transfer page components
│   ├── DocsPage.jsx       # Documentation page
│   ├── NotFoundPage.jsx    # 404 page
│   └── index.js           # Feature exports
├── shared/                # Shared components and utilities
│   ├── auth/              # Authentication wrappers
│   ├── components/        # Reusable UI components
│   ├── layout/            # Layout components
│   ├── navigation/        # Navigation components
│   ├── wallet/            # Wallet wrappers
│   └── utils/             # Shared utility functions
├── context/                # React context providers
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

## Feature Organization

Each feature directory contains:

- Page components (e.g., `AuthPage.jsx`)
- Related components
- Feature-specific index file for exports

### Feature Descriptions

1. **Auth (`/features/auth/`)**
   - Authentication pages (login/signup)
   - Form components
   - State management for auth flows

2. **Dashboard (`/features/dashboard/`)**
   - Merchant dashboard components
   - Project management
   - API key generation
   - Transaction viewing
   - Analytics visualization

3. **Landing (`/features/landing/`)**
   - Homepage and marketing pages
   - Feature showcases
   - Call-to-action components

4. **Sidebar (`/features/sidebar/`)**
   - Wallet interaction components
   - Send/receive/swap functionality
   - QR code generation

5. **Transfer (`/features/transfer/`)**
   - Payment transfer pages
   - Transaction initiation

## Shared Components

Shared components are organized by purpose:

1. **Auth (`/shared/auth/`)**
   - Authentication wrappers
   - Protected route components

2. **Components (`/shared/components/`)**
   - Reusable UI components (Input, Button, etc.)
   - Component variants and compositions

3. **Layout (`/shared/layout/`)**
   - Global layout components (Header, Footer, etc.)
   - Page structure components

4. **Navigation (`/shared/navigation/`)**
   - Navigation menus
   - Breadcrumbs
   - Tab components

5. **Wallet (`/shared/wallet/`)**
   - Wallet connection wrappers
   - Blockchain interaction utilities

## Routing

The routing system is modular:

- **PublicRoutes** - Handles public-facing pages (landing, auth, docs)
- **DashboardRoutes** - Handles authenticated dashboard routes
- **SidebarRoutes** - Handles wallet interaction routes

## Context Providers

1. **API Context** - Manages API requests and authentication
2. **User Context** - Manages user state and wallet interactions

## Utilities

Utility functions are centralized in `/utils/helpers.js`:

- Currency formatting
- Date formatting
- Address truncation
- Clipboard operations
- Validation functions
- Performance utilities (debounce, throttle)

## Best Practices Implemented

1. **Feature-first organization** - Components grouped by feature rather than type
2. **Lazy loading** - Routes and components loaded on-demand
3. **Code splitting** - Separation of concerns with clear boundaries
4. **Reusable components** - Shared components for consistent UI
5. **Context management** - Centralized state management
6. **Modular routing** - Scalable routing architecture
7. **Utility consolidation** - Common functions in one place
8. **Clear exports** - Index files for easy imports

## File Naming Conventions

- Components: PascalCase (`Button.jsx`, `DashboardLayout.jsx`)
- Directories: camelCase or kebab-case (`auth/`, `dashboard/`)
- Utility files: camelCase (`helpers.js`)
- Configuration files: dot notation (`.eslintrc`, `.prettierrc`)

## Scalability Considerations

This structure supports:

- Easy addition of new features
- Independent development of feature modules
- Clear separation of concerns
- Reusable component libraries
- Maintainable routing system
- Centralized state management
- Consistent styling and UI patterns

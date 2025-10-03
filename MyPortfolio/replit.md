# Overview

This is a full-stack web application built with React (Vite) on the frontend and Express.js on the backend. The project is a portfolio website showcasing a developer's work, skills, and contact information. It uses a modern TypeScript-based architecture with a monorepo structure that shares types and schemas between client and server. The application features a component-based UI built with shadcn/ui and Radix UI primitives, styled with Tailwind CSS.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Build Tool**: React 18+ with Vite for fast development and optimized production builds. TypeScript is used throughout for type safety.

**UI Component System**: Built on shadcn/ui (new-york style) with Radix UI primitives, providing accessible and customizable components. The component library includes 40+ pre-built components for common UI patterns.

**Styling**: Tailwind CSS with CSS variables for theming support. Custom design system configured with consistent spacing, colors, and typography scales. Uses the Inter font family for text and JetBrains Mono for code.

**State Management**: TanStack Query (React Query) for server state management with configured defaults for query caching and refetching behavior. Custom hooks for toast notifications and mobile detection.

**Routing**: Wouter for lightweight client-side routing with a simple switch-based route configuration.

**Design Patterns**: 
- Component composition with Radix UI's Slot pattern for flexible component APIs
- Custom utility function (cn) for conditional class merging
- Centralized path aliases (@/, @shared/, @assets/) for clean imports
- Separation of UI components from page components

## Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js. The server handles both API routes and serves the built frontend in production.

**Development Setup**: Custom Vite middleware integration for hot module replacement during development. The server proxies requests to Vite's dev server and handles SSR template injection.

**Storage Layer**: Abstracted storage interface (IStorage) with an in-memory implementation (MemStorage) for CRUD operations. Designed to be easily swappable with a database-backed implementation.

**API Design**: RESTful API pattern with all routes prefixed with `/api`. Includes request logging middleware that captures method, path, status code, duration, and response body for API calls.

**Session Management**: Configured to use connect-pg-simple for PostgreSQL-backed sessions (though not yet implemented in routes).

## Data Storage

**ORM**: Drizzle ORM configured for PostgreSQL with Neon serverless driver support.

**Schema Definition**: Centralized in `shared/schema.ts` for type sharing between client and server. Currently defines a users table with UUID primary keys and Zod validation schemas.

**Migrations**: Drizzle Kit configured to output migrations to `./migrations` directory with push-based workflow.

**Type Safety**: Uses Drizzle's type inference for compile-time type checking and Zod schemas for runtime validation.

## External Dependencies

**Database**: PostgreSQL (via Neon serverless adapter) - configured but database operations not yet implemented in routes.

**UI Libraries**:
- Radix UI for accessible component primitives
- Lucide React for icons
- class-variance-authority for variant-based component styling
- Embla Carousel for carousel functionality
- date-fns for date manipulation

**Development Tools**:
- Replit-specific plugins for error overlay, cartographer, and dev banner
- ESBuild for server-side bundling in production
- PostCSS with Tailwind and Autoprefixer

**Form Handling**: React Hook Form with Hookform Resolvers for validation integration (dependencies present but not yet utilized in codebase).

**Code Quality**: TypeScript with strict mode enabled, comprehensive type checking across client, server, and shared code.
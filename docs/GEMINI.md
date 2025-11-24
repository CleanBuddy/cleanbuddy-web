# CleanBuddy Web - Development Rules for Gemini

This document outlines the development rules and best practices for the CleanBuddy web application, specifically tailored for interaction with the Gemini AI agent. Following these guidelines will ensure that Gemini can effectively understand, assist, and contribute to the project in a consistent and high-quality manner.

## 🤖 INTERACTING WITH GEMINI

To get the most out of Gemini, consider the following when making requests:

*   **Be Clear and Specific:** Clearly articulate your goal, the context, and any specific requirements. Avoid ambiguity.
*   **Provide Context:** When referring to code, provide relevant file paths or code snippets. Explain the "why" behind your request.
*   **State the Desired Outcome:** What do you expect Gemini to achieve? (e.g., "fix a bug," "implement a feature," "refactor this code to improve performance").
*   **Reference Existing Rules:** If your request relates to a specific rule in this document, mention it.
*   **Verify Changes:** Gemini will provide its changes. Always review and verify them.

---

## Project Overview

This is the CleanBuddy web application built with Next.js 16, featuring:
- React 19 and TypeScript
- Apollo Client for GraphQL
- shadcn/ui component library
- Google OAuth authentication
- Multi-tenant team/project architecture

## Technology Stack

### Core Technologies
- **Next.js 16**: App Router, Server Components, Turbopack
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Full type safety
- **Tailwind CSS 4**: Utility-first styling
- **Apollo Client**: GraphQL state management
- **GraphQL Code Generator**: Automatic type generation

### Key Libraries
- **@react-oauth/google**: Google OAuth integration
- **shadcn/ui**: Component library (Radix UI primitives)
- **react-hook-form**: Form management
- **zod**: Schema validation
- **lucide-react**: Icon library

## Development Guidelines

### React & Next.js Patterns

1.  **Use Server Components by default**
    - Only add "use client" when necessary
    - Client components needed for: hooks, event handlers, browser APIs

2.  **File naming conventions**
    - Components: PascalCase (e.g., `TeamSwitcher.tsx`)
    - Utilities: kebab-case (e.g., `apollo-client.ts`)
    - Pages: lowercase (e.g., `page.tsx`, `layout.tsx`)

3.  **Import paths**
    - Always use `@/` alias for absolute imports
    - Example: `import { Button } from "@/components/ui/button"`

### GraphQL Integration

1.  **Type generation**
    - Run `npm run codegen` after modifying `.graphql` files
    - Always import types from `@/lib/api/_gen/gql`
    - Never create manual type definitions for API types

2.  **Operation files**
    - Define operations in `lib/graphql/*.graphql` files
    - Group by domain: auth, user, team, project
    - Use fragments for reusable field selections

3.  **Apollo Client hooks**
    - Use generated hooks (e.g., `useCurrentUserQuery`)
    - Handle loading and error states
    - Use `refetchQueries` for cache updates

### Component Guidelines

1.  **shadcn/ui components**
    - Use existing components from `components/ui/`
    - Follow shadcn conventions for styling
    - Don't modify ui components directly

2.  **Custom components**
    - Place in appropriate subdirectory
    - Export named exports (not default)
    - Include TypeScript interfaces for props

3.  **Styling**
    - Use Tailwind utility classes
    - Follow mobile-first approach
    - Use `cn()` utility for conditional classes

### State Management

1.  **Apollo Client**
    - Use for server state (GraphQL data)
    - Leverage cache for optimistic updates
    - Use reactive variables for global state

2.  **React Context**
    - Use for cross-cutting concerns
    - TeamProvider for team/project selection
    - DialogProvider for dialog management

3.  **Local State**
    - Use `useState` for component-local state
    - Use `useReducer` for complex state logic

### Authentication

1.  **Token management**
    - Tokens stored in secure httpOnly cookies
    - Automatic refresh with error handling
    - Protected routes check authentication

2.  **Protected routes**
    - Dashboard routes protected by default
    - Redirect to `/auth` if not authenticated
    - Use `useTeam` hook for user data

### Responsive Design

1.  **Breakpoints**
    - Mobile-first approach
    - Single breakpoint at 768px (`md:`)
    - Pattern: `className="mobile-styles md:desktop-styles"`

2.  **Testing**
    - Test on mobile and desktop
    - Use responsive components from shadcn/ui
    - Consider touch interactions

## Code Quality

### TypeScript

1.  **Type safety**
    - Enable strict mode
    - No `any` types (use `unknown` if needed)
    - Explicit return types for functions

2.  **Interfaces vs Types**
    - Use `interface` for object shapes
    - Use `type` for unions and intersections

### Best Practices

1.  **Error handling**
    - Always handle GraphQL errors
    - Show user-friendly error messages
    - Log errors for debugging

2.  **Performance**
    - Lazy load heavy components
    - Use React.memo for expensive renders
    - Optimize images with next/image

3.  **Accessibility**
    - Use semantic HTML
    - Include ARIA labels
    - Test keyboard navigation

## Build & Code Generation

### GraphQL Type Generation

**MANDATORY after GraphQL changes:**

```bash
npm run codegen
```

**When to run codegen:**
- ✅ After API schema changes
- ✅ After modifying `.graphql` files in `lib/graphql/`
- ✅ After adding new queries/mutations
- ✅ Before committing GraphQL operation changes
- ✅ After pulling git changes that modified GraphQL operations

**Prerequisites:**
⚠️ **API MUST BE RUNNING** on `http://localhost:8080/api` (or your configured endpoint)

**Generated files (DO NOT EDIT MANUALLY):**
- `lib/api/_gen/gql.tsx` - TypeScript types, hooks, and operations (60KB+)
- `lib/api/_gen/fragmentTypes.tsx` - Fragment matching for Apollo Client

**Common errors:**

```bash
# Error: Cannot query field "xyz"
# Solution: Check API schema has that field, regenerate API first

# Error: Connection refused
# Solution: Start the API server first

# Error: ENOENT: no such file
# Solution: Ensure lib/graphql/*.graphql files exist
```

### Build Process

**Development build (with Turbopack):**

```bash
npm run dev
# Starts on http://localhost:3000
# Hot module replacement enabled
# Fast refresh for React components
```

**Production build:**

```bash
npm run build
# Creates optimized .next directory
# Performs type checking
# Optimizes bundles and assets
# Generates static pages

npm run start
# Serves production build
```

**Build requirements:**
- All TypeScript errors must be fixed
- GraphQL types must be generated
- API endpoint must be configured in `.env.local`

### Environment Variables

**IMPORTANT: Build-time vs Runtime**

- Variables prefixed with `NEXT_PUBLIC_` are **embedded at build time**
- Changing `NEXT_PUBLIC_*` variables **requires rebuild**
- Non-prefixed variables are **server-side only**

**Required environment variables:**

```bash
# .env.local
NEXT_PUBLIC_API_ENDPOINT=http://localhost:8080/api
NEXT_PUBLIC_WS_ENDPOINT=ws://localhost:8080/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
NEXT_PUBLIC_ENVIRONMENT=development
```

**After changing environment variables:**
1.  Restart dev server (`npm run dev`)
2.  For production: rebuild (`npm run build`)

### Dependency Management

**Installing dependencies:**

```bash
# Add runtime dependency
npm install <package>

# Add dev dependency
npm install -D <package>

# Install all dependencies (after pulling changes)
npm install
```

**After pulling git changes:**
```bash
# If package-lock.json changed
npm install

# If GraphQL operations changed
npm run codegen
```

**Adding UI components from shadcn/ui:**

```bash
npx shadcn add <component-name>
# Examples:
# npx shadcn add button
# npx shadcn add dialog
# npx shadcn add form

# Components installed to components/ui/
```

### Pre-Commit Checklist

Before committing code:

-   [ ] `npm run lint` passes (ESLint)
-   [ ] `npm run build` succeeds (production build)
-   [ ] GraphQL types generated (`npm run codegen`)
-   [ ] No TypeScript errors (`npx tsc --noEmit`)
-   [ ] Environment variables documented (if new ones added)
-   [ ] Test in browser (both mobile and desktop)

### Build Commands Reference

```bash
# Code Generation
npm run codegen                  # Generate GraphQL types (requires API running)

# Development
npm run dev                      # Start dev server with Turbopack

# Building
npm run build                    # Production build
npm run start                    # Start production server

# Quality Checks
npm run lint                     # Run ESLint
npx tsc --noEmit                # Type check without building

# Dependencies
npm install                      # Install/update dependencies
npm install <package>            # Add new dependency
npx shadcn add <component>      # Add shadcn/ui component

# Cleanup
rm -rf .next                    # Clear build cache
rm -rf node_modules             # Remove dependencies (nuclear option)
```

### Common Build Issues

**Issue: "Cannot find module" or import errors**
```bash
# Solution 1: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Solution 2: Clear Next.js cache
rm -rf .next
npm run dev
```

**Issue: Stale GraphQL types**
```bash
# Delete generated files and regenerate
rm -rf lib/api/_gen/*
npm run codegen
```

**Issue: Type errors in generated code**
```bash
# Usually means:
# 1. API schema changed but Web types not regenerated
# 2. Operation references non-existent fields

# Solution: Ensure API is running, then regenerate
cd ../saas-starter-api && go run github.com/99designs/gqlgen generate
# Start API: ./run.sh
cd ../saas-starter-web && npm run codegen
```

**Issue: Build fails with environment variable error**
```bash
# Missing NEXT_PUBLIC_ prefix for client-side variables
# Check .env.local has all required variables
# Restart dev server after changes
```

**Issue: "Module not found: Can't resolve '@/...'"**
```bash
# Path alias issue - check tsconfig.json
# Verify paths configuration exists:
# "paths": { "@/*": ["./*"] }

# Restart TypeScript server in IDE
```

### Workflow for Schema Changes

When the API GraphQL schema changes:

```bash
# 1. Ensure API is running with new schema
cd cleanbuddy-api
go run github.com/99designs/gqlgen generate
./run.sh

# 2. Regenerate Web types
cd ../cleanbuddy-web
npm run codegen

# 3. Update operations if needed
# Edit lib/graphql/*.graphql files

# 4. Regenerate again if operations changed
npm run codegen

# 5. Test changes
npm run dev
# Verify queries work in browser Network tab
```

### Performance Optimization

**Build optimization tips:**

1.  **Use dynamic imports for heavy components:**
    ```typescript
    const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'))
    ```

2.  **Optimize images:**
    ```typescript
    import Image from 'next/image'
    // Use next/image for automatic optimization
    ```

3.  **Check bundle size:**
    ```bash
    npm run build
    # Review output for large bundles
    # Consider code splitting for large pages
    ```

4.  **Enable experimental features (next.config.ts):**
    - Turbopack for dev (already enabled)
    - Optimistic client caching

## Project Commands

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run codegen      # Generate GraphQL types
```

## File Structure Conventions

### App Directory (`app/`)
- Routes defined by folder structure
- `page.tsx`: Route component
- `layout.tsx`: Shared layout
- `loading.tsx`: Loading UI
- `error.tsx`: Error boundary

### Components (`components/`)
- `ui/`: shadcn/ui components (don't modify)
- `providers/`: Context providers
- `sidebar/`: Navigation components
- `dialogs/`: Dialog components
- `layout/`: Layout components

### Lib Directory (`lib/`)
- `apollo-client.ts`: Apollo setup
- `auth.ts`: Auth utilities
- `utils.ts`: Helper functions
- `graphql/`: GraphQL operations
- `api/_gen/`: Generated types (auto-generated)

## Common Tasks

### Adding a New Page

1.  Create route folder in `app/`
2.  Add `page.tsx` with component
3.  Update navigation if needed

### Adding a GraphQL Operation

1.  Add operation to appropriate `.graphql` file
2.  Run `npm run codegen`
3.  Import generated hook
4.  Use in component

### Adding a UI Component

1.  Check if shadcn/ui has it: `npx shadcn add [component]`
2.  If custom, create in `components/`
3.  Follow naming conventions
4.  Export from component file

### Adding a Dialog

1.  Create dialog component in `components/dialogs/`
2.  Use `IDialogBaseProps` interface
3.  Open with `useDialog` hook
4.  Handle close/dismiss callbacks

## Testing Checklist

Before committing:
-   [ ] Run `npm run lint`
-   [ ] Run `npm run build`
-   [ ] Test authentication flow
-   [ ] Test on mobile and desktop
-   [ ] Check console for errors
-   [ ] Verify GraphQL operations work

## Resources

-   [Next.js Docs](https://nextjs.org/docs)
-   [shadcn/ui Docs](https://ui.shadcn.com)
-   [Apollo Client Docs](https://www.apollographql.com/docs/react)
-   [Tailwind CSS Docs](https://tailwindcss.com/docs)

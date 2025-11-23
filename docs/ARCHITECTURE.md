# Architecture Overview

Understanding the SaaS Starter Web architecture.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Next.js App                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │              App Router (RSC)                      │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │          Client Components                   │  │  │
│  │  │  ┌──────────────────────────────────────┐   │  │  │
│  │  │  │    React Context Providers           │   │  │  │
│  │  │  │  - TeamProvider                      │   │  │  │
│  │  │  │  - DialogProvider                    │   │  │  │
│  │  │  │  - ThemeProvider                     │   │  │  │
│  │  │  └──────────────────────────────────────┘   │  │  │
│  │  │  ┌──────────────────────────────────────┐   │  │  │
│  │  │  │    Apollo Client                     │   │  │  │
│  │  │  │  - GraphQL Cache                     │   │  │  │
│  │  │  │  - Reactive Variables                │   │  │  │
│  │  │  └──────────────────────────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                        │
                        │ GraphQL / WebSocket
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  Backend API (GraphQL)                   │
│  - Authentication                                        │
│  - Teams & Projects                                      │
│  - Business Logic                                        │
└─────────────────────────────────────────────────────────┘
```

## Core Layers

### 1. Presentation Layer (App Router)

**Location**: `app/`

The Next.js App Router handles:
- **Routing**: File-based routing with dynamic segments
- **Layouts**: Shared layouts across routes
- **Server Components**: Default for optimal performance
- **Client Components**: Interactive UI with "use client"

### 2. State Management

**Apollo Client** (`lib/apollo-client.ts`)
- GraphQL cache for server state
- Automatic query deduplication
- Optimistic updates
- WebSocket support for subscriptions

**React Context Providers** (`components/providers/`)
- **TeamProvider**: User, team, and project selection
- **DialogProvider**: Centralized dialog management
- **ThemeProvider**: Dark/light mode
- **ApolloClientProvider**: GraphQL client wrapper

### 3. Component Layer

**UI Components** (`components/ui/`)
- 43+ shadcn/ui components
- Built on Radix UI primitives
- Fully accessible and customizable

**Feature Components** (`components/`)
- Sidebar navigation
- Dialogs for team/project creation
- Layout components
- Business logic components

### 4. Data Layer

**GraphQL Operations** (`lib/graphql/`)
- Organized by domain (auth, user, team, project)
- Type-safe with code generation
- Fragments for reusable fields

**Generated Types** (`lib/api/_gen/`)
- Auto-generated from GraphQL schema
- TypeScript types for all operations
- React hooks for queries/mutations

## Data Flow

### Authentication Flow

```
1. User clicks "Sign In with Google"
2. GoogleOAuthProvider handles OAuth flow
3. Backend verifies OAuth code
4. Backend returns access + refresh tokens
5. Tokens stored in httpOnly cookies
6. Apollo Client includes token in requests
7. TeamProvider fetches user data
8. User redirected to dashboard
```

### Team Selection Flow

```
1. TeamProvider parses route params
2. Extracts teamId and projectId from URL
3. Fetches user's teams and projects
4. Matches route params to data
5. Sets selectedTeam and selectedProject
6. Components access via useTeam() hook
```

### GraphQL Request Flow

```
1. Component calls Apollo hook (useQuery/useMutation)
2. Apollo checks cache first
3. If not cached, sends HTTP/WebSocket request
4. Auth link adds Bearer token header
5. Error link handles auth failures
6. Response cached in Apollo store
7. Component receives data and re-renders
```

## Key Design Patterns

### 1. Provider Pattern

All cross-cutting concerns use React Context:
- Avoids prop drilling
- Centralized state management
- Easy to test and mock

### 2. Hooks Pattern

Custom hooks encapsulate logic:
- `useTeam()`: Access team/project data
- `useDialog()`: Open dialogs programmatically
- `useTokenRefresh()`: Automatic token refresh

### 3. Container/Presentational

Separate data fetching from UI:
- **Container**: Handles data fetching (GraphQL)
- **Presentational**: Pure UI components
- Better testing and reusability

### 4. Optimistic Updates

Update UI immediately, rollback on error:
```typescript
const [updateTeam] = useUpdateTeamMutation({
  optimisticResponse: {
    updateTeam: { id, displayName: newName }
  }
});
```

## Security Architecture

### Authentication
- OAuth 2.0 with Google
- Secure httpOnly cookies
- Automatic token refresh
- CSRF protection

### Authorization
- JWT tokens with expiration
- Role-based access (owner/member)
- Protected routes
- Server-side validation

### Data Protection
- Content Security Policy headers
- XSS protection
- HTTPS enforcement (production)
- Secure cookie flags

## Performance Optimization

### Code Splitting
- Automatic with Next.js App Router
- Dynamic imports for heavy components
- Route-based splitting

### Caching Strategy
- Apollo Client caches GraphQL data
- Normalized cache for efficiency
- Cache-first fetch policy
- Automatic cache updates

### Image Optimization
- next/image for automatic optimization
- Lazy loading images
- WebP format support

## Monitoring & Debugging

### Development Tools
- React DevTools
- Apollo DevTools
- Next.js DevTools (Turbopack)

### Error Handling
- Error boundaries for React errors
- Apollo error link for GraphQL errors
- Comprehensive error logging

### Logging
- Console logging in development
- Structured logging for production
- Error tracking (add Sentry/similar)

## Scalability Considerations

### Horizontal Scaling
- Stateless Next.js instances
- Session stored in cookies
- GraphQL API handles state

### Caching
- Apollo Client cache
- Browser cache headers
- CDN for static assets

### Bundle Size
- Tree shaking enabled
- Code splitting by route
- Lazy load heavy dependencies

## Further Reading

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Apollo Client Architecture](https://www.apollographql.com/docs/react/why-apollo)
- [React Context Patterns](https://react.dev/reference/react/useContext)

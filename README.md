# CleanBuddy Web

The modern web application for CleanBuddy, built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Features

- **Authentication**: Google OAuth integration with secure token management
- **Role-Based Access**: Support for clients, cleaners, company admins, and global admins
- **Application System**: Users can apply to become cleaners or company admins
- **Modern UI**: 43+ shadcn/ui components with dark mode support
- **GraphQL Integration**: Apollo Client with automatic code generation
- **Type Safety**: Full TypeScript support with GraphQL type generation
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Security**: Secure httpOnly cookies, CSP headers, and protected routes
- **Developer Experience**: Hot reload, ESLint, and comprehensive documentation

## Tech Stack

- **Framework**: Next.js 16 with App Router and Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Apollo Client with reactive variables
- **Authentication**: Google OAuth via @react-oauth/google
- **GraphQL**: Apollo Client with GraphQL Code Generator
- **Forms**: react-hook-form with Zod validation

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- A GraphQL API backend (see cleanbuddy-api)
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cleanbuddy-web
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
NEXT_PUBLIC_API_ENDPOINT=http://localhost:8080
NEXT_PUBLIC_WS_ENDPOINT=ws://localhost:8080
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth
NEXT_PUBLIC_ENVIRONMENT=development
```

4. Generate GraphQL types:
```bash
npm run codegen
```

5. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
cleanbuddy-web/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Landing page
│   ├── globals.css        # Global styles
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard pages
│   ├── about/             # Static pages
│   ├── privacy/
│   ├── terms/
│   └── contact/
├── components/            # React components
│   ├── ui/               # shadcn/ui components (43+)
│   ├── providers/        # Context providers
│   ├── sidebar/          # Navigation components
│   ├── dialogs/          # Dialog components
│   └── layout/           # Layout components
├── lib/                  # Utilities and configuration
│   ├── apollo-client.ts  # Apollo Client setup
│   ├── auth.ts          # Authentication utilities
│   ├── utils.ts         # Helper functions
│   ├── graphql/         # GraphQL operations
│   └── api/_gen/        # Generated GraphQL types
├── hooks/               # Custom React hooks
├── public/              # Static assets
├── docs/                # Documentation
└── .claude/             # Claude AI commands
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run codegen` - Generate GraphQL types

## Documentation

- [Setup Guide](./docs/SETUP.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Component Guide](./docs/COMPONENTS.md)
- [Styling Guide](./docs/STYLING.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Claude Rules](./CLAUDE_RULES.md)

## Key Features

### Authentication

- Google OAuth integration
- Secure httpOnly cookie storage
- Automatic token refresh
- Protected routes with authentication checks

### Role & Application Management

- Multi-role user system (Client, Cleaner, Company Admin, Global Admin)
- Application submission for role upgrades
- Admin dashboard for reviewing applications
- Role-based access control

### GraphQL Integration

- Type-safe GraphQL operations
- Automatic code generation
- Apollo Client with caching
- WebSocket support for subscriptions

### UI Components

- 43+ shadcn/ui components
- Dark mode support
- Responsive design
- Accessible components (Radix UI)

## Environment Variables

See `.env.example` for all available environment variables:

- `NEXT_PUBLIC_API_ENDPOINT` - GraphQL API endpoint
- `NEXT_PUBLIC_WS_ENDPOINT` - WebSocket endpoint for subscriptions
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `NEXT_PUBLIC_GOOGLE_REDIRECT_URI` - OAuth redirect URI
- `NEXT_PUBLIC_ENVIRONMENT` - Environment (development/production)

## Deployment

This template can be deployed to:

- Vercel (recommended)
- Netlify
- AWS Amplify
- Docker container
- Any Node.js hosting

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions.

## License

MIT License - feel free to use this template for your projects.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

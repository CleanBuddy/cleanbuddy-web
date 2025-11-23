# Setup Guide

Complete setup instructions for SaaS Starter Web.

## Prerequisites

- **Node.js**: Version 20 or higher
- **npm**: Version 9 or higher
- **Backend API**: Running GraphQL API (see saas-starter-api)
- **Google OAuth**: OAuth 2.0 credentials

## Initial Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd saas-starter-web

# Install dependencies
npm install
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/auth`
5. Copy the Client ID

### 3. Environment Configuration

Create `.env` file:

```bash
cp .env.example .env
```

Update with your values:

```env
# API Configuration
NEXT_PUBLIC_API_ENDPOINT=http://localhost:8080
NEXT_PUBLIC_WS_ENDPOINT=ws://localhost:8080

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth

# Environment
NEXT_PUBLIC_ENVIRONMENT=development
```

### 4. Generate GraphQL Types

```bash
npm run codegen
```

This generates TypeScript types from your GraphQL schema.

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Verification

### Check Installation

1. **Homepage loads**: Navigate to `http://localhost:3000`
2. **Authentication works**: Click "Sign In" and authenticate with Google
3. **Dashboard accessible**: After login, dashboard should load
4. **GraphQL types**: Check `lib/api/_gen/gql.tsx` exists

### Common Issues

**Issue**: GraphQL types not generated
- **Solution**: Ensure API is running, check `codegen.yaml` schema URL

**Issue**: Google OAuth not working
- **Solution**: Verify Client ID and redirect URI match Google Console

**Issue**: "Cannot find module '@/lib/api/_gen/gql'"
- **Solution**: Run `npm run codegen` to generate types

**Issue**: TypeScript errors
- **Solution**: Run `npm install` to ensure all types are installed

## Development Workflow

1. **Start API**: Ensure backend API is running
2. **Start frontend**: Run `npm run dev`
3. **Make changes**: Edit files, hot reload automatically
4. **Check types**: TypeScript checks on save
5. **Lint code**: Run `npm run lint` before commit

## Next Steps

- [Architecture Overview](./ARCHITECTURE.md)
- [Component Guide](./COMPONENTS.md)
- [Styling Guide](./STYLING.md)
- [Deployment Guide](./DEPLOYMENT.md)

# Deployment Guide

Instructions for deploying SaaS Starter Web to production.

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] GraphQL API is accessible
- [ ] Google OAuth credentials for production
- [ ] Build passes: `npm run build`
- [ ] Tests pass (if any)
- [ ] Security headers configured
- [ ] Error tracking setup (Sentry, etc.)

## Vercel (Recommended)

### Setup

1. Push code to GitHub/GitLab/Bitbucket
2. Import project in Vercel Dashboard
3. Configure environment variables
4. Deploy

### Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_ENDPOINT=https://api.yourdomain.com
NEXT_PUBLIC_WS_ENDPOINT=wss://api.yourdomain.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-production-client-id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=https://yourdomain.com/auth
NEXT_PUBLIC_ENVIRONMENT=production
```

### Custom Domain

1. Add custom domain in Vercel Dashboard
2. Update DNS records as instructed
3. SSL certificate automatically provisioned
4. Update Google OAuth redirect URIs

### Deployment

```bash
# Manual deploy
vercel --prod

# Or push to main branch for automatic deploy
git push origin main
```

## Netlify

### Setup

1. Connect repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20+

3. Set environment variables (same as Vercel)

### netlify.toml

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

## Docker

### Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

### Build and Run

```bash
# Build image
docker build -t saas-starter-web .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_ENDPOINT=https://api.yourdomain.com \
  -e NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id \
  saas-starter-web
```

## AWS (EC2 + Load Balancer)

### 1. Build Application

```bash
npm run build
```

### 2. Transfer to EC2

```bash
scp -r .next package.json package-lock.json user@ec2-instance:/app/
```

### 3. Setup on EC2

```bash
# SSH into instance
ssh user@ec2-instance

# Install dependencies
cd /app
npm ci --production

# Setup PM2
npm install -g pm2
pm2 start npm --name "saas-starter" -- start
pm2 save
pm2 startup
```

### 4. Configure Load Balancer

- Create Application Load Balancer
- Configure target group (port 3000)
- Setup health checks
- Configure SSL certificate

## Environment-Specific Configuration

### Production

```env
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_API_ENDPOINT=https://api.yourdomain.com
```

### Staging

```env
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_API_ENDPOINT=https://staging-api.yourdomain.com
```

### Development

```env
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_API_ENDPOINT=http://localhost:8080
```

## Post-Deployment

### 1. Verify Deployment

- [ ] Homepage loads
- [ ] Authentication works
- [ ] Dashboard accessible
- [ ] API calls successful
- [ ] WebSocket connections work
- [ ] No console errors

### 2. Monitor

Setup monitoring:
- Error tracking (Sentry)
- Performance monitoring
- Uptime monitoring
- Log aggregation

### 3. Analytics

Consider adding:
- Google Analytics
- Plausible Analytics
- PostHog
- Mixpanel

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      # Deploy steps (Vercel, Netlify, etc.)
```

## Rollback Strategy

### Vercel

- Instant rollback from Dashboard
- Or deploy specific commit:
  ```bash
  vercel --prod [commit-hash]
  ```

### Docker

```bash
# Rollback to previous image
docker pull saas-starter-web:previous-tag
docker-compose up -d
```

## Security Considerations

1. **HTTPS Only**: Enforce SSL in production
2. **Environment Variables**: Never commit secrets
3. **CSP Headers**: Configured in `next.config.ts`
4. **Rate Limiting**: Implement on API side
5. **CORS**: Configure allowed origins
6. **Error Messages**: Don't expose internals

## Performance Optimization

1. **CDN**: Use Vercel Edge Network or CloudFlare
2. **Caching**: Configure cache headers
3. **Image Optimization**: Use next/image
4. **Bundle Size**: Monitor with bundle analyzer
5. **Database**: Optimize queries and indexes

## Troubleshooting

**Issue**: Build fails
- Check Node version
- Clear `.next` and `node_modules`
- Run `npm run codegen`

**Issue**: Environment variables not working
- Check variable names (must start with NEXT_PUBLIC_)
- Restart dev server after changes
- Clear build cache

**Issue**: Authentication not working in production
- Verify Google OAuth redirect URIs
- Check API endpoint configuration
- Verify CORS settings

## Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

# Environment Configuration Guide

This project supports three environments: **dev**, **uat**, and **prod**.

## Quick Start

1. **Set up environment files:**
   ```bash
   npm run setup:env
   ```
   This will create `.env.development`, `.env.uat`, and `.env.production` files.

2. **Update the URLs in each environment file** with your actual backend endpoints.

3. **Run the application:**
   - Development: `npm run dev:dev`
   - UAT: `npm run dev:uat`
   - Production build: `npm run build:prod`

## Environment Files

### Development (`.env.development`)
- **Purpose**: Local machine configuration
- **Backend**: Points to localhost
- **Usage**: `npm run dev:dev` or `npm run build:dev`

### UAT (`.env.uat`)
- **Purpose**: UAT backend pointing
- **Backend**: Points to UAT server
- **Usage**: `npm run dev:uat` or `npm run build:uat`

### Production (`.env.production`)
- **Purpose**: Production backend pointing
- **Backend**: Points to production server
- **Usage**: `npm run build:prod` or `npm run start:prod`

## Available Scripts

### Development
- `npm run dev:dev` - Run development server with dev environment
- `npm run dev:uat` - Run development server with UAT environment
- `npm run dev:prod` - Run development server with production environment

### Build
- `npm run build:dev` - Build for development environment
- `npm run build:uat` - Build for UAT environment
- `npm run build:prod` - Build for production environment

### Start (Production Server)
- `npm run start:dev` - Start production server with dev config
- `npm run start:uat` - Start production server with UAT config
- `npm run start:prod` - Start production server with production config

## Using Configuration in Code

Import and use the configuration utility:

```typescript
import { config, getApiUrl, getBackendUrl } from '@/lib/config';

// Access environment info
console.log(config.env); // 'development' | 'uat' | 'production'
console.log(config.apiBaseUrl);
console.log(config.backendUrl);

// Check environment
if (config.isDevelopment) {
  // Development-only code
}

// Get full URLs
const apiUrl = getApiUrl('/users');
const backendUrl = getBackendUrl('/data');
```

## Environment Variables

Each environment file should contain:

```env
NEXT_PUBLIC_ENV=development|uat|production
NEXT_PUBLIC_API_BASE_URL=<your-api-url>
NEXT_PUBLIC_BACKEND_URL=<your-backend-url>
```

**Note**: All environment variables that need to be accessible in the browser must be prefixed with `NEXT_PUBLIC_`.

## Important Notes

- `.env.local` takes precedence over other environment files and is gitignored
- Never commit `.env.local` or files with sensitive credentials
- Update the example URLs in `.env.uat` and `.env.production` with your actual backend endpoints


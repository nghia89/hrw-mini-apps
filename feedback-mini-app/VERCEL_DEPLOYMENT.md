# Vercel Deployment Guide

## Vercel Configuration Complete ✅

Your Feedback Mini App is now configured for Vercel deployment with the following files:

### Configuration Files Created:

1. **`vercel.json`** - Main Vercel configuration

   - Configures static build with Vite
   - Sets up routing for React Router SPA
   - Adds security headers
   - Handles `/feedback-web` base path

2. **`.vercelignore`** - Files to ignore during deployment

   - Excludes node_modules, build files, logs, etc.

3. **`package.json`** - Updated with `vercel-build` script

## Deployment Steps:

### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI globally:

   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy from your project directory:

   ```bash
   cd /Users/nguyenthanhnghia/Projects/Company/hrw-mini-apps/feedback-mini-app
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N** (for first deployment)
   - What's your project's name? **feedback-mini-app**
   - In which directory is your code located? **.**

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel will auto-detect Vite and use the correct settings

## Important Notes:

### Base Path Configuration

- Your app is configured to run at `/feedback-web` path
- All routes will be: `https://your-domain.vercel.app/feedback-web`
- Home page: `https://your-domain.vercel.app/feedback-web/`
- Feedback form: `https://your-domain.vercel.app/feedback-web/feedback`

### Environment Variables

If you need environment variables (API endpoints, tokens):

1. Add to Vercel dashboard: Project Settings → Environment Variables
2. Or use Vercel CLI:
   ```bash
   vercel env add VITE_API_URL
   ```

### Custom Domain (Optional)

To use a custom domain:

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS to point to Vercel

## Build Commands:

- **Build Command**: `npm run vercel-build` (automatically detected)
- **Output Directory**: `dist` (automatically detected)
- **Install Command**: `npm install` (automatically detected)

## Testing Deployment:

After deployment, test these URLs:

- Base: `https://your-domain.vercel.app/feedback-web/`
- Feedback: `https://your-domain.vercel.app/feedback-web/feedback`
- Thank you: `https://your-domain.vercel.app/feedback-web/thank-you`

## Troubleshooting:

### Common Issues:

1. **404 on refresh**: Fixed with SPA routing in `vercel.json`
2. **Assets not loading**: Vite base path is correctly set to `/feedback-web/`
3. **API calls failing**: Check CORS settings and environment variables

### Build Locally First:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173/feedback-web/` to test the production build locally.

## Production Checklist:

- ✅ Vercel configuration files created
- ✅ Base path set to `/feedback-web`
- ✅ SPA routing configured
- ✅ Security headers added
- ✅ Build scripts updated
- ⚠️ Set environment variables if needed
- ⚠️ Test all routes after deployment
- ⚠️ Verify mobile responsiveness on live site

## Next Steps:

1. Test the build locally: `npm run build && npm run preview`
2. Deploy to Vercel: `vercel`
3. Test all functionality on the live site
4. Configure custom domain if needed

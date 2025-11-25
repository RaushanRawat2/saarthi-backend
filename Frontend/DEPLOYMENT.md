# Monastery360 - Netlify Deployment Guide

This guide will help you deploy the Monastery360 application to Netlify.

## Prerequisites

- Node.js 18+ installed
- Git repository with your code
- Netlify account (free tier available)

## Quick Deployment

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Build your project locally:**
   ```bash
   npm install
   npm run build:prod
   ```

2. **Go to [Netlify](https://netlify.com) and sign in**

3. **Drag and drop your `dist` folder** to the deploy area on the Netlify dashboard

4. **Your site will be live immediately!** Netlify will provide you with a random URL like `https://amazing-name-123456.netlify.app`

### Option 2: Deploy via Git Integration

1. **Connect your Git repository:**
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Connect your GitHub/GitLab/Bitbucket account
   - Select your Monastery360 repository

2. **Configure build settings:**
   - Build command: `npm run build:prod`
   - Publish directory: `dist`
   - Node version: `18`

3. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Option 3: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   npm run deploy:netlify
   ```

## Configuration Files

The following files have been configured for optimal Netlify deployment:

### `netlify.toml`
- Build configuration
- Redirect rules for SPA routing
- Security headers
- Caching rules

### `public/_redirects`
- Fallback routing for React Router
- Security headers

### `vite.config.ts`
- Optimized build configuration
- Code splitting
- Production optimizations

## Environment Variables

If you need to set environment variables:

1. Go to Site Settings > Environment Variables
2. Add variables with `VITE_` prefix (e.g., `VITE_API_URL`)
3. Redeploy your site

## Custom Domain (Optional)

1. Go to Site Settings > Domain Management
2. Add your custom domain
3. Configure DNS settings as instructed by Netlify
4. Enable HTTPS (automatic with Netlify)

## Performance Optimizations

The build is optimized with:
- Code splitting for better loading performance
- Terser minification
- Console log removal in production
- Optimized caching headers
- Gzip compression (automatic with Netlify)

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors: `npm run lint`

### Routing Issues
- Ensure `_redirects` file is in the `public` folder
- Verify `netlify.toml` redirect rules

### Performance Issues
- Check browser dev tools for bundle size
- Use `npm run preview:build` to test production build locally

## Monitoring

- Netlify provides built-in analytics
- Check the "Functions" tab for any serverless function logs
- Monitor build logs in the "Deploys" section

## Support

For issues specific to this deployment:
1. Check the build logs in Netlify dashboard
2. Verify all configuration files are present
3. Test locally with `npm run preview:build`

For Netlify-specific issues, refer to [Netlify Documentation](https://docs.netlify.com/).

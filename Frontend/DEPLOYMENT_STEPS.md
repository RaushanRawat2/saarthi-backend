# Monastery360 - Step-by-Step Cloudflare Pages Deployment Guide

## Prerequisites Checklist ✅

Before starting, ensure you have:
- [ ] Node.js 18+ installed
- [ ] Git repository with your code
- [ ] Cloudflare account (free tier available)
- [ ] Your Monastery360 project ready

---

## Step 1: Install Dependencies

Open your terminal/command prompt in the project directory and run:

```bash
# Install all dependencies including Wrangler CLI
npm install
```

**What this does:** Installs all project dependencies and the Wrangler CLI tool needed for Cloudflare deployment.

---

## Step 2: Create Cloudflare Account & Pages Project

### 2.1 Create Cloudflare Account
1. Go to [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Sign up for a free account
3. Verify your email address

### 2.2 Create Pages Project
1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **"Pages"** in the left sidebar
3. Click **"Create a project"**
4. Choose **"Upload assets"** (for manual upload) or **"Connect to Git"** (for automatic deployments)

---

## Step 3: Build Your Project

```bash
# Build the project for production
npm run build:prod
```

**What this does:** Creates an optimized production build in the `dist` folder.

**Expected output:** You should see a `dist` folder created with all your built files.

---

## Step 4: Deploy to Cloudflare Pages

### Option A: Automated Deployment (Recommended)

```bash
# Run the automated deployment script
npm run deploy:cloudflare:script
```

**What this script does:**
- Checks Node.js version
- Installs dependencies
- Runs linting
- Builds the project
- Authenticates with Cloudflare
- Deploys to Pages
- Provides deployment URL

### Option B: Manual Deployment

#### 4.1 Login to Cloudflare
```bash
wrangler login
```
- This opens your browser for authentication
- Click "Allow" to authorize

#### 4.2 Deploy
```bash
npm run deploy:cloudflare
```

### Option C: Dashboard Upload

1. Go to your Cloudflare Pages project
2. Click **"Upload assets"**
3. Drag and drop your `dist` folder
4. Click **"Deploy site"**

---

## Step 5: Verify Deployment

### 5.1 Check Deployment Status
```bash
# View deployment logs
npm run pages:tail

# List all deployments
npm run pages:list
```

### 5.2 Access Your Site
- Your site will be available at: `https://your-project-name.pages.dev`
- The URL will be shown in the deployment output

---

## Step 6: Configure Custom Domain (Optional)

### 6.1 Add Custom Domain
1. Go to your Pages project dashboard
2. Click **"Custom domains"**
3. Click **"Set up a custom domain"**
4. Enter your domain (e.g., `monastery360.com`)

### 6.2 Configure DNS
**Option A: Using Cloudflare Nameservers (Recommended)**
1. Change your domain's nameservers to Cloudflare's
2. Cloudflare will automatically configure everything

**Option B: Using CNAME Record**
1. Add a CNAME record: `www` → `your-project-name.pages.dev`
2. Add an A record: `@` → `192.0.2.1` (or your server IP)

---

## Step 7: Set Up Environment Variables (If Needed)

### 7.1 Via Dashboard
1. Go to your Pages project
2. Click **"Settings"** → **"Environment Variables"**
3. Add variables with `VITE_` prefix:
   - `VITE_API_URL` = `https://your-api.com`
   - `VITE_APP_ENV` = `production`

### 7.2 Via CLI
```bash
wrangler pages secret put VITE_API_URL
# Enter the value when prompted
```

---

## Step 8: Enable Performance Features

### 8.1 Analytics
1. Go to **"Analytics"** tab in your Pages project
2. Enable **"Web Analytics"**
3. Enable **"Core Web Vitals"**

### 8.2 Speed Optimizations
1. Go to **"Speed"** tab
2. Enable **"Auto Minify"** for HTML, CSS, JS
3. Enable **"Brotli"** compression
4. Enable **"Rocket Loader"** (optional)

---

## Step 9: Test Your Deployment

### 9.1 Basic Functionality Test
- [ ] Site loads correctly
- [ ] All pages navigate properly
- [ ] Images and assets load
- [ ] Audio files play
- [ ] Interactive features work

### 9.2 Performance Test
- [ ] Check Core Web Vitals in browser dev tools
- [ ] Test on mobile devices
- [ ] Verify HTTPS is working

---

## Step 10: Set Up Continuous Deployment (Optional)

### 10.1 Connect Git Repository
1. Go to your Pages project
2. Click **"Settings"** → **"Builds & deployments"**
3. Click **"Connect to Git"**
4. Select your repository
5. Configure build settings:
   - **Build command:** `npm run build:prod`
   - **Build output directory:** `dist`
   - **Root directory:** `/`

### 10.2 Automatic Deployments
- Every push to main branch will trigger automatic deployment
- Preview deployments for pull requests

---

## Troubleshooting Common Issues

### Issue 1: Build Fails
```bash
# Check Node.js version
node --version

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: Authentication Error
```bash
# Re-authenticate
wrangler logout
wrangler login
```

### Issue 3: Deployment Fails
```bash
# Check project configuration
wrangler pages project list

# View deployment logs
npm run pages:tail
```

### Issue 4: Site Not Loading
- Check if `dist` folder contains `index.html`
- Verify `_redirects` file is in `public` folder
- Check browser console for errors

---

## Quick Reference Commands

```bash
# Build and deploy
npm run deploy:cloudflare

# Deploy with automated script
npm run deploy:cloudflare:script

# Local development with Cloudflare Pages
npm run pages:dev

# View deployment logs
npm run pages:tail

# List deployments
npm run pages:list

# Check authentication
wrangler whoami
```

---

## Success Checklist ✅

After deployment, verify:
- [ ] Site is accessible via Pages URL
- [ ] Custom domain works (if configured)
- [ ] HTTPS is enabled
- [ ] All features work correctly
- [ ] Performance is good
- [ ] Analytics are tracking (if enabled)

---

## Next Steps

1. **Monitor Performance:** Use Cloudflare Analytics to track performance
2. **Set Up Monitoring:** Configure alerts for downtime
3. **Optimize Further:** Use Cloudflare's speed features
4. **Backup Strategy:** Keep your code in version control

Your Monastery360 project is now live on Cloudflare Pages! 🎉

For additional help, refer to:
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

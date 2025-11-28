# Monastery360 Deployment Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE PAGES DEPLOYMENT FLOW             │
└─────────────────────────────────────────────────────────────────┘

1. PREPARATION PHASE
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │   Install   │───▶│   Build     │───▶│   Verify    │
   │Dependencies │    │  Project    │    │   Build     │
   └─────────────┘    └─────────────┘    └─────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
   npm install         npm run build:prod    Check dist/ folder

2. CLOUDFLARE SETUP
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │   Create    │───▶│   Create    │───▶│   Configure │
   │ Cloudflare  │    │   Pages     │    │   Project   │
   │   Account   │    │   Project   │    │   Settings  │
   └─────────────┘    └─────────────┘    └─────────────┘

3. DEPLOYMENT PHASE
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ Authenticate│───▶│   Deploy    │───▶│   Verify    │
   │  with CLI   │    │   Assets    │    │ Deployment  │
   └─────────────┘    └─────────────┘    └─────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
   wrangler login    npm run deploy:cloudflare   Check URL

4. POST-DEPLOYMENT
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │   Custom    │───▶│ Environment │───▶│  Analytics  │
   │   Domain    │    │ Variables   │    │   Setup     │
   └─────────────┘    └─────────────┘    └─────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT OPTIONS                       │
└─────────────────────────────────────────────────────────────────┘

OPTION 1: AUTOMATED SCRIPT (RECOMMENDED)
┌─────────────────┐
│ npm run deploy: │
│ cloudflare:     │
│ script          │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│   Automated     │
│   Process:      │
│   • Check deps  │
│   • Run lint    │
│   • Build       │
│   • Deploy      │
│   • Show URL    │
└─────────────────┘

OPTION 2: MANUAL DEPLOYMENT
┌─────────────────┐    ┌─────────────────┐
│ wrangler login  │───▶│ npm run deploy: │
│                 │    │ cloudflare      │
└─────────────────┘    └─────────────────┘

OPTION 3: DASHBOARD UPLOAD
┌─────────────────┐
│   Drag & Drop   │
│   dist/ folder  │
│   to Dashboard  │
└─────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        EXPECTED RESULTS                        │
└─────────────────────────────────────────────────────────────────┘

✅ SUCCESS INDICATORS:
• Site accessible at: https://your-project.pages.dev
• All pages load correctly
• Images and assets work
• HTTPS enabled automatically
• Performance optimizations active

❌ COMMON ISSUES & SOLUTIONS:
• Build fails → Check Node.js version, clear cache
• Auth error → Re-run wrangler login
• Site not loading → Check dist/ folder contents
• Slow loading → Enable Cloudflare speed features

┌─────────────────────────────────────────────────────────────────┐
│                        QUICK COMMANDS                          │
└─────────────────────────────────────────────────────────────────┘

# Complete deployment in one command
npm run deploy:cloudflare:script

# Manual deployment
npm run deploy:cloudflare

# Check deployment status
npm run pages:tail

# List all deployments
npm run pages:list

# Local testing with Cloudflare Pages
npm run pages:dev
```

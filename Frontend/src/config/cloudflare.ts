// Cloudflare Pages Performance Configuration
// This file contains performance optimizations specific to Cloudflare Pages

export const cloudflareConfig = {
  // Cache settings
  cache: {
    // Static assets cache duration (1 year)
    staticAssets: 'public, max-age=31536000, immutable',
    // HTML cache duration (no cache for SPA)
    html: 'public, max-age=0, must-revalidate',
    // API responses cache duration (5 minutes)
    api: 'public, max-age=300',
  },
  
  // Compression settings
  compression: {
    // Enable Brotli compression
    brotli: true,
    // Enable Gzip compression
    gzip: true,
  },
  
  // Security headers
  security: {
    // Content Security Policy
    csp: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self' https:;",
    // Frame options
    frameOptions: 'DENY',
    // Content type options
    contentTypeOptions: 'nosniff',
    // XSS protection
    xssProtection: '1; mode=block',
  },
  
  // Performance optimizations
  performance: {
    // Enable HTTP/3
    http3: true,
    // Enable HTTP/2 Server Push
    http2Push: true,
    // Enable Early Hints
    earlyHints: true,
    // Enable Rocket Loader
    rocketLoader: false, // Disable for React apps
  },
  
  // Analytics
  analytics: {
    // Enable Web Analytics
    webAnalytics: true,
    // Enable Core Web Vitals
    coreWebVitals: true,
  },
};

// Export for use in other files
export default cloudflareConfig;

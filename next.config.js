/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents your site from being embedded in an iframe (clickjacking protection)
          { key: "X-Frame-Options", value: "DENY" },

          // Stops browsers from guessing file types (MIME sniffing protection)
          { key: "X-Content-Type-Options", value: "nosniff" },

          // Controls how much referrer info is shared when navigating away
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // Disables access to sensitive browser features you don't need
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          },

          // Forces HTTPS for 1 year (enable this only if you're deployed on HTTPS)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains"
          },

          // Basic Content Security Policy — restricts where scripts/styles can load from
          // Adjust 'self' sources if you load assets from external CDNs
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for Next.js dev mode
              "style-src 'self' 'unsafe-inline'", // unsafe-inline needed for Tailwind
              "img-src 'self' data: blob:",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'"
            ].join("; ")
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig

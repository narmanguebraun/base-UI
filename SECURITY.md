# Security Policy

## Supported Versions

| Version                       | Supported |
| ----------------------------- | --------- |
| 2.1.x (Next.js 16 / React 19) | ✅        |
| 2.0.x (Next.js 15 / React 19) | ❌        |
| 1.x (Next.js 14 / React 18)   | ❌        |

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not open a public issue**.

Instead, report it privately by:

- Opening a [GitHub Security Advisory](https://github.com/narmanguebraun/base-UI/security/advisories/new)
- Or emailing the maintainer directly (add your email here if you prefer)

Please include:

- A description of the vulnerability
- Steps to reproduce it
- Any suggested fix if you have one

You can expect a response within **7 days**. I'll keep you updated as the issue is investigated and resolved.

## Security Best Practices for Users of This Template

If you build on top of base-UI, keep these in mind:

- **Never commit `.env` files** — use `.env.local` for local secrets and add it to `.gitignore`
- **Keep dependencies updated** — run `npm audit` regularly or enable Dependabot
- **Add security headers** — configure `next.config.ts` with `X-Frame-Options`, `CSP`, etc. before deploying to production
- **Don't expose Storybook publicly** — Storybook (port 6006) is for development only

# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-11-25

### Changed

- Upgraded Next.js from 14.2.3 to 15.5.6
- Upgraded React from 18.3.1 to 19.0.0
- Upgraded Storybook from 8.4.2 to 10.0.8
- Updated TypeScript configuration:
  - Changed target from ES5 to ES2017
  - Changed moduleResolution from node to bundler
  - Simplified path aliases to standard Next.js configuration
- Updated React types to v19

### Removed

- Removed `@storybook/addon-styling` (no longer needed with Storybook 10)

### Breaking Changes

- Next.js 15 includes new caching defaults and breaking changes - see [Next.js 15 upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
- React 19 includes new features and some deprecations - see [React 19 release notes](https://react.dev/blog/2024/04/25/react-19)
- Storybook 10 may require configuration updates - see [Storybook 10 release notes](https://storybook.js.org/blog/)

## [0.1.0] - 2025-03-25

- Next.js 14
- React 18
- Storybook 8
- Tailwind CSS 3

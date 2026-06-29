# Changelog

All notable changes to this project will be documented in this file.

## [3.1.0] - 2026-06-29

### Added

- `Checkbox` component — `useCheckbox` + `useToggleState`, size variants (sm/md/lg), indeterminate state with `aria-checked="mixed"`, description and error message with manual `aria-describedby`
- Vitest + jest-axe test suite — 37 tests across Button, TextField, and Checkbox; behavior and axe accessibility tests for each meaningful state
- `CLAUDE.md` — project conventions for Claude Code: stack decisions, token table, component anatomy rules, Storybook requirements, seven-step component checklist
- `THEMING.md` — full token reference with light/dark values, customization walkthrough, and anti-patterns
- `CONTRIBUTING.md` — setup, project structure, component anatomy guide, stories and test workflow, pre-submit checklist, commit format

### Changed

- Button refactored with semantic `intent` variants — `default`, `primary`, `destructive`, `warning`, `ghost` — all referencing design tokens
- Semantic design token system introduced in `app/globals.css` — oklch color values with dark mode overrides in `@media (prefers-color-scheme: dark) :root`
- All components updated to Tailwind v4 canonical CSS variable shorthand: `bg-(--primary)` instead of `bg-[var(--primary)]`
- Bumped `@storybook` group to `^10.4.1`, `@types/react` to `^19.2.15`, `qs` to `6.15.2`

### Fixed

- Removed `@storybook/addon-styling` from Storybook addons (removed in Storybook 10)
- Removed `argTypesRegex` from Storybook preview parameters (deprecated)

## [3.0.0] - 2026-05-19

### Changed

- Migrated from Tailwind CSS v3 to v4
  - Replaced `tailwind.config.js` with CSS-first configuration in `globals.css`
  - Replaced `autoprefixer` with `@tailwindcss/postcss` (autoprefixing now built into v4)
  - Removed `@tailwindcss/aspect-ratio` (aspect-ratio utilities now built into v4 core)
  - Dark mode now uses `@media (prefers-color-scheme: dark)` exclusively
- Converted home page to a Server Component
- Updated app metadata title and description
- Improved Storybook story labels to reflect each button intent

### Fixed

- Removed duplicate `intent` type declaration in `Button` — type is now inferred solely from `VariantProps`
- Removed redundant `...props` spread in `Button` that was overriding `useButton`'s processed aria and event attributes
- Fixed typo in page.tsx — Class Variance Authority

### Breaking Changes

- Tailwind CSS v4 includes a new CSS-first configuration model and breaking changes — see [Tailwind CSS v4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide)

## [2.1.0] - 2026-04-28

### Changed

- Upgraded Next.js from 15.5.15 to 16.2.4
- Upgraded eslint-config-next to match Next.js version

### Breaking Changes

- Next.js 16 includes breaking changes — see [Next.js 16 upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-16)

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

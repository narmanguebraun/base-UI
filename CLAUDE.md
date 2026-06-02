# base-UI

Design system starter. Next.js 16, React 19, TypeScript, Tailwind CSS v4, Storybook 10, React Aria, CVA.

## Stack decisions

- **React Aria** — all interactive components use React Aria hooks (`useButton`, `useTextField`, etc.). Never use raw HTML event handlers or `onClick` for interactive primitives.
- **CVA** — visual variants only. Layout concerns (e.g. `fullWidth`) are conditional classes applied outside CVA.
- **Tailwind v4** — CSS-first. No `tailwind.config.js`. All tokens in `app/globals.css` under `@theme`.
- **Dark mode** — `prefers-color-scheme` only. No class-based toggle.

## Design tokens

Defined in `app/globals.css`. Reference via Tailwind arbitrary values: `bg-[var(--primary)]`, `text-[var(--foreground)]`. Never use raw Tailwind palette values in components.

| Token | Purpose |
|---|---|
| `--background` | Page background |
| `--foreground` | Primary text |
| `--muted` | Subtle backgrounds |
| `--muted-foreground` | Secondary text, placeholders |
| `--border` | Borders and dividers |
| `--primary` / `--primary-foreground` | Primary action |
| `--destructive` / `--destructive-foreground` | Error / danger |
| `--warning` / `--warning-foreground` | Caution |
| `--success` / `--success-foreground` | Success (feedback UI only, not a button intent) |
| `--radius` | Base border radius (0.5rem) |
| `--radius-tighter` | radius - 2px |
| `--radius-tightest` | radius - 4px |

## Component conventions

See `components/Button/Button.tsx` as the reference implementation.

- `"use client"` is required — React Aria hooks only run in client components
- `isDisabled` comes from `AriaXxxProps` — never redeclare it in the component type
- Expose React Aria state via `data-*` attributes (`data-pressed`, `data-focused`)
- Layout props (`fullWidth`) are conditional classes outside CVA

## Visual output

Verify in both Storybook and the browser. The browser is the source of truth.

## Storybook stories

- Always include `tags: ["autodocs"]`
- Use explicit `argTypes` for handlers — no `argTypesRegex`
- Cover all variants + a `Disabled` story

## Adding a new component

1. Create `components/ComponentName/` — `Component.tsx`, `Component.stories.ts`, `index.ts`
2. Pick the right React Aria hook — [react-spectrum.adobe.com/react-aria](https://react-spectrum.adobe.com/react-aria/)
3. CVA for visual variants, tokens only, layout outside CVA
4. Expose React Aria state via `data-*`
5. Cover all variants + a Disabled story
6. Verify in Storybook and browser
7. Re-export from `index.ts`

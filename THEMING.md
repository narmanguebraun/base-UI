# Theming

All visual values flow from CSS custom properties defined in `app/globals.css` under `@theme`. Components reference them using Tailwind v4's `(--token)` shorthand. No raw Tailwind palette values (`gray-950`, `rose-600`, etc.) appear in components — only token references. This means changing a token propagates to every component that uses it.

## Token reference

Defined in `app/globals.css`. Light mode values are in `@theme`; dark mode overrides are in `@media (prefers-color-scheme: dark) :root`.

### Radius

| Token               | Value                       | Usage                          |
| ------------------- | --------------------------- | ------------------------------ |
| `--radius`          | `0.5rem`                    | Default border radius          |
| `--radius-tighter`  | `calc(var(--radius) - 2px)` | Slightly tighter (e.g. badges) |
| `--radius-tightest` | `calc(var(--radius) - 4px)` | Tightest (e.g. checkbox)       |

### Typography

| Token         | Value                                  |
| ------------- | -------------------------------------- |
| `--font-sans` | `ui-sans-serif, system-ui, sans-serif` |
| `--font-mono` | `ui-monospace, monospace`              |

### Color

Tokens marked **↔** have a dark mode override. Tokens without one keep the same value in both modes.

| Token                      | Light                 | Dark             | Purpose                      |
| -------------------------- | --------------------- | ---------------- | ---------------------------- |
| `--background` ↔           | `oklch(100% 0 0)`     | `oklch(9% 0 0)`  | Page background              |
| `--foreground` ↔           | `oklch(9% 0 0)`       | `oklch(98% 0 0)` | Primary text                 |
| `--muted` ↔                | `oklch(96% 0 0)`      | `oklch(15% 0 0)` | Subtle backgrounds           |
| `--muted-foreground` ↔     | `oklch(45% 0 0)`      | `oklch(60% 0 0)` | Secondary text, placeholders |
| `--border` ↔               | `oklch(90% 0 0)`      | `oklch(20% 0 0)` | Borders and dividers         |
| `--primary` ↔              | `oklch(20% 0 0)`      | `oklch(98% 0 0)` | Primary action               |
| `--primary-foreground` ↔   | `oklch(98% 0 0)`      | `oklch(9% 0 0)`  | Text on primary              |
| `--destructive`            | `oklch(55% 0.22 27)`  | —                | Error / danger               |
| `--destructive-foreground` | `oklch(98% 0 0)`      | —                | Text on destructive          |
| `--warning`                | `oklch(72% 0.18 75)`  | —                | Warning                      |
| `--warning-foreground`     | `oklch(9% 0 0)`       | —                | Text on warning              |
| `--success`                | `oklch(52% 0.17 152)` | —                | Success (feedback UI only)   |
| `--success-foreground`     | `oklch(98% 0 0)`      | —                | Text on success              |

## Using tokens in components

Reference tokens inside CVA variant definitions using Tailwind v4's `(--token)` shorthand:

```ts
const buttonStyles = cva(
  "rounded-(--radius) focus:ring-offset-(--background) ...",
  {
    variants: {
      intent: {
        primary:
          "bg-(--primary) text-(--primary-foreground) focus:ring-(--primary)",
        destructive:
          "bg-(--destructive) text-(--destructive-foreground) focus:ring-(--destructive)"
      }
    }
  }
)
```

The rule: token references go inside CVA for variants, and in inline `className` strings for one-off uses. Never use raw Tailwind palette values (`bg-gray-950`, `text-rose-600`) in components.

The one exception: `bg-transparent` is fine on its own — it's not palette-specific.

## Changing a token

Changing a token in `globals.css` propagates to every component that references it. For example, to replace the near-black default primary with a brand blue:

```css
/* app/globals.css */

@theme {
  /* before */
  --primary: oklch(20% 0 0);
  --primary-foreground: oklch(98% 0 0);

  /* after */
  --primary: oklch(55% 0.2 250); /* brand blue */
  --primary-foreground: oklch(98% 0 0);
}
```

This single change updates: the primary Button, Checkbox fill color, focus rings across all components, and text selection highlight — because all of them reference `--primary`.

**Check the dark mode override.** If the token has a dark mode override in the `@media` block, update it too. Changing only the `@theme` value leaves light and dark out of sync:

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* must update this too, or dark mode still shows the old value */
    --primary: oklch(70% 0.18 250); /* lighter blue for dark mode */
    --primary-foreground: oklch(9% 0 0);
  }
}
```

Tokens marked **↔** in the table above have a dark mode override. Any token you add that needs dark mode adaptation follows the same pattern.

## Adding a token

Define it in `@theme` and add a dark mode override in the `@media` block if needed:

```css
@theme {
  --accent: oklch(60% 0.18 300);
  --accent-foreground: oklch(98% 0 0);
}

@media (prefers-color-scheme: dark) {
  :root {
    --accent: oklch(70% 0.15 300);
  }
}
```

Then reference it in components:

```ts
"bg-(--accent) text-(--accent-foreground)"
```

No other configuration is required. Tailwind v4 picks up any custom property defined in `@theme` automatically.

## What not to do

**Don't use raw palette values in components.** This breaks the token system and requires hunting down every usage when colors change:

```ts
// wrong
"bg-gray-950 text-gray-100"

// correct
"bg-(--primary) text-(--primary-foreground)"
```

**Don't override token values inline.** If a component needs a different shade, add a new semantic token in `globals.css` — not an arbitrary value in the component:

```ts
// wrong
"bg-[oklch(20%_0_0)]"

// correct — define a token first, then reference it
"bg-(--primary)"
```

**Don't add dark mode overrides inside `@theme`.** Tailwind v4 processes `@theme` at compile time — wrapping it in a media query doesn't behave the same as overriding CSS variables at runtime. Dark mode overrides belong in `@media (prefers-color-scheme: dark) :root`:

```css
/* wrong */
@media (prefers-color-scheme: dark) {
  @theme {
    --background: oklch(9% 0 0);
  }
}

/* correct */
@media (prefers-color-scheme: dark) {
  :root {
    --background: oklch(9% 0 0);
  }
}
```

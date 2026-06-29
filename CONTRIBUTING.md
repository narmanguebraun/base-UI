# Contributing

## Getting started

```bash
npm install
npm run dev          # Next.js at http://localhost:3000
npm run storybook    # Storybook at http://localhost:6006
npm test             # Vitest test suite
```

## Project structure

```
app/
  globals.css          # Design tokens (@theme) and dark mode overrides
  layout.tsx           # Root layout — Server Component
  page.tsx             # Demo page — Server Component
components/
  Button/
    Button.tsx
    Button.stories.ts
    Button.test.tsx
    index.ts
  Checkbox/
    Checkbox.tsx
    Checkbox.stories.ts
    Checkbox.test.tsx
    index.ts
  TextField/
    TextField.tsx
    TextField.stories.ts
    TextField.test.tsx
    index.ts
```

Each component lives in its own folder with its stories, tests, and barrel export co-located. Nothing is shared across components except design tokens from `globals.css`.

For token reference and customization, see [THEMING.md](THEMING.md). For conventions used by Claude Code in this repo, see [CLAUDE.md](CLAUDE.md).

## Adding a component

### Folder and file layout

Create a folder under `components/` with four files:

```
components/Select/
  Select.tsx
  Select.stories.ts
  Select.test.tsx
  index.ts
```

`index.ts` is a single re-export:

```ts
export { Select } from "./Select"
```

### Component anatomy

Every component must have these pieces. Use `components/Button/Button.tsx` as the reference implementation.

**`"use client"` at the top.** React Aria hooks only run in client components.

**One React Aria hook.** Pick the right one from [react-spectrum.adobe.com/react-aria](https://react-spectrum.adobe.com/react-aria/). The hook drives all interaction, focus management, and ARIA attributes — never use raw `onClick` or `onChange` for interactive primitives.

```tsx
const { buttonProps, isPressed } = useButton(props, ref)
```

**CVA for visual variants, tokens only.** Visual variants go inside `cva()`. Layout props like `fullWidth` are applied as conditional classes outside CVA. Every class must reference a design token via `(--token)` — no raw Tailwind palette values.

```ts
const buttonStyles = cva("rounded-(--radius) bg-(--background) ...", {
  variants: {
    intent: {
      primary: "bg-(--primary) text-(--primary-foreground)",
      destructive: "bg-(--destructive) text-(--destructive-foreground)"
    }
  },
  defaultVariants: { intent: "primary" }
})
```

**`data-*` attributes for React Aria state.** Expose interaction state so consumers can style against it if needed:

```tsx
<button
  {...buttonProps}
  ref={ref}
  data-pressed={isPressed || undefined}
>
```

Use `|| undefined` so the attribute is absent (not `data-pressed="false"`) when the state is inactive.

**Required visible label.** All interactive components must have a visible label. Override the optional `ReactNode` from `AriaXxxProps` with a required `string`:

```ts
type SelectProps = Omit<AriaSelectProps<object>, "label"> &
  VariantProps<typeof selectStyles> & {
    label: string // required — not optional
    fullWidth?: boolean
  }
```

**`isDisabled` comes from `AriaXxxProps`.** Never redeclare it in the component's own type — it's already there.

### Stories

Create `Component.stories.ts` alongside the component. A complete story file covers every variant plus a `Disabled` story:

```ts
import { type Meta, type StoryObj } from "@storybook/nextjs"

import { Checkbox } from "./Checkbox"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"], // required — generates the docs page
  argTypes: {
    onChange: { action: "onChange" } // explicit, not argTypesRegex
  }
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { label: "Accept terms" } }
export const Checked: Story = {
  args: { label: "Accept terms", defaultSelected: true }
}
export const Disabled: Story = {
  args: { label: "Accept terms", isDisabled: true }
}
```

Verify in Storybook before submitting. Run `npm run storybook` and check every story in both light and dark mode — the browser is the source of truth, not the Storybook canvas alone.

### Tests

Create `Component.test.tsx` alongside the component. Tests are grouped in two passes: behavior first, accessibility second.

**Behavior tests** cover: renders correctly, interaction (click, toggle, type), controlled state changes, disabled prevents interaction, description and error message display.

**Accessibility tests** run `axe` against each meaningful state:

```tsx
import { axe } from "jest-axe"

it("default state has no accessibility violations", async () => {
  const { container } = render(<Checkbox label="Accept terms" />)
  expect(await axe(container)).toHaveNoViolations()
})

it("disabled state has no accessibility violations", async () => {
  const { container } = render(<Checkbox label="Accept terms" isDisabled />)
  expect(await axe(container)).toHaveNoViolations()
})

it("invalid state has no accessibility violations", async () => {
  const { container } = render(
    <Checkbox label="Accept terms" isInvalid errorMessage="Required." />
  )
  expect(await axe(container)).toHaveNoViolations()
})
```

Run `npm test` to confirm all tests pass before submitting.

## Before you submit

- [ ] `npm test` passes with no failures
- [ ] `npm run build` completes without errors
- [ ] Every story renders correctly in Storybook in both light and dark mode
- [ ] No raw Tailwind palette values in the component (`bg-gray-950`, `text-rose-600`, etc.) — tokens only
- [ ] Visible label is required (not optional) in the component type

## Commit format

```
feat: add Select component with stories and tests
fix: correct aria-checked for indeterminate Checkbox state
refactor: update to Tailwind v4 canonical CSS variable syntax
test: add axe coverage for TextField invalid state
docs: add THEMING.md
chore: fix Storybook warnings
```

One line, lowercase after the prefix, no period. The prefix reflects the nature of the change — `feat` for new components or capabilities, `fix` for bug fixes, `refactor` for changes that don't alter behavior, `test` for test-only changes, `docs` for documentation, `chore` for tooling and config.

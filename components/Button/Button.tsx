"use client"

// React Aria hooks require a client component

import { useRef } from "react"

import { cva, VariantProps } from "class-variance-authority"
import { AriaButtonProps, useButton } from "react-aria"

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center",
    "text-sm font-medium",
    "px-4 py-2 rounded-[var(--radius)]",
    "hover:opacity-90",
    "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-[var(--background)]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "transition-opacity",
  ].join(" "),
  {
    variants: {
      intent: {
        default:
          "bg-[var(--muted)] text-[var(--foreground)] focus:ring-[var(--muted)]",
        primary:
          "bg-[var(--primary)] text-[var(--primary-foreground)] focus:ring-[var(--primary)]",
        destructive:
          "bg-[var(--destructive)] text-[var(--destructive-foreground)] focus:ring-[var(--destructive)]",
        warning:
          "bg-[var(--warning)] text-[var(--warning-foreground)] focus:ring-[var(--warning)]",
        ghost:
          "bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)] focus:ring-[var(--primary)]",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
)

type ButtonProps = AriaButtonProps & VariantProps<typeof buttonStyles> & {
  fullWidth?: boolean
}

export function Button({ intent, fullWidth, ...props }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps, isPressed } = useButton(props, ref)

  return (
    <button
      {...buttonProps}
      ref={ref}
      data-pressed={isPressed || undefined}
      className={[
        buttonStyles({ intent }),
        fullWidth ? "w-full" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {props.children}
    </button>
  )
}

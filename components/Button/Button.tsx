"use client"

// React Aria hooks require a client component

import { useRef } from "react"

import { cva, VariantProps } from "class-variance-authority"
import { AriaButtonProps, useButton } from "react-aria"

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center",
    "text-sm font-medium",
    "px-4 py-2 rounded-(--radius)",
    "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-(--background)",
    "disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      intent: {
        default:
          "bg-(--muted) text-(--foreground) focus:ring-(--muted)",
        primary:
          "bg-(--primary) text-(--primary-foreground) focus:ring-(--primary)",
        destructive:
          "bg-(--destructive) text-(--destructive-foreground) focus:ring-(--destructive)",
        warning:
          "bg-(--warning) text-(--warning-foreground) focus:ring-(--warning)",
        ghost:
          "bg-transparent text-(--foreground) focus:ring-(--primary)",
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

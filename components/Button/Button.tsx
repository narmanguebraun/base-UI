"use client"

import { useRef } from "react"

import { cva, VariantProps } from "class-variance-authority"
import { AriaButtonProps, useButton } from "react-aria"

type ButtonProps = {
  intent: "default" | "error" | "warning" | "secondary" | "tertiary"
  fullWidth?: boolean
  isDisabled?: boolean
} & AriaButtonProps &
  VariantProps<typeof buttonStyles>

const buttonStyles = cva(
  "flex items-center text-sm justify-center rounded-lg px-4 py-2 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-black",
  {
    variants: {
      intent: {
        default: "bg-gray-100 text-gray-950 focus:ring-gray-100",
        error: "bg-rose-600 text-white focus:ring-rose-600",
        warning: "bg-yellow-500 text-gray-950 focus:ring-yellow-400",
        secondary:
          "bg-gray-950 text-gray-100 border border-gray-800 focus:ring-gray-950 hover:bg-gray-800",
        tertiary:
          "bg-transparent text-current focus:ring-yellow-400 hover:bg-gray-800"
      },
      fullWidth: {
        true: "w-full"
      },
      isDisabled: {
        true: "opacity-50 cursor-not-allowed"
      }
    },
    defaultVariants: {
      intent: "default"
    }
  }
)

export function Button({
  intent,
  fullWidth,
  isDisabled,
  ...props
}: ButtonProps) {
  const ref = useRef(null)
  const { children } = props
  const { buttonProps } = useButton(props, ref)

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={buttonStyles({ intent, fullWidth, isDisabled })}
      {...props}
    >
      {children}
    </button>
  )
}

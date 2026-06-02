"use client"

// React Aria hooks require a client component
import { useRef } from "react"

import { cva, VariantProps } from "class-variance-authority"
import { AriaTextFieldProps, useTextField } from "react-aria"

const inputStyles = cva(
  [
    "w-full",
    "text-sm",
    "px-3 py-2 rounded-[var(--radius)]",
    "bg-[var(--background)] text-[var(--foreground)]",
    "border border-[var(--border)]",
    "placeholder:text-[var(--muted-foreground)]",
    "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-[var(--background)]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "transition-colors"
  ].join(" "),
  {
    variants: {
      intent: {
        default: "focus:ring-[var(--primary)]",
        destructive:
          "border-[var(--destructive)] focus:ring-[var(--destructive)]",
        warning: "border-[var(--warning)] focus:ring-[var(--warning)]"
      }
    },
    defaultVariants: {
      intent: "default"
    }
  }
)

// label is required — all form fields must have a visible label for accessibility
type TextFieldProps = Omit<AriaTextFieldProps, "label"> &
  VariantProps<typeof inputStyles> & {
    label: string
    fullWidth?: boolean
  }

export function TextField({ intent, fullWidth, ...props }: TextFieldProps) {
  const ref = useRef<HTMLInputElement>(null)
  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
    validationDetails
  } = useTextField(props, ref)

  const errorContent =
    typeof props.errorMessage === "function"
      ? props.errorMessage({ isInvalid, validationErrors, validationDetails })
      : props.errorMessage

  return (
    <div
      className={["flex flex-col gap-1.5", fullWidth ? "w-full" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <label
        {...labelProps}
        className="text-sm font-medium text-[var(--foreground)]"
      >
        {props.label}
        {props.isRequired && (
          <span aria-hidden="true" className="ml-0.5 text-[var(--destructive)]">
            *
          </span>
        )}
      </label>
      <input
        {...inputProps}
        ref={ref}
        data-invalid={isInvalid || undefined}
        className={inputStyles({ intent: isInvalid ? "destructive" : intent })}
      />
      {props.description && !isInvalid && (
        <p
          {...descriptionProps}
          className="text-sm text-[var(--muted-foreground)]"
        >
          {props.description}
        </p>
      )}
      {isInvalid && errorContent && (
        <p {...errorMessageProps} className="text-sm text-[var(--destructive)]">
          {errorContent}
        </p>
      )}
    </div>
  )
}

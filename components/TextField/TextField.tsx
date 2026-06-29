"use client"

// React Aria hooks require a client component
import { useRef } from "react"

import { cva, VariantProps } from "class-variance-authority"
import { AriaTextFieldProps, useTextField } from "react-aria"

const inputStyles = cva(
  [
    "w-full",
    "text-sm",
    "px-3 py-2 rounded-(--radius)",
    "bg-(--background) text-(--foreground)",
    "border border-(--border)",
    "placeholder:text-(--muted-foreground)",
    "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-(--background)",
    "disabled:opacity-50"
  ].join(" "),
  {
    variants: {
      intent: {
        default: "focus:ring-(--primary)",
        destructive:
          "border-(--destructive) focus:ring-(--destructive)",
        warning: "border-(--warning) focus:ring-(--warning)"
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
        className="text-sm font-medium text-(--foreground)"
      >
        {props.label}
        {props.isRequired && (
          <span aria-hidden="true" className="ml-0.5 text-(--destructive)">
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
          className="text-sm text-(--muted-foreground)"
        >
          {props.description}
        </p>
      )}
      {isInvalid && errorContent && (
        <p {...errorMessageProps} className="text-sm text-(--destructive)">
          {errorContent}
        </p>
      )}
    </div>
  )
}

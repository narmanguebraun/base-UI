"use client"

// React Aria hooks require a client component

import { useId, useRef } from "react"

import { cva, VariantProps } from "class-variance-authority"
import { AriaCheckboxProps, useCheckbox } from "react-aria"
import { useToggleState } from "react-stately"

const boxStyles = cva(
  [
    "shrink-0",
    "rounded-(--radius-tightest)",
    "border border-(--border)",
    "flex items-center justify-center",
    "transition-colors",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

// label is required — all checkboxes must have a visible label for accessibility
type CheckboxProps = Omit<AriaCheckboxProps, "children"> &
  VariantProps<typeof boxStyles> & {
    label: string
    description?: string
    errorMessage?: string
  }

export function Checkbox({
  size,
  label,
  description,
  errorMessage,
  ...props
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)
  const state = useToggleState(props)
  const { labelProps, inputProps, isSelected, isDisabled, isInvalid } =
    useCheckbox(props, state, ref)

  const descriptionId = useId()
  const errorId = useId()

  const ariaDescribedBy = [
    inputProps["aria-describedby"],
    description && !isInvalid ? descriptionId : undefined,
    isInvalid && errorMessage ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined

  const isFilled = isSelected || props.isIndeterminate

  return (
    <div className="flex flex-col gap-1.5">
      <label
        {...labelProps}
        className={[
          "inline-flex items-center gap-2",
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        ].join(" ")}
      >
        <input
          {...inputProps}
          ref={ref}
          className="sr-only"
          aria-checked={props.isIndeterminate ? "mixed" : inputProps["aria-checked"]}
          aria-describedby={ariaDescribedBy}
        />
        <div
          aria-hidden="true"
          data-selected={isSelected || undefined}
          data-indeterminate={props.isIndeterminate || undefined}
          className={[
            boxStyles({ size }),
            isFilled
              ? "bg-(--primary) border-(--primary)"
              : "bg-(--background)",
            isInvalid ? "border-(--destructive)" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {props.isIndeterminate ? (
            <svg
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="h-3 w-3 text-(--primary-foreground)"
            >
              <path
                d="M2.5 6h7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : isSelected ? (
            <svg
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="h-3 w-3 text-(--primary-foreground)"
            >
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </div>
        <span className="text-sm text-(--foreground)">{label}</span>
      </label>
      {description && !isInvalid && (
        <p id={descriptionId} className="text-sm text-(--muted-foreground)">
          {description}
        </p>
      )}
      {isInvalid && errorMessage && (
        <p id={errorId} className="text-sm text-(--destructive)">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

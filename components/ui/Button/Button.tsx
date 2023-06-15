import { useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import { cva, VariantProps } from "class-variance-authority";

type ButtonProps = {
  intent: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
} & AriaButtonProps &
  VariantProps<typeof buttonStyles>;

const buttonStyles = cva(
  "flex items-center justify-center px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-white dark:focus:ring-offset-black focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80",
  {
    variants: {
      intent: {
        primary: "bg-blue-600 text-white focus:ring-blue-600",
        secondary: "bg-purple-600 text-white focus:ring-purple-600",
        danger: "bg-red-600 text-white focus:ring-red-500",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

export function Button({ intent, fullWidth, ...props }: ButtonProps) {
  const ref = useRef(null);
  const { children } = props;
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={buttonStyles({ intent, fullWidth })}
      {...props}
    >
      {children}
    </button>
  );
}

// import React from "react";
// import { cva, type VariantProps } from "class-variance-authority";

// const button = cva("button", {
//   variants: {
//     intent: {
//       primary: [
//         "bg-blue-500",
//         "text-white",
//         "border-transparent",
//         "hover:bg-blue-600",
//       ],
//       secondary: [
//         "bg-white",
//         "text-gray-800",
//         "border-gray-400",
//         "hover:bg-gray-100",
//       ],
//     },
//     size: {
//       small: ["text-sm", "py-1", "px-2"],
//       medium: ["text-base", "py-2", "px-4"],
//     },
//   },
//   compoundVariants: [{ intent: "primary", size: "medium", class: "uppercase" }],
//   defaultVariants: {
//     intent: "primary",
//     size: "medium",
//   },
// });

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof button> {}

// export const Button: React.FC<ButtonProps> = ({
//   className,
//   intent,
//   size,
//   ...props
// }) => <button className={button({ intent, size, className })} {...props} />;

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Spin } from "antd";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
  // link?: { href: string; target?: React.HTMLAttributeAnchorTarget };
  full?: boolean;
  color?: AtomColorType;
  size?: AtomSizeType;
  roundedSize?: "md" | "xl" | "full";
  loading?: boolean;
  scale?: boolean;
}

 
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      color = "primary",
      size = "lg",
      roundedSize = "md",
      full,
      loading,
      className,
      scale,
      // link,
      ...rest
    } = props;

    const Component: React.ElementType = "button";

    return (
      <Component
        ref={ref} // Type will be automatically inferred based on Component
        type={"button"} // Ensure type isn't passed to Link
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-center font-semibold",
          "focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100",
          "transition-transform",
          scale && "hover:scale-105",
          {
            xs: "px-2 py-1 text-xs",
            sm: "px-2 py-1 text-sm",
            md: "px-2.5 py-1.5 text-sm",
            icon: "p-0 h-9 w-9",
            lg: "px-3 py-2 text-sm",
            xl: "px-3.5 py-2.5 text-sm",
            "2xl": "px-6 py-3 text-base font-medium",
            circle: "",
          }[size],
          {
            md: "rounded-md",
            xl: "rounded-xl",
            full: "rounded-full py-4 shadow-lg",
          }[roundedSize],
          {
            "border-none shadow-sm hover:shadow focus:outline-none hover:bg-black/30 focus:ring-2 focus:ring-offset-2 transition":
              color === "transparent",
            "w-full": full,
            "bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900/0 ":
              color === "primary",
            "bg-red-300 text-red-800 hover:bg-red-300/80 transition": color === "red3",
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200 transition":
              color === "white",
            "bg-blue-300 text-blue-800 hover:bg-blue-300/80 transition": color === "blue3",
            "bg-orange-300 text-orange-800 hover:bg-orange-300/80 transition":
              color === "orange3",
            "bg-green-300 text-green-800 hover:bg-green-300/80 transition":
              color === "green3",

            "bg-red-500 text-white hover:bg-red-500/80 transition": color === "red5",

            "bg-blue-500 hover:bg-blue-500/80 text-white transition": color === "blue5",
            "bg-orange-500 hover:bg-orange-500/80 text-white":
              color === "orange5",
            "bg-green-500 hover:bg-green-500/80 transition": color === "green5",

            "bg-slate-300 text-secondary-foreground hover:bg-slate-300/80":
              color === "secondary",
          },
          className
        )}
        {...rest}
        disabled={loading || props.disabled}
      >
        {loading && (
          <span
            className={cn(
              rest.children && loading && size !== "icon" ? "mr-2" : ""
            )}
          >
            <Spin />
          </span>
        )}
        {loading && size === "icon" ? null : rest.children}
      </Component>
    );
  }
);

Button.displayName = "Button";

// const BasicLink = forwardRef<HTMLAnchorElement, ButtonProps & { link: { href: string; target?: React.HTMLAttributeAnchorTarget } }>(
//   ({ link: { href, target, rel }, children, ...rest }, ref) => {
//     return (
//       <Link href={href} target={target} rel={rel} {...rest} ref={ref}>
//         {children}
//       </Link>
//     );
//   }
// );

// BasicLink.displayName = "BasicLink";


type AtomColorType =
  | "primary"
  | "white"
  | "red3"
  | "blue3"
  | "green3"
  | "red5"
  | "blue5"
  | "green5"
  | "orange3"
  | "orange5"
  | "transparent"
  | "secondary";

type AtomSizeType = "xs" | "sm" | "md" | "icon" | "lg" | "xl" | "2xl" | "circle";
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { Text, Pressable } from "@/tw";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex flex-row items-center justify-center rounded-lg transition-colors active:opacity-80 disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-sf-blue",
        destructive: "bg-sf-red",
        outline: "border border-sf-gray bg-transparent",
        secondary: "bg-sf-gray-2",
        ghost: "bg-transparent active:bg-sf-gray/10",
        link: "bg-transparent",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-9 px-4 rounded-md",
        lg: "h-14 px-8 rounded-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  textClassName?: string;
  title?: string;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, textClassName, variant, size, children, title, ...props }, ref) => {
    return (
      <Pressable
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {typeof children === "string" || title ? (
          <Text
            className={cn(
              "text-base font-semibold",
              (variant === "outline" || variant === "ghost") && "text-sf-text",
              variant === "secondary" && "text-sf-text",
              variant === "link" && "text-sf-blue underline",
              (variant === "default" || variant === "destructive") && "text-white",
              textClassName
            )}
          >
            {title || children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

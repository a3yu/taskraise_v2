import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        smallclear:
          "bg-white font-semibold bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50",
        fancyaccept:
          "bg-gradient-to-r from-green-500 to-green-600 items-center justify-center flex flex-row gap-3 whitespace-nowrap rounded-lg  text-sm font-medium transition-all input-focus ease-in-out duration-300 border-primary-dark border-2 text-white hover:to-green-500 ",
        fancyreject:
          "bg-gradient-to-r from-red-500 to-red-700 items-center justify-center flex flex-row gap-3 whitespace-nowrap rounded-lg  text-sm font-medium transition-all input-focus ease-in-out duration-300 border-primary-dark border-2 text-white hover:to-red-600",
        fancy:
          "items-center justify-center flex flex-row gap-3 whitespace-nowrap rounded-lg  text-sm font-medium transition-all input-focus ease-in-out duration-300 bg-gradient-to-t from-primary to-[#4a4a63] border-primary-dark border-2 text-white hover:to-[#5C5C72] ",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

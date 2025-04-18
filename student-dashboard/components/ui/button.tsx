import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 disabled:pointer-events-none disabled:opacity-50",
          
          // Variants
          variant === "default" && "bg-purple-600 text-white hover:bg-purple-500",
          variant === "outline" && "border border-gray-600 bg-transparent hover:bg-gray-700 hover:text-white",
          variant === "secondary" && "bg-gray-700 text-white hover:bg-gray-600",
          variant === "destructive" && "bg-red-600 text-white hover:bg-red-500",
          variant === "ghost" && "hover:bg-gray-700 hover:text-white",
          variant === "link" && "text-purple-400 underline-offset-4 hover:underline",
          
          // Sizes
          size === "default" && "h-9 px-4 py-2",
          size === "sm" && "h-8 rounded-md px-3 text-xs",
          size === "lg" && "h-10 rounded-md px-8",
          size === "icon" && "h-9 w-9",
          
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button }; 
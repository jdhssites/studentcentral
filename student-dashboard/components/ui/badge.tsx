import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2",
        variant === "default" && "bg-purple-900/50 text-purple-200",
        variant === "outline" && "border border-purple-600 text-purple-300",
        className
      )}
      {...props}
    />
  );
}

export { Badge }; 
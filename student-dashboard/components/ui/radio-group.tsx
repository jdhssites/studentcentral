"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  onValueChange: (value: string) => void
}

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  RadioGroupProps
>(({ className, value, onValueChange, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("grid gap-2", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<any>(child)) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onChange: () => onValueChange(child.props.value)
          })
        }
        return child
      })}
    </div>
  )
})
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  RadioGroupItemProps
>(({ value, id, checked, onChange, ...props }, ref) => {
  return (
    <label 
      htmlFor={id} 
      className="flex items-center space-x-2 cursor-pointer"
    >
      <div className="relative">
        <input
          type="radio"
          id={id}
          ref={ref}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <div className={cn(
          "aspect-square h-4 w-4 rounded-full border border-indigo-500 flex items-center justify-center",
          checked ? "border-indigo-500" : "border-gray-600"
        )}>
          {checked && (
            <div className="h-2 w-2 rounded-full bg-indigo-500" />
          )}
        </div>
      </div>
    </label>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem } 
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value = [0], min = 0, max = 100, step = 1, onValueChange, ...props }, ref) => {
    const trackRef = React.useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = React.useState(false)

    const getValueFromPosition = (position: number) => {
      if (!trackRef.current) return min
      
      const trackRect = trackRef.current.getBoundingClientRect()
      const trackWidth = trackRect.width
      
      let percent = (position - trackRect.left) / trackWidth
      percent = Math.min(Math.max(percent, 0), 1)
      
      // Calculate value based on min, max, and step
      const rawValue = min + percent * (max - min)
      
      // Apply step
      const steppedValue = Math.round(rawValue / step) * step
      
      // Ensure value is within bounds
      return Math.min(Math.max(steppedValue, min), max)
    }

    const handleInteractionStart = (clientX: number) => {
      setIsDragging(true)
      const newValue = getValueFromPosition(clientX)
      if (onValueChange) onValueChange([newValue])
    }

    const handleInteractionMove = (clientX: number) => {
      if (!isDragging) return
      const newValue = getValueFromPosition(clientX)
      if (onValueChange) onValueChange([newValue])
    }

    const handleInteractionEnd = () => {
      setIsDragging(false)
    }

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent) => {
      handleInteractionStart(e.clientX)
    }

    // Touch events
    const handleTouchStart = (e: React.TouchEvent) => {
      handleInteractionStart(e.touches[0].clientX)
    }

    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        handleInteractionMove(e.clientX)
      }

      const handleTouchMove = (e: TouchEvent) => {
        handleInteractionMove(e.touches[0].clientX)
      }

      const handleEnd = () => {
        handleInteractionEnd()
      }

      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('touchmove', handleTouchMove)
        document.addEventListener('mouseup', handleEnd)
        document.addEventListener('touchend', handleEnd)
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('mouseup', handleEnd)
        document.removeEventListener('touchend', handleEnd)
      }
    }, [isDragging])

    // Calculate thumb position as percentage
    const percentage = value[0] ? ((value[0] - min) / (max - min)) * 100 : 0

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <div
          ref={trackRef}
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-800"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div
            className="absolute h-full bg-indigo-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          className="absolute h-4 w-4 rounded-full border border-indigo-500 bg-indigo-500"
          style={{ left: `calc(${percentage}% - 8px)` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider } 
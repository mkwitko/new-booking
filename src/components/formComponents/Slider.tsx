"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

interface SliderProps extends SliderPrimitive.SliderProps {
  initialValue: number | null | undefined
}

export function Slider({ className, initialValue, ...props }: SliderProps) {
  return (
    <SliderPrimitive.Root {...props} className={cn("relative flex items-center select-none w-[87%] mx-auto h-5", className)}>
      <SliderPrimitive.Track className="bg-slate-100 relative flex-1 rounded-full h-1">
        <SliderPrimitive.Range className="absolute bg-primary rounded-full h-full" />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb>
        <SliderThumb value={initialValue} />
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
}

function SliderThumb({ value }: { value: number | null | undefined}) {
  return (
    <div className="relative flex flex-col items-center -mt-4">
        <span className="text-xs text-primary font-bold">{value ?? ''}</span>

      <div className="block h-3 w-3 bg-primary border-2 border-white rounded-full"></div>
    </div>
  )
}

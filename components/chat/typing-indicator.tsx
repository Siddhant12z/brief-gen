"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TypingIndicatorProps {
  className?: string
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cn("flex items-center space-x-1 text-muted-foreground", className)}>
      <span className="text-sm">AI is typing</span>
      <div className="flex space-x-1">
        <div className="h-1.5 w-1.5 animate-[bounce_1.4s_infinite] rounded-full bg-current" />
        <div className="h-1.5 w-1.5 animate-[bounce_1.4s_infinite_0.2s] rounded-full bg-current" />
        <div className="h-1.5 w-1.5 animate-[bounce_1.4s_infinite_0.4s] rounded-full bg-current" />
      </div>
    </div>
  )
}
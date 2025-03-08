import type React from "react"
import { TypingIndicator } from "./typing-indicator"

interface ChatContainerProps {
  children: React.ReactNode
  className?: string
  isTyping?: boolean
}

export function ChatContainer({ children, className, isTyping = false }: ChatContainerProps) {
  return (
    <div className={`flex-1 overflow-y-auto space-y-4 p-4 ${className || ''}`} suppressHydrationWarning>
      {children}
      {isTyping && <TypingIndicator className="mt-4" />}
    </div>
  )
}


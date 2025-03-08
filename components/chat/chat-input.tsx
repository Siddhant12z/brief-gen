"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, ImageIcon } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  onFileUpload: (file: File) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, onFileUpload, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && !disabled) {
      onFileUpload(file)
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="bg-purple-950/20 border-purple-500/20 text-white hover:bg-purple-900/30"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
      >
        <ImageIcon className="h-5 w-5" />
        <span className="sr-only">Upload image</span>
      </Button>

      <Input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
      />

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={disabled ? "Upgrade to continue chatting" : "Type your message..."}
        className="flex-1 bg-purple-950/20 border-purple-500/20 text-white placeholder:text-gray-400"
        disabled={disabled}
      />

      <Button
        type="submit"
        size="icon"
        className="bg-purple-600 hover:bg-purple-700 text-white"
        disabled={!message.trim() || disabled}
      >
        <Send className="h-5 w-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  )
}


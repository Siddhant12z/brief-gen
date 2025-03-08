"use client"

import Image from "next/image"
import { OptionButtons } from "./option-buttons"
import { HeatmapFeedback } from "./heatmap-feedback"

interface MessageProps {
  message: {
    id: string
    content: string
    role: "user" | "assistant"
    type: "text" | "image" | "options" | "heatmap" | "brief"
    options?: Array<{ id: string; label: string }>
    imageUrl?: string
    heatmapUrl?: string
    brief?: {
      sections: Array<{
        title: string
        content: string
        inspirationLinks?: Array<{
          url: string
          title: string
          platform: string
        }>
      }>
    }
  }
  onOptionSelect: (optionId: string) => void
}

export function Message({ message, onOptionSelect }: MessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`} suppressHydrationWarning>
      <div
        className={`max-w-[80%] ${isUser ? "bg-purple-600/30" : "bg-purple-900/30"} 
                      backdrop-blur-md border ${isUser ? "border-purple-500/30" : "border-purple-500/20"} 
                      rounded-2xl p-4 shadow-md`}
        suppressHydrationWarning
      >
        {/* Text message */}
        {message.type === "text" && <p className="text-white">{message.content}</p>}

        {/* Brief message */}
        {message.type === "brief" && message.brief && (
          <div className="space-y-6" suppressHydrationWarning>
            {message.brief.sections.map((section, index) => (
              <div key={index} className="space-y-3" suppressHydrationWarning>
                <h3 className="text-lg font-semibold text-white border-b border-purple-500/30 pb-2">
                  {section.title}
                </h3>
                <p className="text-white">{section.content}</p>
                {section.inspirationLinks && section.inspirationLinks.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-purple-300 mb-2">Design Inspiration:</h4>
                    <div className="space-y-1">
                      {section.inspirationLinks.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-purple-400 hover:text-purple-300 transition-colors text-sm"
                        >
                          {link.title} ({link.platform})
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Image message */}
        {message.type === "image" && (
          <div className="space-y-2" suppressHydrationWarning>
            <p className="text-white">{message.content}</p>
            <div className="relative h-60 w-full overflow-hidden rounded-lg" suppressHydrationWarning>
              <Image
                src={message.imageUrl || "/placeholder.svg?height=400&width=600"}
                alt="Uploaded design"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}

        {/* Options message */}
        {message.type === "options" && (
          <div className="space-y-4" suppressHydrationWarning>
            <p className="text-white">{message.content}</p>
            {message.options && <OptionButtons options={message.options} onSelect={onOptionSelect} />}
          </div>
        )}

        {/* Heatmap feedback */}
        {message.type === "heatmap" && (
          <div className="space-y-4" suppressHydrationWarning>
            <p className="text-white">{message.content}</p>
            <HeatmapFeedback
              originalImageUrl={message.imageUrl || "/placeholder.svg?height=400&width=600"}
              heatmapImageUrl={message.heatmapUrl || "/placeholder.svg?height=400&width=600"}
            />
          </div>
        )}
      </div>
    </div>
  )
}


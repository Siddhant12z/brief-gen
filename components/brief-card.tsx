"use client"

import { Lock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BriefCardProps {
  brief: string
  onNext: () => void
  onToggleDetail: () => void
  isDetailedView: boolean
}

function formatBriefContent(content: string) {
  // Split content into sections
  const sections = content.split('\n# ').filter(Boolean)
  
  if (sections.length <= 1) {
    return <p className="text-gray-300 text-lg leading-relaxed">{content}</p>
  }

  return (
    <div className="space-y-8">
      {sections.map((section, index) => {
        const [title, ...content] = section.split('\n')
        const sectionContent = content.join('\n').trim()

        return (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-300">
              {index === 0 ? section.split('\n')[0] : title}
            </h3>
            <div className="text-gray-300 text-lg leading-relaxed">
              {sectionContent.split('\n').map((line, i) => {
                if (line.startsWith('- ')) {
                  return (
                    <div key={i} className="flex items-start space-x-2 ml-4 mb-2">
                      <span className="text-purple-400 mt-2.5">•</span>
                      <span>{line.substring(2)}</span>
                    </div>
                  )
                }
                return line.trim() && <p key={i} className="mb-2">{line}</p>
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function BriefCard({ brief, onNext, onToggleDetail, isDetailedView }: BriefCardProps) {
  return (
    <div className="group relative rounded-2xl transition-all duration-500 hover:shadow-[0_0_25px_rgba(147,51,234,0.3)]">
      <div
        className="h-full backdrop-blur-xl bg-gradient-to-br from-purple-900/30 to-purple-800/20 
                    border border-purple-500/20 rounded-2xl p-8 flex flex-col gap-6"
      >
        {/* Brief content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Design Brief</h2>
          <div className="prose prose-invert max-w-none">
            {formatBriefContent(brief)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-purple-500/20">
          <Button
            variant="outline"
            className="flex-1 bg-purple-950/40 border-purple-500/20 text-white hover:bg-purple-900/50"
            onClick={onToggleDetail}
          >
            <span>{isDetailedView ? "Show Brief" : "Show Full Brief"}</span>
          </Button>

          <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white border-0" onClick={onNext}>
            <span>Next Brief</span>
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


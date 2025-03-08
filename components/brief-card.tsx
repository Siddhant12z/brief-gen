"use client"

import { Lock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BriefCardProps {
  brief: string
  onNext: () => void
}

export function BriefCard({ brief, onNext }: BriefCardProps) {
  return (
    <div className="group relative rounded-2xl transition-all duration-500 hover:shadow-[0_0_25px_rgba(147,51,234,0.3)]">
      <div
        className="h-full backdrop-blur-xl bg-gradient-to-br from-purple-900/30 to-purple-800/20 
                    border border-purple-500/20 rounded-2xl p-8 flex flex-col gap-6"
      >
        {/* Brief content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Design Brief</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{brief}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          <Button
            variant="outline"
            className="flex-1 bg-purple-950/40 border-purple-500/20 text-white hover:bg-purple-900/50"
            onClick={() => {}}
            disabled
          >
            <span>Show Full Brief</span>
            <Lock className="ml-2 h-4 w-4" />
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


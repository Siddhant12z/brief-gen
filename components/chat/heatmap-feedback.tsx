"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface HeatmapFeedbackProps {
  originalImageUrl: string
  heatmapImageUrl: string
}

export function HeatmapFeedback({ originalImageUrl, heatmapImageUrl }: HeatmapFeedbackProps) {
  const [showHeatmap, setShowHeatmap] = useState(true)

  return (
    <div className="space-y-4" suppressHydrationWarning>
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg" suppressHydrationWarning>
        {/* Original image */}
        <Image src={originalImageUrl || "/placeholder.svg"} alt="Original design" fill className="object-contain" />

        {/* Heatmap overlay */}
        {showHeatmap && (
          <div className="absolute inset-0 bg-black/50" suppressHydrationWarning>
            <Image
              src={heatmapImageUrl || "/placeholder.svg"}
              alt="Heatmap analysis"
              fill
              className="object-contain mix-blend-screen"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center" suppressHydrationWarning>
        <Button
          variant="outline"
          className="bg-purple-950/30 border-purple-500/30 text-white hover:bg-purple-800/40"
          onClick={() => setShowHeatmap(!showHeatmap)}
        >
          {showHeatmap ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              <span>Hide Heatmap</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              <span>Show Heatmap</span>
            </>
          )}
        </Button>

        <div className="flex space-x-2" suppressHydrationWarning>
          <div className="flex items-center" suppressHydrationWarning>
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1" suppressHydrationWarning></div>
            <span className="text-xs text-gray-300">Good</span>
          </div>
          <div className="flex items-center" suppressHydrationWarning>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1" suppressHydrationWarning></div>
            <span className="text-xs text-gray-300">Improve</span>
          </div>
          <div className="flex items-center" suppressHydrationWarning>
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1" suppressHydrationWarning></div>
            <span className="text-xs text-gray-300">Issues</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-4" suppressHydrationWarning>
        <h4 className="font-semibold text-white">Feedback Summary:</h4>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>Strong visual hierarchy in the main navigation</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">⚠</span>
            <span>Consider increasing contrast in the footer section</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-400 mr-2">✗</span>
            <span>Call-to-action button lacks sufficient visual prominence</span>
          </li>
        </ul>
      </div>
    </div>
  )
}


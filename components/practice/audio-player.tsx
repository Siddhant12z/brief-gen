"use client"

import { Volume2, VolumeX, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AudioPlayerProps {
  isPlaying: boolean
  isMuted: boolean
  onTogglePlay: () => void
  onToggleMute: () => void
}

export function AudioPlayer({ isPlaying, isMuted, onTogglePlay, onToggleMute }: AudioPlayerProps) {
  return (
    <div className="backdrop-blur-md bg-purple-900/20 border border-purple-500/20 rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-white hover:bg-purple-800/30"
          onClick={onTogglePlay}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <div className="text-sm text-white">
          <span>Lofi Beats</span>
          <span className="mx-2">•</span>
          <span className="text-gray-400">Focus Music</span>
        </div>
      </div>

      <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-purple-800/30" onClick={onToggleMute}>
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}


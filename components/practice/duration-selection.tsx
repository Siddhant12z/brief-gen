"use client"

import { Clock } from "lucide-react"

interface DurationSelectionProps {
  options: number[]
  onSelect: (duration: number) => void
}

export function DurationSelection({ options, onSelect }: DurationSelectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white text-center mb-6">How long would you like to practice?</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((duration) => (
          <button
            key={duration}
            className="group backdrop-blur-xl bg-gradient-to-br from-purple-900/30 to-purple-800/20 
                     border border-purple-500/20 rounded-xl p-6 text-center transition-all duration-300
                     hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:border-purple-500/40"
            onClick={() => onSelect(duration)}
          >
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-purple-300 mb-2" />
              <h3 className="text-xl font-semibold text-white">{duration} minutes</h3>
              <p className="text-gray-300 text-sm mt-1">
                {duration <= 15 ? "Quick session" : duration <= 30 ? "Medium session" : "Extended session"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}


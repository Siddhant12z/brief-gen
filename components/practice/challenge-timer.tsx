"use client"

import { Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChallengeTimerProps {
  challenge: {
    id: string
    title: string
    description: string
  }
  completedChallenges: number
  onComplete: (exit: boolean) => void
  timeLeft: number
  totalTime: number
  isRunning: boolean
  onToggleTimer: () => void
}

export function ChallengeTimer({
  challenge,
  completedChallenges,
  onComplete,
  timeLeft,
  totalTime,
  isRunning,
  onToggleTimer,
}: ChallengeTimerProps) {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage
  const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-gray-300 text-sm">Challenges completed: {completedChallenges}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Challenge content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-2">{challenge.title}</h2>
          <div className="text-gray-300 space-y-6">
            {challenge.description.split('#').map((section, index) => {
              if (!section.trim()) return null;
              
              const [title, ...content] = section.split('\n');
              const sectionContent = content.join('\n').trim();
              
              return (
                <div key={index} className="space-y-3">
                  <h3 className="text-xl font-semibold text-purple-300">{title.trim()}</h3>
                  <div className="pl-4">
                    {sectionContent.split('\n').map((line, i) => {
                      const trimmedLine = line.trim();
                      if (!trimmedLine) return null;
                      
                      // Check if line is a bullet point
                      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
                        return (
                          <div key={i} className="flex items-start space-x-2 mb-2">
                            <span className="text-purple-400">•</span>
                            <span>{trimmedLine.substring(1).trim()}</span>
                          </div>
                        );
                      }
                      
                      return <p key={i} className="mb-2">{trimmedLine}</p>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timer and controls */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Timer circle background */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#3f3f46" strokeWidth="8" />
              {/* Timer progress */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#a855f7"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progressPercentage) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{formatTime(timeLeft)}</span>
              <span className="text-sm text-gray-300">remaining</span>
            </div>
          </div>

          {/* Timer controls */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="bg-purple-950/30 border-purple-500/30 text-white hover:bg-purple-900/40"
              onClick={() => onComplete(true)}
            >
              Exit
            </Button>

            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => onComplete(false)}>
              Next
            </Button>
          </div>

          {/* Pause/Resume button */}
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-purple-900/20"
            onClick={onToggleTimer}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause Timer
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Resume Timer
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}


"use client"

import { X, Pause, Play } from "lucide-react"
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

export const ChallengeTimer = ({
  challenge,
  completedChallenges,
  onComplete,
  timeLeft,
  totalTime,
  isRunning,
  onToggleTimer,
}: ChallengeTimerProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const progressPercentage = (timeLeft / totalTime) * 100

  // Split challenge description into sections
  const sections = challenge?.description.split('#').filter(Boolean) || []

  return (
    <div className="flex flex-col space-y-6 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-xl font-medium">Practice</div>
          <div className="text-xl text-muted-foreground">{completedChallenges + 1}</div>
        </div>
        <div className="text-xl font-medium">{formatTime(timeLeft)}</div>
      </div>

      <div className="bg-muted h-1 w-full rounded-full overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-1000 ease-linear"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex flex-col space-y-6 pb-6">
        {sections.map((section, index) => {
          const [title, ...contentParts] = section.trim().split('\n')
          const content = contentParts.join('\n').trim()
          
          // Check if this is a subsection (##)
          const isSubsection = title.startsWith('## ')
          const sectionTitle = isSubsection ? title.substring(3).trim() : title.substring(2).trim()
          
          // For subsections, add appropriate styling
          const titleClassName = isSubsection 
            ? "text-base font-medium text-muted-foreground mt-2" 
            : "text-xl font-semibold mb-2"
          
          // Only add margin-top to sections after the first one
          const sectionClassName = index > 0 ? "mt-6" : ""
          
          return (
            <div key={index} className={sectionClassName}>
              <h3 className={titleClassName}>{sectionTitle}</h3>
              {content && (
                <div className="mt-2 text-muted-foreground">
                  {content.split('\n').map((line, i) => {
                    // Handle bullet points
                    if (line.trim().startsWith('-')) {
                      return (
                        <div key={i} className="flex items-start space-x-2 mt-1">
                          <span className="text-primary">•</span>
                          <span>{line.trim().substring(1).trim()}</span>
                        </div>
                      )
                    }
                    return <p key={i} className="mt-1">{line}</p>
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex justify-between mt-auto space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onComplete(true)}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <Button
            variant="default"
            className="w-full"
            onClick={() => onComplete(false)}
          >
            Next
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleTimer}
        >
          {isRunning ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}


"use client"

import { useState, useRef, useEffect } from "react"
import { CategorySelection } from "@/components/practice/category-selection"
import { DurationSelection } from "@/components/practice/duration-selection"
import { ChallengeTimer } from "@/components/practice/challenge-timer"
import { AudioPlayer } from "@/components/practice/audio-player"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Volume2 } from "lucide-react"
import { AIClient } from "@/lib/ollama-client"

// Practice steps
type PracticeStep = "category" | "duration" | "challenge"

// Challenge interface
interface Challenge {
  id: string
  title: string
  description: string
}

// Sample challenges by category
const challengesByCategory: Record<string, Challenge[]> = {
  "mobile-app": [
    {
      id: "mobile-1",
      title: "Social Media App",
      description: "Design a profile screen for a social media app with user stats, recent posts, and navigation.",
    },
    {
      id: "mobile-2",
      title: "Food Delivery App",
      description: "Create a restaurant details screen with menu items, reviews, and ordering functionality.",
    },
    {
      id: "mobile-3",
      title: "Fitness Tracker",
      description: "Design an activity dashboard showing workout stats, progress charts, and achievement badges.",
    },
    {
      id: "mobile-4",
      title: "Travel App",
      description: "Design a destination details page with attractions, booking options, and user reviews.",
    },
    {
      id: "mobile-5",
      title: "Music Player",
      description: "Create a music player interface with playlist management, artist info, and playback controls.",
    },
  ],
  "web-app": [
    {
      id: "web-1",
      title: "Landing Page",
      description: "Design a landing page for a SaaS product with hero section, features, and call-to-action.",
    },
    {
      id: "web-2",
      title: "Dashboard Interface",
      description: "Create a web dashboard with data visualizations, user settings, and notification center.",
    },
    {
      id: "web-3",
      title: "E-commerce Platform",
      description: "Design a product listing page with filters, sorting options, and shopping cart functionality.",
    },
    {
      id: "web-4",
      title: "Blog Platform",
      description: "Design a blog homepage with featured articles, categories, and newsletter signup.",
    },
    {
      id: "web-5",
      title: "Portfolio Website",
      description: "Create a portfolio website for a creative professional with project showcase and contact form.",
    },
  ],
  branding: [
    {
      id: "brand-1",
      title: "Logo Design",
      description: "Create a logo for a tech startup focusing on sustainability and innovation.",
    },
    {
      id: "brand-2",
      title: "Brand Style Guide",
      description: "Design a basic style guide with logo variations, color palette, and typography rules.",
    },
    {
      id: "brand-3",
      title: "Brand Identity Package",
      description:
        "Create a complete brand identity including logo, business cards, letterhead, and social media assets.",
    },
    {
      id: "brand-4",
      title: "Product Packaging",
      description:
        "Design packaging for a premium food product that reflects the brand values and stands out on shelves.",
    },
    {
      id: "brand-5",
      title: "Social Media Kit",
      description: "Create a set of templates for social media posts that maintain brand consistency across platforms.",
    },
  ],
  "product-design": [
    {
      id: "product-1",
      title: "Packaging Design",
      description: "Design packaging for an eco-friendly personal care product.",
    },
    {
      id: "product-2",
      title: "Smart Home Device",
      description: "Create a concept design for a smart home controller with interface mockups.",
    },
    {
      id: "product-3",
      title: "Product Line Extension",
      description: "Design a new product that extends an existing line while maintaining brand consistency.",
    },
    {
      id: "product-4",
      title: "Wearable Technology",
      description: "Design a wearable health monitoring device with both physical and interface components.",
    },
    {
      id: "product-5",
      title: "Sustainable Furniture",
      description:
        "Create a concept for a piece of furniture made from sustainable materials with minimal environmental impact.",
    },
  ],
}

// Duration options in minutes
const durationOptions = [10, 20, 30, 45, 60]

export default function PracticePage() {
  // State
  const [step, setStep] = useState<PracticeStep>("category")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedDuration, setSelectedDuration] = useState<number>(0)
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [completedChallenges, setCompletedChallenges] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [isGeneratingChallenges, setIsGeneratingChallenges] = useState(false)

  // Timer state - moved to parent component to maintain across challenges
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [totalSessionTime, setTotalSessionTime] = useState(0)

  // Audio ref
  const audioRef = useRef<HTMLAudioElement>(null)

  // Effect to handle audio playback based on isPlaying state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Play audio and handle any errors
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error)
          // Reset isPlaying state if playback fails
          setIsPlaying(false)
        })
      } else {
        // Pause audio when isPlaying is false
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  // Timer effect - controls the main session timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && step === "challenge") {
      // Time's up for the whole session
      setSessionCompleted(true)
      setIsRunning(false)

      // Stop music
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, step])

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setStep("duration")
  }

  // Handle duration selection
  const handleDurationSelect = (duration: number) => {
    setSelectedDuration(duration)
    // Set the total session time in seconds
    const durationInSeconds = duration * 60
    setTimeLeft(durationInSeconds)
    setTotalSessionTime(durationInSeconds)

    // Move to challenge page immediately
    setStep("challenge")
    setIsGeneratingChallenges(true)

    // Generate challenges in the background
    generateChallenges(duration).then(() => {
      setIsGeneratingChallenges(false)
      setIsRunning(true)
      setIsPlaying(true)
      setCompletedChallenges(0)
      
      // Don't auto-play music here - we'll let the user trigger it
      // through the AudioPlayer component
    })
  }

  // Generate challenges based on category
  const generateChallenges = async (duration: number) => {
    try {
      const categoryChallenges = challengesByCategory[selectedCategory] || []
      const aiClient = new AIClient()

      // Take only the first 5 challenges to prevent excessive API calls
      const selectedChallenges = categoryChallenges.slice(0, 5)

      // Generate briefs using LLM
      const shuffledChallenges = await Promise.all(
        selectedChallenges.map(async (challenge, index) => {
          const prompt = `Generate a structured design brief for a ${selectedCategory} project titled "${challenge.title}".
          
          Format the response with clear sections:
          
          # Task
          [Provide a clear, specific task focusing on a single UI component or element]
          
          # Requirements
          - [3-4 bullet points of specific requirements]
          - [Include at least one point about visual style (glassmorphic, neumorphic, etc.)]
          - [Include at least one point about functionality]
          
          # Difficulty Level
          [Indicate difficulty: Beginner/Intermediate/Advanced]
          
          Keep the entire brief concise but actionable, with clear instructions a designer can immediately work on.`
          
          try {
            const brief = await aiClient.generateResponse(prompt)
            return { ...challenge, description: brief.trim() }
          } catch (error) {
            console.error('Failed to generate brief:', error)
            return challenge
          }
        })
      )

      // Shuffle the challenges for variety
      const randomizedChallenges = shuffledChallenges.sort(() => Math.random() - 0.5)

      setChallenges(randomizedChallenges)
      setCurrentChallengeIndex(0)
    } catch (error) {
      console.error('Failed to generate challenges:', error)
      // Use default challenges if generation fails
      const defaultChallenges = challengesByCategory[selectedCategory] || []
      setChallenges(defaultChallenges)
      setCurrentChallengeIndex(0)
    } finally {
      setIsGeneratingChallenges(false)
    }
  }

  // Handle challenge completion
  const handleChallengeComplete = (exit = false) => {
    if (exit) {
      // Exit practice session
      setSessionCompleted(true)
      setIsRunning(false)

      // Stop music
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      return
    }

    // Increment completed challenges counter
    setCompletedChallenges((prev) => prev + 1)

    // Move to next challenge only if there are more challenges
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1)
    } else {
      // If we've reached the end of challenges, stay on the last one
      // User can go back and select a new category/duration if they want more challenges
      // User can go back and select a new category/duration if they want more challenges
      setIsRunning(false)
      setSessionCompleted(true)
    }
  }

  // Handle going back
  const handleBack = () => {
    if (step === "duration") {
      setStep("category")
    } else if (step === "challenge") {
      // Stop music when going back
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      setIsPlaying(false)
      setIsRunning(false)
      setStep("duration")
    }
  }

  // Handle restart
  const handleRestart = () => {
    setStep("category")
    setSelectedCategory("")
    setSelectedDuration(0)
    setChallenges([])
    setCurrentChallengeIndex(0)
    setCompletedChallenges(0)
    setSessionCompleted(false)
    setIsPlaying(false)
    setIsRunning(false)
    setTimeLeft(0)

    // Stop music
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Toggle timer pause/resume
  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  // Current challenge
  const currentChallenge = challenges[currentChallengeIndex]

  return (
      <div className="min-h-screen bg-black bg-gradient-to-br from-black via-purple-950/10 to-black p-4 md:p-8 relative overflow-hidden">
          {/* Ambient glow effects */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] opacity-50"></div>
  
          {/* Audio element */}
          <audio
            ref={audioRef}
            loop
            preload="auto"
            className="hidden"
            src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
        />
  
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Quick{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300">
                  Practice
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">Sharpen your design skills with timed challenges</p>
          </div>
  
            {/* Back button */}
            {step !== "category" && !sessionCompleted && (
              <Button
                variant="outline"
                className="absolute top-0 left-0 bg-purple-950/20 border-purple-500/20 text-white hover:bg-purple-900/30"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
          )}
  
            {/* Audio controls */}
            {step === "challenge" && !sessionCompleted && (
              <Button
                variant="outline"
                className="absolute top-0 right-0 bg-purple-950/20 border-purple-500/20 text-white hover:bg-purple-900/30"
                onClick={toggleMute}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                {isMuted ? "Unmute" : "Mute"} Music
              </Button>
          )}
  
            {/* Main content */}
            <div
              className="backdrop-blur-xl bg-gradient-to-br from-purple-900/20 to-purple-800/10 
                          border border-purple-500/20 rounded-2xl p-6 md:p-8 shadow-lg"
            >
              {/* Step 1: Category Selection */}
            {step === "category" && <CategorySelection onSelect={handleCategorySelect} />}
  
              {/* Step 2: Duration Selection */}
            {step === "duration" && <DurationSelection options={durationOptions} onSelect={handleDurationSelect} />}
  
              {/* Loading State */}
              {isGeneratingChallenges && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-300">Generating practice brief...</p>
                </div>
              )}
    
              {/* Step 3: Challenge Timer */}
              {step === "challenge" && currentChallenge && !sessionCompleted && !isGeneratingChallenges && (
                <ChallengeTimer
                challenge={currentChallenge}
                completedChallenges={completedChallenges}
                  onComplete={handleChallengeComplete}
                  timeLeft={timeLeft}
                  totalTime={totalSessionTime}
                  isRunning={isRunning}
                  onToggleTimer={toggleTimer}
                />
              )}
    
              {/* Session completed */}
              {sessionCompleted && (
                <div className="text-center py-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Practice Complete!</h2>
                <p className="text-gray-300 mb-8">
                  You've completed {completedChallenges} challenges in your {selectedDuration}-minute practice session.
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleRestart}>
                    Start New Practice
                  </Button>
                </div>
              )}
            </div>
    
            {/* Audio player */}
            {step === "challenge" && !sessionCompleted && (
              <div className="mt-6">
              <AudioPlayer
              isPlaying={isPlaying}
              isMuted={isMuted}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              onToggleMute={toggleMute}
            />
          </div>
        )}
      </div>
    </div>
  )
}


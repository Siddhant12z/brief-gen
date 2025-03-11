"use client"

import { useState, useEffect } from 'react'
import BriefCard from '@/components/brief-card'
import { cn } from '@/lib/utils'
import { predefinedBriefs } from '@/lib/predefined-briefs'
import { SubscriptionBanner } from '@/components/chat/subscription-banner'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

export default function BriefsPage() {
  const [category, setCategory] = useState('web')
  const [prompt, setPrompt] = useState('')
  const [isFullBriefVisible, setIsFullBriefVisible] = useState(false)
  const [fullBriefCount, setFullBriefCount] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  // Load saved brief count from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('fullBriefCount')
    if (savedCount) {
      setFullBriefCount(parseInt(savedCount))
    }
  }, [])

  // Save brief count to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('fullBriefCount', fullBriefCount.toString())
  }, [fullBriefCount])

  // Initialize prompt when component loads or category changes
  useEffect(() => {
    const newPrompt = generateRandomBrief(category);
    setPrompt(newPrompt);
  }, [category]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    setIsFullBriefVisible(false)
  }

  const handleShowFullBrief = () => {
    setIsFullBriefVisible(true)
    setFullBriefCount(prevCount => prevCount + 1)
  }

  const generateRandomBrief = (category: string) => {
    const categoryBriefs = predefinedBriefs[category as keyof typeof predefinedBriefs]
    // Get a random subcategory
    const subcategories = Object.keys(categoryBriefs)
    const randomSubcategory = subcategories[Math.floor(Math.random() * subcategories.length)]
    
    // Get a random brief from the subcategory
    const briefs = categoryBriefs[randomSubcategory]
    const randomBrief = briefs[Math.floor(Math.random() * briefs.length)]
    
    return randomBrief.detailed
  }

  const handleNextBrief = () => {
    setIsGenerating(true)
    // Simulate loading for a more realistic experience
    setTimeout(() => {
      // Get a random brief for the selected category
      const newPrompt = generateRandomBrief(category)
      setPrompt(newPrompt)
      setIsFullBriefVisible(false)
      setIsGenerating(false)
    }, 1500)
  }

  const showSubscriptionBanner = fullBriefCount >= 3

  return (
    <main className="min-h-screen bg-black bg-gradient-to-br from-black via-purple-950/10 to-black p-4 md:p-8 relative overflow-hidden">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300">
            Design Brief Generator
          </span>
        </h1>
        
        <div className="mb-6 w-full">
          <Select onValueChange={handleCategoryChange} defaultValue={category}>
            <SelectTrigger className="w-full border-purple-500/30 bg-purple-950/20 backdrop-blur-sm text-purple-200">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-purple-950/80 backdrop-blur-xl border-purple-500/30">
              {Object.keys(predefinedBriefs).map((cat) => (
                <SelectItem key={cat} value={cat} className="text-purple-200 hover:text-white focus:text-white">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <BriefCard 
          category={category}
          prompt={prompt}
          isFullBriefVisible={isFullBriefVisible}
          onShowFullBrief={handleShowFullBrief}
          isSubscriptionRequired={fullBriefCount >= 3 && !isFullBriefVisible}
          isGenerating={isGenerating}
          onNextBrief={handleNextBrief}
        />

        {showSubscriptionBanner && (
          <SubscriptionBanner />
        )}
      </div>
    </main>
  )
}


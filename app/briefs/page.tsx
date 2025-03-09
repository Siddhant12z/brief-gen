"use client"

import { useState, useEffect, useCallback } from "react"
import { BriefCard } from "@/components/brief-card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { predefinedBriefs } from "@/lib/predefined-briefs"

const categories = [
  { value: "web", label: "Web Design" },
  { value: "mobile", label: "Mobile App" },
  { value: "branding", label: "Branding" },
  { value: "ui", label: "UI Design" },
]

export default function BriefsPage() {
  const [category, setCategory] = useState<string>("")
  const [currentBrief, setCurrentBrief] = useState("")
  const [currentBriefIndex, setCurrentBriefIndex] = useState(0)
  const [briefs, setBriefs] = useState<Array<{ short: string; detailed: string }>>([])
  const [isDetailedView, setIsDetailedView] = useState(false)

  // Update briefs when category changes
  useEffect(() => {
    if (!category) {
      setCurrentBrief("Please select a category to view design briefs.")
      setBriefs([])
      setCurrentBriefIndex(0)
      setIsDetailedView(false)
      return
    }

    // Collect all briefs from all niches for the selected category
    const allBriefs = Object.values(predefinedBriefs[category] || {}).flat()
    
    if (allBriefs.length === 0) {
      setCurrentBrief("No briefs available for this category.")
      setBriefs([])
      setCurrentBriefIndex(0)
      setIsDetailedView(false)
      return
    }

    setBriefs(allBriefs)
    setCurrentBriefIndex(0)
    setIsDetailedView(false)
    setCurrentBrief(allBriefs[0].short)
  }, [category])

  const generateNewBrief = useCallback(() => {
    if (briefs.length === 0) return

    const nextIndex = (currentBriefIndex + 1) % briefs.length
    setCurrentBriefIndex(nextIndex)
    setIsDetailedView(false)
    setCurrentBrief(briefs[nextIndex].short)
  }, [briefs, currentBriefIndex])

  const toggleDetailedView = useCallback(() => {
    if (briefs.length === 0) return
    
    setIsDetailedView(!isDetailedView)
    setCurrentBrief(isDetailedView ? briefs[currentBriefIndex].short : briefs[currentBriefIndex].detailed)
  }, [briefs, currentBriefIndex, isDetailedView])

  return (
    <div className="dark">
      <main className="min-h-screen bg-black bg-gradient-to-br from-black via-purple-950/10 to-black p-4 md:p-8 relative overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] opacity-50"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Design{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300">
                Briefs
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Generate custom design briefs based on your preferences
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-6 mb-8">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-purple-950/20 border-purple-500/20 text-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Brief Card */}
          <BriefCard 
            brief={currentBrief} 
            onNext={generateNewBrief} 
            onToggleDetail={toggleDetailedView}
            isDetailedView={isDetailedView}
          />
        </div>
      </main>
    </div>
  )
}


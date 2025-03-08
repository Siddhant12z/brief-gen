"use client"

import { useState } from "react"
import { BriefCard } from "@/components/brief-card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const categories = [
  { value: "web", label: "Web Design" },
  { value: "mobile", label: "Mobile App" },
  { value: "branding", label: "Branding" },
  { value: "ui", label: "UI Design" },
]

const niches = [
  { value: "tech", label: "Technology" },
  { value: "health", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "finance", label: "Finance" },
]

// Sample briefs (in production, these would come from an API)
const sampleBriefs = [
  "Design a modern landing page for a tech startup that focuses on AI-powered productivity tools. The design should emphasize innovation and efficiency.",
  "Create a mobile app interface for a healthcare provider that helps patients schedule appointments and view their medical records.",
  "Design a complete brand identity for an educational platform that offers online courses in digital skills.",
]

export default function BriefsPage() {
  const [category, setCategory] = useState<string>("")
  const [niche, setNiche] = useState<string>("")
  const [currentBrief, setCurrentBrief] = useState(sampleBriefs[0])

  const generateNewBrief = () => {
    // In production, this would call an API
    const randomBrief = sampleBriefs[Math.floor(Math.random() * sampleBriefs.length)]
    setCurrentBrief(randomBrief)
  }

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

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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

            <Select value={niche} onValueChange={setNiche}>
              <SelectTrigger className="bg-purple-950/20 border-purple-500/20 text-white">
                <SelectValue placeholder="Select Niche" />
              </SelectTrigger>
              <SelectContent>
                {niches.map((niche) => (
                  <SelectItem key={niche.value} value={niche.value}>
                    {niche.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Brief Card */}
          <BriefCard brief={currentBrief} onNext={generateNewBrief} />
        </div>
      </main>
    </div>
  )
}


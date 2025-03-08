"use client"

import { Smartphone, Globe, Palette, Box } from "lucide-react"

interface CategorySelectionProps {
  onSelect: (category: string) => void
}

export function CategorySelection({ onSelect }: CategorySelectionProps) {
  const categories = [
    {
      id: "mobile-app",
      name: "Mobile App",
      description: "Practice designing interfaces and components for mobile applications",
      icon: <Smartphone className="h-10 w-10 text-purple-300" />,
    },
    {
      id: "web-app",
      name: "Web App",
      description: "Create responsive web interfaces and interactive elements",
      icon: <Globe className="h-10 w-10 text-purple-300" />,
    },
    {
      id: "branding",
      name: "Branding",
      description: "Design logos, color schemes, and brand identity elements",
      icon: <Palette className="h-10 w-10 text-purple-300" />,
    },
    {
      id: "product-design",
      name: "Product Design",
      description: "Practice designing physical products and packaging",
      icon: <Box className="h-10 w-10 text-purple-300" />,
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white text-center mb-6">What would you like to practice today?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className="group backdrop-blur-xl bg-gradient-to-br from-purple-900/30 to-purple-800/20 
                     border border-purple-500/20 rounded-xl p-6 text-left transition-all duration-300
                     hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:border-purple-500/40"
            onClick={() => onSelect(category.id)}
          >
            <div className="flex items-start">
              <div className="p-3 rounded-full bg-purple-900/40 backdrop-blur-sm border border-purple-500/20 mr-4">
                {category.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                <p className="text-gray-300">{category.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}


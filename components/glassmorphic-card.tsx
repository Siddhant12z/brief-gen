import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GlassmorphicCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  cta: string
  gradient: string
  glow: "purple" | "fuchsia" | "pink"
}

export function GlassmorphicCard({ title, description, icon, href, cta, gradient, glow }: GlassmorphicCardProps) {
  const glowStyles = {
    purple: "group-hover:shadow-[0_0_25px_rgba(147,51,234,0.3)]",
    fuchsia: "group-hover:shadow-[0_0_25px_rgba(217,70,239,0.3)]",
    pink: "group-hover:shadow-[0_0_25px_rgba(236,72,153,0.3)]",
  }

  const buttonGradients = {
    purple: "bg-purple-600 hover:bg-purple-700",
    fuchsia: "bg-fuchsia-600 hover:bg-fuchsia-700",
    pink: "bg-pink-600 hover:bg-pink-700",
  }

  return (
    <div suppressHydrationWarning className={`group relative rounded-2xl transition-all duration-500 ${glowStyles[glow]}`}>
      {/* Glassmorphic card */}
      <div
        suppressHydrationWarning
        className={`h-full backdrop-blur-xl bg-gradient-to-br ${gradient} 
                   border border-purple-500/20 rounded-2xl p-6 flex flex-col
                   shadow-lg transition-all duration-500`}
      >
        <div suppressHydrationWarning className="flex items-center mb-4">
          <div suppressHydrationWarning className="p-3 rounded-full bg-purple-900/40 backdrop-blur-sm border border-purple-500/20 mr-4">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>

        <p className="text-gray-300 mb-8 flex-grow">{description}</p>

        <Link href={href} className="mt-auto">
          <Button
            className={cn("w-full border-0 text-white shadow-md transition-all duration-300", buttonGradients[glow])}
          >
            <span>{cta}</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}


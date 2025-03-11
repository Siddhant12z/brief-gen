import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { FileText, MessageSquare, Palette } from "lucide-react"

export default function Home() {
  const cards = [
    {
      title: "Curated Briefs",
      description: "Explore our collection of hand-picked design briefs to inspire your next project.",
      icon: <FileText className="w-10 h-10 text-purple-300" />,
      href: "/briefs",
      cta: "Browse Briefs",
      gradient: "from-purple-900/30 to-purple-800/20",
      glow: "purple" as const,
    },
    {
      title: "Chat with briefAI",
      description: "Get personalized design briefs and feedback from our AI assistant.",
      icon: <MessageSquare className="w-10 h-10 text-purple-300" />,
      href: "/chat",
      cta: "Start Chatting",
      gradient: "from-purple-800/30 to-purple-900/20",
      glow: "purple" as const,
    },
    {
      title: "Quick Design Practice",
      description: "Sharpen your skills with quick design exercises and challenges.",
      icon: <Palette className="w-10 h-10 text-purple-300" />,
      href: "/practice",
      cta: "Start Practicing",
      gradient: "from-purple-900/30 to-purple-800/20",
      glow: "purple" as const,
    }
  ]

  return (
    <div className="dark" suppressHydrationWarning>
      <main className="min-h-screen bg-black bg-gradient-to-br from-black via-purple-950/10 to-black p-4 md:p-8 relative overflow-hidden">
        {/* Subtle ambient glow effects */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] opacity-60" suppressHydrationWarning></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] opacity-50" suppressHydrationWarning></div>

        <div className="max-w-7xl mx-auto relative z-10" suppressHydrationWarning>
          <div className="text-center mb-16" suppressHydrationWarning>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Design{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300">
                Resources
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our tools to enhance your design skills and get inspired for your next project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" suppressHydrationWarning>
            {cards.map((card, index) => (
              <GlassmorphicCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                href={card.href}
                cta={card.cta}
                gradient={card.gradient}
                glow={card.glow}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}


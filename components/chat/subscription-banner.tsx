import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function SubscriptionBanner() {
  return (
    <div className="mb-4 backdrop-blur-xl bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 border border-purple-500/30 rounded-lg p-4 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-500/20 p-2 rounded-full">
            <Sparkles className="h-6 w-6 text-purple-300" />
          </div>
          <div>
            <h3 className="font-bold text-white">Upgrade to Pro</h3>
            <p className="text-gray-300 text-sm">Get unlimited briefs and design feedback</p>
          </div>
        </div>

        <Button className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white border-0">
          Subscribe Now
        </Button>
      </div>
    </div>
  )
}


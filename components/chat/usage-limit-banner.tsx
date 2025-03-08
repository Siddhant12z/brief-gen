interface UsageLimitBannerProps {
  usageCount: number
  usageLimit: number
  isSubscribed: boolean
}

export function UsageLimitBanner({ usageCount, usageLimit, isSubscribed }: UsageLimitBannerProps) {
  if (isSubscribed) return null

  return (
    <div className="mb-4 backdrop-blur-md bg-purple-900/20 border border-purple-500/20 rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-white text-sm">
          Daily usage: {usageCount}/{usageLimit} {usageCount === 1 ? "request" : "requests"}
        </span>
      </div>

      <div className="bg-gray-800 h-2 rounded-full w-32 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-400 to-fuchsia-500 h-full rounded-full"
          style={{ width: `${(usageCount / usageLimit) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}


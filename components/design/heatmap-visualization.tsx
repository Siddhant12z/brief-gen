import { useState, useEffect } from 'react'
import Image from 'next/image'
import { HeatmapResult } from '@/lib/heatmap-generator'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface HeatmapVisualizationProps {
  originalImage: string
  isGenerating: boolean
  heatmapResult?: HeatmapResult
  onRetry?: () => void
}

export function HeatmapVisualization({
  originalImage,
  isGenerating,
  heatmapResult,
  onRetry
}: HeatmapVisualizationProps) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get image dimensions
    const img = new window.Image()
    img.src = originalImage
    img.onload = () => {
      // Calculate responsive dimensions (max width 800px)
      const maxWidth = 800
      const scale = Math.min(1, maxWidth / img.width)
      setImageSize({
        width: Math.floor(img.width * scale),
        height: Math.floor(img.height * scale)
      })
    }
    img.onerror = () => setError('Failed to load image')
  }, [originalImage])

  if (error || heatmapResult?.error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>
          {error || heatmapResult?.error}
          {onRetry && (
            <button
              onClick={onRetry}
              className="ml-4 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Original Design</h3>
          <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
            {imageSize.width > 0 ? (
              <Image
                src={originalImage}
                alt="Original design"
                width={imageSize.width}
                height={imageSize.height}
                className="w-full h-auto"
              />
            ) : (
              <Skeleton className="w-full aspect-video" />
            )}
          </div>
        </div>

        {/* Heatmap */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Attention Heatmap</h3>
          <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
            {isGenerating ? (
              <div className="w-full aspect-video animate-pulse bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Generating heatmap...
                </div>
              </div>
            ) : heatmapResult?.heatmapUrl ? (
              <Image
                src={heatmapResult.heatmapUrl}
                alt="Design heatmap"
                width={imageSize.width}
                height={imageSize.height}
                className="w-full h-auto"
              />
            ) : (
              <Skeleton className="w-full aspect-video" />
            )}
          </div>
        </div>
      </div>

      {/* Attention Points */}
      {heatmapResult?.attentionPoints && heatmapResult.attentionPoints.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Key Attention Areas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {heatmapResult.attentionPoints.map((point, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Area {index + 1}
                </div>
                <div className="mt-1 font-medium">
                  Position: ({point.x}, {point.y})
                </div>
                <div className="text-sm text-gray-500">
                  Attention Score: {(point.weight * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 
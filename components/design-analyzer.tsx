"use client"

import { useState, useRef } from "react"
import { Upload, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeatmapGenerator } from "@/lib/heatmap-generator"

interface DesignAnalyzerProps {
  onAnalysisComplete: (result: {
    originalUrl: string;
    heatmapUrl: string;
    analysis: {
      imageSize: { width: number; height: number };
      attentionPoints: Array<{x: number; y: number; weight: number}>;
      dominantAreas: string[];
      visualFlow: string;
    }
  }) => void;
}

// Helper functions for analysis
const calculateDominantAreas = (attentionPoints: Array<{x: number; y: number; weight: number}>) => {
  return attentionPoints.map((point, index) => {
    const position = point.y < 300 ? 'top' : point.y > 600 ? 'bottom' : 'middle'
    const horizontalPos = point.x < 300 ? 'left' : point.x > 600 ? 'right' : 'center'
    return `Area ${index + 1}: ${position} ${horizontalPos} (weight: ${(point.weight * 100).toFixed(1)}%)`
  })
}

const analyzeVisualFlow = (attentionPoints: Array<{x: number; y: number; weight: number}>) => {
  const sortedPoints = [...attentionPoints].sort((a, b) => b.weight - a.weight)
  
  // Analyze the pattern
  const isVertical = sortedPoints.every((point, i, arr) => {
    if (i === 0) return true
    return Math.abs(point.y - arr[i-1].y) > Math.abs(point.x - arr[i-1].x)
  })
  
  const isHorizontal = sortedPoints.every((point, i, arr) => {
    if (i === 0) return true
    return Math.abs(point.x - arr[i-1].x) > Math.abs(point.y - arr[i-1].y)
  })
  
  const isZPattern = sortedPoints.every((point, i, arr) => {
    if (i === 0) return true
    if (i === 1) return point.y > arr[i-1].y
    if (i === 2) return point.x < arr[i-1].x
    return point.y > arr[i-1].y
  })
  
  if (isZPattern) return 'Z-pattern flow from top-left to bottom-right'
  if (isVertical) return 'Vertical flow pattern'
  if (isHorizontal) return 'Horizontal flow pattern'
  return 'Mixed flow pattern with multiple focus points'
}

export function DesignAnalyzer({ onAnalysisComplete }: DesignAnalyzerProps) {
  const [stage, setStage] = useState<'upload' | 'analyzing' | 'results'>('upload')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [heatmapImage, setHeatmapImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAnalyzing(true)
    try {
      const file = e.target.files?.[0]
      if (file) {
        const originalUrl = URL.createObjectURL(file)
        const img = new window.Image()
        img.src = originalUrl
        
        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
        })

        const generator = new HeatmapGenerator()
        await generator.initialize()
        const result = await generator.generateHeatmap(img)

        const attentionPoints = result.attentionPoints
        onAnalysisComplete({
          originalUrl,
          heatmapUrl: result.heatmapUrl,
          analysis: {
            imageSize: { width: img.width, height: img.height },
            attentionPoints,
            dominantAreas: calculateDominantAreas(attentionPoints),
            visualFlow: analyzeVisualFlow(attentionPoints)
          }
        })
      }
    } catch (error) {
      console.error('Error analyzing design:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload UI */}
      {stage === 'upload' && (
        <label className="flex flex-col items-center justify-center h-48 rounded-lg border-2 border-dashed border-purple-500/20 cursor-pointer hover:bg-purple-950/20 transition-colors">
          <Upload className="h-8 w-8 text-purple-400 mb-2" />
          <p className="text-purple-300">Upload your design for analysis</p>
          <input
            type="file"
            id="design-upload"
            data-testid="design-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      )}

      {/* Analysis Results */}
      {stage === 'results' && (
        <div className="grid grid-cols-2 gap-4">
          {/* Original Image */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-purple-300">Original Design</h3>
            <div className="relative rounded-lg overflow-hidden">
              <img src={originalImage!} alt="Original design" className="w-full" />
            </div>
          </div>

          {/* Heatmap Overlay */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-purple-300">Attention Heatmap</h3>
            <div className="relative rounded-lg overflow-hidden">
              <img src={heatmapImage!} alt="Attention heatmap" className="w-full" />
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <div className="h-48 flex items-center justify-center">
          <div className="text-center space-y-2">
            <p>Analyzing design patterns...</p>
          </div>
        </div>
      )}
    </div>
  )
} 
import * as tf from '@tensorflow/tfjs'
import { loadGraphModel } from '@tensorflow/tfjs-converter'
import h337 from 'heatmap.js-fixed'

export interface HeatmapResult {
  heatmapUrl: string
  attentionPoints: Array<{x: number, y: number, weight: number}>
  error?: string
}

export class HeatmapGenerator {
  private model: tf.GraphModel | tf.LayersModel | null = null
  private isInitializing: boolean = false
  private modelPath: string = '/models/saliency/model.json'
  private fallbackThreshold: number = 0.5

  constructor(modelPath?: string) {
    if (modelPath) {
      this.modelPath = modelPath
    }
  }

  async initialize(): Promise<void> {
    if (this.model) return
    if (this.isInitializing) {
      await this.waitForInitialization()
      return
    }

    try {
      this.isInitializing = true
      // First try loading custom saliency model
      try {
        this.model = await tf.loadGraphModel(this.modelPath)
      } catch (e) {
        console.warn('Failed to load custom model, falling back to MobileNet:', e)
        // Fallback to MobileNet for basic feature detection
        this.model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json')
      }
    } catch (error) {
      console.error('Failed to initialize model:', error)
      throw new Error('Failed to initialize heatmap model')
    } finally {
      this.isInitializing = false
    }
  }

  private async waitForInitialization(): Promise<void> {
    while (this.isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  async generateHeatmap(imageElement: HTMLImageElement): Promise<HeatmapResult> {
    if (!this.model) {
      try {
        await this.initialize()
      } catch (error) {
        return {
          heatmapUrl: '',
          attentionPoints: [],
          error: 'Failed to initialize model'
        }
      }
    }

    let tensor: tf.Tensor3D | null = null
    let processed: tf.Tensor | null = null
    let prediction: tf.Tensor | null = null

    try {
      // Process image
      tensor = tf.browser.fromPixels(imageElement)
      processed = tf.tidy(() => {
        // Resize image to model input size
        const resized = tf.image.resizeBilinear(tensor!, [224, 224])
        // Normalize pixel values
        return resized.toFloat().div(255.0).expandDims(0)
      })

      // Generate prediction
      prediction = await this.model!.predict(processed) as tf.Tensor
      const heatmapData = await prediction.data()

      // Create container for heatmap
      const container = document.createElement('div')
      container.style.width = imageElement.width + 'px'
      container.style.height = imageElement.height + 'px'
      container.style.position = 'relative'
      document.body.appendChild(container)

      // Create heatmap instance
      const heatmapInstance = h337.create({
        container,
        radius: 30,
        maxOpacity: 0.6,
        minOpacity: 0,
        blur: 0.8,
      })

      // Convert prediction data to heatmap points
      const points: Array<{x: number, y: number, value: number}> = []
      const width = imageElement.width
      const height = imageElement.height
      const scaleX = width / 224
      const scaleY = height / 224

      for (let y = 0; y < 224; y++) {
        for (let x = 0; x < 224; x++) {
          const value = heatmapData[y * 224 + x]
          if (value > this.fallbackThreshold) {
            points.push({
              x: Math.floor(x * scaleX),
              y: Math.floor(y * scaleY),
              value
            })
          }
        }
      }

      // Set heatmap data
      heatmapInstance.setData({
        max: 1,
        data: points
      })

      // Get heatmap URL
      const heatmapUrl = container.querySelector('canvas')?.toDataURL() || ''

      // Clean up
      document.body.removeChild(container)

      // Find attention points
      const attentionPoints = this.findAttentionPoints(points)

      return {
        heatmapUrl,
        attentionPoints
      }

    } catch (error) {
      console.error('Error generating heatmap:', error)
      return {
        heatmapUrl: '',
        attentionPoints: [],
        error: 'Failed to generate heatmap'
      }
    } finally {
      // Cleanup tensors
      if (tensor) tensor.dispose()
      if (processed) processed.dispose()
      if (prediction) prediction.dispose()
    }
  }

  private findAttentionPoints(points: Array<{x: number, y: number, value: number}>) {
    // Sort points by value and take top 5
    return points
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map(point => ({
        x: point.x,
        y: point.y,
        weight: Number(point.value.toFixed(3))
      }))
  }
} 
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import { DesignAnalyzer } from '@/components/design-analyzer'
import { HeatmapGenerator } from '@/lib/heatmap-generator'

// Mock HeatmapGenerator
jest.mock('@/lib/heatmap-generator', () => {
  return {
    HeatmapGenerator: jest.fn().mockImplementation(() => ({
      initialize: jest.fn().mockResolvedValue(undefined),
      generateHeatmap: jest.fn().mockResolvedValue({
        heatmapUrl: 'mock-heatmap.jpg',
        attentionPoints: [
          { x: 100, y: 100, weight: 0.5 },
          { x: 200, y: 200, weight: 0.3 }
        ]
      })
    }))
  }
})

describe('DesignAnalyzer Component', () => {
  it('handles image upload and triggers analysis', async () => {
    const mockOnAnalysisComplete = jest.fn()
    render(<DesignAnalyzer onAnalysisComplete={mockOnAnalysisComplete} />)

    const fileInput = screen.getByTestId('design-upload')
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    fireEvent.change(fileInput, { target: { files: [file] } })

    // Wait for loading state to appear
    await waitFor(() => {
      expect(screen.queryByText('Analyzing design patterns...')).not.toBeNull()
    })

    // Wait for analysis to complete
    await waitFor(() => {
      expect(mockOnAnalysisComplete).toHaveBeenCalledWith(
        expect.objectContaining({
          originalUrl: expect.any(String),
          heatmapUrl: 'mock-heatmap.jpg',
          analysis: expect.objectContaining({
            imageSize: expect.any(Object),
            attentionPoints: expect.any(Array),
            dominantAreas: expect.any(Array),
            visualFlow: expect.any(String)
          })
        })
      )
    })
  })

  it('handles large images', async () => {
    const mockOnAnalysisComplete = jest.fn()
    render(<DesignAnalyzer onAnalysisComplete={mockOnAnalysisComplete} />)

    const fileInput = screen.getByTestId('design-upload')
    const largeFile = new File(['test'.repeat(1000000)], 'large.png', { type: 'image/png' })
    fireEvent.change(fileInput, { target: { files: [largeFile] } })

    await waitFor(() => {
      expect(mockOnAnalysisComplete).toHaveBeenCalled()
    })
  })
}) 
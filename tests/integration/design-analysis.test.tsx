import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { DesignAnalyzer } from '@/components/design-analyzer'
import { describe, it, expect } from '@jest/globals'

describe('Design Analysis Integration', () => {
  it('handles file upload and analysis', async () => {
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
      expect(screen.queryByText(/Analysis complete/i)).not.toBeNull()
    })

    expect(mockOnAnalysisComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        originalUrl: expect.any(String),
        heatmapUrl: expect.any(String),
        analysis: expect.objectContaining({
          imageSize: expect.any(Object),
          attentionPoints: expect.any(Array),
          dominantAreas: expect.any(Array),
          visualFlow: expect.any(String)
        })
      })
    )
  })

  it('handles large images', async () => {
    const mockOnAnalysisComplete = jest.fn()
    render(<DesignAnalyzer onAnalysisComplete={mockOnAnalysisComplete} />)

    const fileInput = screen.getByTestId('design-upload')
    const largeFile = new File(['test'.repeat(1000000)], 'large.png', { type: 'image/png' })
    fireEvent.change(fileInput, { target: { files: [largeFile] } })

    await waitFor(() => {
      expect(screen.queryByText(/Processing large image/i)).not.toBeNull()
    })
  })
}) 
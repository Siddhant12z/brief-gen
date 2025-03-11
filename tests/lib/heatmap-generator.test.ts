import { HeatmapGenerator } from '../../lib/heatmap-generator'
import { jest } from '@jest/globals'

// Create a more robust mock implementation of TensorFlow.js
const mockTensor = {
  dispose: jest.fn(),
  toFloat: jest.fn(function() { return mockTensor }),
  div: jest.fn(function() { return mockTensor }),
  expandDims: jest.fn(function() { return mockTensor }),
  data: jest.fn(() => Promise.resolve(new Float32Array(224 * 224).fill(0.6))),
  dataSync: jest.fn(() => new Float32Array(224 * 224).fill(0.6)),
  shape: [224, 224, 3],
  dtype: 'float32',
  id: 1,
  rank: 3,
  size: 224 * 224 * 3
};

// Mock TensorFlow.js
jest.mock('@tensorflow/tfjs', () => {
  return {
    browser: {
      fromPixels: jest.fn().mockReturnValue(mockTensor)
    },
    tidy: jest.fn((fn: any) => fn()),
    image: {
      resizeBilinear: jest.fn().mockReturnValue(mockTensor)
    },
    loadGraphModel: jest.fn().mockImplementation(() => Promise.resolve({
      predict: jest.fn().mockReturnValue({
        data: jest.fn(() => Promise.resolve(new Float32Array(224 * 224).fill(0.6))),
        dispose: jest.fn()
      })
    })),
    loadLayersModel: jest.fn().mockImplementation(() => Promise.resolve({
      predict: jest.fn().mockReturnValue({
        data: jest.fn(() => Promise.resolve(new Float32Array(224 * 224).fill(0.6))),
        dispose: jest.fn()
      })
    }))
  };
});

// Mock TensorFlow.js converter
jest.mock('@tensorflow/tfjs-converter', () => ({
  loadGraphModel: jest.fn().mockImplementation(() => Promise.resolve({
    predict: jest.fn().mockReturnValue({
      data: jest.fn(() => Promise.resolve(new Float32Array(224 * 224).fill(0.6))),
      dispose: jest.fn()
    })
  }))
}));

// Mock heatmap.js-fixed
jest.mock('heatmap.js-fixed', () => ({
  create: jest.fn(() => ({
    setData: jest.fn(),
    getDataURL: jest.fn(() => 'mock-heatmap-url')
  }))
}))

describe('HeatmapGenerator', () => {
  let generator: HeatmapGenerator
  let mockCanvas: HTMLCanvasElement
  let mockContainer: HTMLDivElement

  beforeEach(() => {
    // Mock canvas
    mockCanvas = {
      width: 100,
      height: 100,
      toDataURL: jest.fn(() => 'data:image/png;base64,mockImageData'),
      getContext: jest.fn(() => ({
        drawImage: jest.fn(),
        getImageData: jest.fn(() => ({
          data: new Uint8ClampedArray(100 * 100 * 4).fill(128)
        }))
      }))
    } as unknown as HTMLCanvasElement

    // Mock container
    mockContainer = {
      style: {
        width: '800px',
        height: '600px'
      },
      appendChild: jest.fn()
    } as unknown as HTMLDivElement

    // Mock document functions
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'canvas') {
        return mockCanvas
      }
      if (tag === 'div') {
        return mockContainer
      }
      return document.createElement(tag)
    }) 

    // Simple mock for document.body.appendChild
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => document.body)

    generator = new HeatmapGenerator()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('generates heatmap from image', async () => {
    const mockImage = {
      width: 800,
      height: 600,
      naturalWidth: 800,
      naturalHeight: 600
    } as unknown as HTMLImageElement

    // Force the test to use mocked data
    await generator.initialize();

    const result = await generator.generateHeatmap(mockImage)

    expect(result).toEqual({
      heatmapUrl: expect.any(String),
      attentionPoints: expect.arrayContaining([
        expect.objectContaining({
          x: expect.any(Number),
          y: expect.any(Number),
          weight: expect.any(Number)
        })
      ])
    })
  })
}) 
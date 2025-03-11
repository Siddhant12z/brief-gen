import '@testing-library/jest-dom'

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn()

// Mock URL.createObjectURL globally
const mockObjectUrl = 'blob:mock-url'
global.URL.createObjectURL = jest.fn(() => mockObjectUrl)
global.URL.revokeObjectURL = jest.fn()

// Mock canvas methods
const mockContext = {
  canvas: document.createElement('canvas'),
  getContextAttributes: jest.fn(),
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  drawImage: jest.fn(),
  getImageData: jest.fn(() => ({
    data: new Uint8ClampedArray(100),
    width: 100,
    height: 100
  })),
  putImageData: jest.fn(),
  createImageData: jest.fn(),
  scale: jest.fn(),
  translate: jest.fn(),
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  setTransform: jest.fn(),
  save: jest.fn(),
  restore: jest.fn()
} as unknown as CanvasRenderingContext2D

const getContextMock = jest.fn((contextId: string) => {
  if (contextId === '2d') return mockContext
  return null
})

HTMLCanvasElement.prototype.getContext = getContextMock as unknown as HTMLCanvasElement['getContext']

// Mock Image
class MockImage {
  onload: () => void = () => {}
  onerror: () => void = () => {}
  src: string = ''
  width: number = 100
  height: number = 100
}

global.Image = MockImage as any

// Mock canvas and context
const mockCanvas = {
  getContext: jest.fn(() => mockContext),
  toDataURL: jest.fn(() => 'mock-data-url'),
}

// Mock document.createElement
const originalCreateElement = document.createElement.bind(document)
document.createElement = (tagName: string) => {
  if (tagName === 'canvas') {
    return mockCanvas as unknown as HTMLCanvasElement
  }
  return originalCreateElement(tagName)
} 
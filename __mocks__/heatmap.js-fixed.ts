const mockHeatmap = {
  setData: jest.fn(),
  addData: jest.fn(),
  getDataURL: jest.fn(() => 'mock-heatmap-url'),
  repaint: jest.fn(),
}

const h337 = {
  create: jest.fn(() => mockHeatmap),
}

export default h337 
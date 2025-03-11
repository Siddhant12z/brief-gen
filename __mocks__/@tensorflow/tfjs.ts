interface MockTensor {
  dispose: () => void;
  toFloat: () => MockTensor;
  div: (value: number) => MockTensor;
  expandDims: () => MockTensor;
  reshape: (shape: number[]) => MockTensor;
  dataSync: () => number[];
}

interface MockModel {
  predict: (input: MockTensor) => MockTensor;
}

const mockTensor: MockTensor = {
  dispose: jest.fn().mockReturnThis(),
  toFloat: jest.fn().mockReturnThis(),
  div: jest.fn().mockReturnThis(),
  expandDims: jest.fn().mockReturnThis(),
  reshape: jest.fn().mockReturnThis(),
  dataSync: jest.fn().mockReturnValue([0.5, 0.3, 0.2])
};

const mockModel: MockModel = {
  predict: jest.fn().mockReturnValue(mockTensor)
};

const tf = {
  loadGraphModel: jest.fn().mockResolvedValue(mockModel),
  loadLayersModel: jest.fn().mockResolvedValue(mockModel),
  browser: {
    fromPixels: jest.fn().mockReturnValue(mockTensor)
  },
  image: {
    resizeBilinear: jest.fn().mockReturnValue(mockTensor)
  },
  tidy: jest.fn().mockImplementation(<T>(fn: () => T): T => fn())
};

export default tf;
export const loadGraphModel = tf.loadGraphModel; 
declare module 'heatmap.js-fixed' {
  interface HeatmapConfiguration {
    container: HTMLElement;
    radius?: number;
    maxOpacity?: number;
    minOpacity?: number;
    blur?: number;
    gradient?: { [key: string]: string };
  }

  interface HeatmapData {
    max: number;
    data: Array<{
      x: number;
      y: number;
      value: number;
    }>;
  }

  interface Heatmap {
    setData(data: HeatmapData): void;
    addData(data: Array<{ x: number; y: number; value: number }>): void;
    getDataURL(): string;
    repaint(): void;
  }

  interface HeatmapConstructor {
    create(config: HeatmapConfiguration): Heatmap;
  }

  const h337: HeatmapConstructor;
  export default h337;
} 
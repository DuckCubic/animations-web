export interface Point {
  x: number;
  y: number;
}

export interface Cell {
  id: number;
  vertices: Point[];
  centroid: Point;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;

  //Optimizacion de renderizado
  preRenderCanvas: HTMLCanvasElement;
  bounds?: { minX: number; minY: number; width: number; height: number };
}

export interface StainGlassNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

export interface CardData {
  id: number;
  name: string;
  imgUrl: string;

  //Ajustes para voronoi animation
  density: number;
  shatterForce: number;
  size?: 'normal' | 'large';

  type?: 'image' | 'stained-glass';
  speed?: number;
  palette?: string[];
}

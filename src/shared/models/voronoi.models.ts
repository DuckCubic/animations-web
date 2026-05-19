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
}

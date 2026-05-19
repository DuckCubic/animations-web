import { Injectable } from '@angular/core';
import { Point } from '../models/voronoi.models';

@Injectable({
  providedIn: 'root',
})
export class VoronoiPhysicsService {
  calculateCentroids(vertices: Point[]): Point {
    let area = 0;
    let cx = 0;
    let cy = 0;

    for (let i = 0; i < vertices.length; i++) {
      const j = (i + 1) % vertices.length;
      const x0 = vertices[i].x;
      const y0 = vertices[i].y;
      const x1 = vertices[j].x;
      const y1 = vertices[j].y;

      const factor = x0 * y1 - x1 * y0;
      area += factor;
      cx += (x0 + x1) * factor;
      cy += (y0 + y1) * factor;
    }
    if (area === 0) return { x: vertices[0].x, y: vertices[0].y };

    return { x: cx / (3 * area), y: cy / (3 * area) };
  }
}

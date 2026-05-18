import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-voronoi-canvas',
  standalone: true,
  imports: [],
  templateUrl: './voronoi-canvas.component.html',
  styleUrl: './voronoi-canvas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoronoiCanvasComponent {}

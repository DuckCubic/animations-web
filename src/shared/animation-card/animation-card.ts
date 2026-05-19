import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VoronoiCanvasComponent } from '../voronoi-canvas/voronoi-canvas.component';

@Component({
  selector: 'app-animation-card',
  imports: [VoronoiCanvasComponent],
  templateUrl: './animation-card.html',
  styleUrl: './animation-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimationCard {}

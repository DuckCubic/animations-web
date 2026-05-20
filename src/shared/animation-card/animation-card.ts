import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VoronoiCanvasComponent } from '../voronoi-canvas/voronoi-canvas.component';
import { required } from '@angular/forms/signals';
import { CardData } from '../models/voronoi.models';

@Component({
  selector: 'app-animation-card',
  imports: [VoronoiCanvasComponent],
  templateUrl: './animation-card.html',
  styleUrl: './animation-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimationCard {
  @Input({ required: true }) data!: CardData;
}

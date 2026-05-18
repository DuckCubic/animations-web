import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-animation-card',
  imports: [],
  templateUrl: './animation-card.html',
  styleUrl: './animation-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimationCard {}

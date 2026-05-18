import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimationCard } from "../../shared/animation-card/animation-card";

@Component({
  selector: 'app-animation-component',
  imports: [AnimationCard],
  templateUrl: './animation-component.html',
  styleUrl: './animation-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimationComponent {
  items = Array(10).fill(0)
}

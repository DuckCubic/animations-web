import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StainedGlass } from '../../shared/stained-glass/stained-glass';

@Component({
  selector: 'app-home-component',
  imports: [StainedGlass],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}

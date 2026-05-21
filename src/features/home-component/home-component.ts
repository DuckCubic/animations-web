import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StainedGlass } from '../../shared/stained-glass/stained-glass';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [StainedGlass],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private routes: Router) {}

  navigateToAnimations() {
    this.routes.navigate(['/animations']);
  }
}

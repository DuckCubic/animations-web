import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('../features/home-component/home-component').then((m) => m.HomeComponent),
  },
  {
    path: 'animations',
    loadComponent: () =>
      import('../features/animation-component/animation-component').then(
        (m) => m.AnimationComponent,
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

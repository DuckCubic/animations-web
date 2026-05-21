import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimationCard } from '../../shared/animation-card/animation-card';
import { CardData } from '../../shared/models/voronoi.models';
import { StainedGlass } from '../../shared/stained-glass/stained-glass';

@Component({
  selector: 'app-animation-component',
  imports: [AnimationCard, StainedGlass],
  templateUrl: './animation-component.html',
  styleUrl: './animation-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimationComponent {
  items: CardData[] = [
    {
      id: 1,
      name: 'Botella Cristal',
      imgUrl:
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=500&auto=format&fit=crop',
      density: 100,
      shatterForce: 20,
      size: 'large',
    },
    {
      id: 2,
      name: 'Perfume Elegante',
      imgUrl:
        'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=500&auto=format&fit=crop',
      density: 50,
      shatterForce: 5,
    },
    {
      id: 3,
      name: 'STONE MONUMENT',
      imgUrl: 'https://images.pexels.com/photos/19045533/pexels-photo-19045533.jpeg',
      density: 1000,
      shatterForce: 10,
    },
    {
      id: 4,
      name: 'Taza de Café',
      imgUrl:
        'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=500&auto=format&fit=crop',
      density: 120,
      shatterForce: 5,
    },
    {
      id: 5,
      name: 'Cristal Térmico',
      imgUrl: '',
      density: 15,
      shatterForce: 0,
      type: 'stained-glass',
      speed: 15,
      palette: ['#4a154b', '#e01e5a', '#fecb2e', '#36c5f0'],
    },
    {
      id: 6,
      name: 'Cristal Térmico',
      imgUrl: '',
      density: 100,
      shatterForce: 0,
      type: 'stained-glass',
      speed: 2,
      palette: ['#696FC7', '#A7AAE1', '#F5D3C4', '#F2AEBB'],
    },
  ];
}

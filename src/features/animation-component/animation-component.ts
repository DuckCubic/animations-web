import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimationCard } from '../../shared/animation-card/animation-card';
import { CardData } from '../../shared/models/voronoi.models';

@Component({
  selector: 'app-animation-component',
  imports: [AnimationCard],
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
      name: 'Jarrón Minimalista',
      imgUrl:
        'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=500&auto=format&fit=crop',
      density: 150,
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
  ];
}

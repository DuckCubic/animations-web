import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  Input,
} from '@angular/core';
import { Delaunay } from 'd3';
import { StainGlassNode } from '../models/voronoi.models';

@Component({
  selector: 'app-stained-glass',
  imports: [],
  templateUrl: './stained-glass.html',
  styleUrl: './stained-glass.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StainedGlass implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  // --- Parámetros Personalizables ---
  @Input() density: number = 25;
  @Input() speed: number = 1.5;
  @Input() palette: string[] = ['#0a0510', '#130a1f', '#220f3a', '#34155b', '#481982'];

  private ctx!: CanvasRenderingContext2D | null;

  private width = 0;
  private height = 0;

  private nodes: StainGlassNode[] = [];
  private animationFrameId: number = 0;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');

    const resizeObserver = new ResizeObserver(() => this.resizeCanvas());

    resizeObserver.observe(canvas.parentElement || document.body);

    this.initNodes();
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }
  animate() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    //TODO: Implementar la animacion
    const points: [number, number][] = [];
    for (const node of this.nodes) {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > this.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.height) node.vy *= -1;
      points.push([node.x, node.y]);
    }

    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, this.width, this.height]);

    for (let i = 0; i < this.nodes.length; i++) {
      const polygon = voronoi.cellPolygon(i);
      if (!polygon) continue;

      this.ctx.beginPath();
      this.ctx.moveTo(polygon[0][0], polygon[0][1]);

      for (let j = 1; j < polygon.length; j++) {
        this.ctx.lineTo(polygon[j][0], polygon[j][1]);
      }
      this.ctx.closePath();
      this.ctx.fillStyle = this.nodes[i].color;
      this.ctx.fill();
    }
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;

    this.width = parent ? parent.offsetWidth : window.innerWidth;
    this.height = parent ? parent.offsetHeight : window.innerHeight;

    canvas.width = this.width;
    canvas.height = this.height;
  }
  private initNodes(): void {
    this.nodes = [];

    for (let i = 0; i < this.density; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.speed,
        vy: (Math.random() - 0.5) * this.speed,
        color: this.palette[Math.floor(Math.random() * this.palette.length)],
      });
    }
  }
  ngOnDestroy(): void {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }
}

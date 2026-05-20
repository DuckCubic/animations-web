import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Cell, Point } from '../models/voronoi.models';
import { VoronoiPhysicsService } from '../services/voronoi-physics.service';
import { Delaunay } from 'd3';

@Component({
  selector: 'app-voronoi-canvas',
  standalone: true,
  imports: [],
  templateUrl: './voronoi-canvas.component.html',
  styleUrl: './voronoi-canvas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoronoiCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('voronoiCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() density: number = 20;
  @Input() shatterForce: number = 10;
  @Input() imagePath: string = 'assets/img/B01.png';

  private ctx!: CanvasRenderingContext2D | null;
  private animationFrameId?: number;
  private cells: Cell[] = [];

  public imagenElement!: HTMLImageElement;
  public imageLoaded: boolean = false;

  private mousePosition: Point | null = null;
  private width: number = 300;
  private height: number = 300;

  constructor(private physicsService: VoronoiPhysicsService) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');

    this.width = canvas.width || 300;
    this.height = canvas.height || 300;

    canvas.width = this.width;
    canvas.height = this.height;

    this.loading();
  }
  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
  private loading(): void {
    this.imagenElement = new Image();

    this.imagenElement.crossOrigin = 'Anonymous';

    this.imagenElement.src = this.imagePath;
    this.imagenElement.onload = () => {
      this.imageLoaded = true;
      this.initVoronoiGeometry();

      this.startAnimation();

      console.log('Imagen cargada correctamente');
    };
  }
  private initVoronoiGeometry(): void {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.width;
    tempCanvas.height = this.height;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) return;

    tempCtx.drawImage(this.imagenElement, 0, 0, this.width, this.height);
    const imgData = tempCtx.getImageData(0, 0, this.width, this.height);
    const pixels = imgData.data;
    const points: [number, number][] = [];

    while (points.length < this.density) {
      const rx = Math.random() * this.width;
      const ry = Math.random() * this.height;
      const pixelIndex = (Math.floor(ry) * this.width + Math.floor(rx)) * 4;
      const alpha = pixels[pixelIndex + 3];
      if (alpha > 50) {
        points.push([rx, ry]);
      }
    }
    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, this.width, this.height]);

    this.cells = [];

    for (let i = 0; i < this.density; i++) {
      const vertices = voronoi.cellPolygon(i);
      if (!vertices) continue;

      const mappedVertices: Point[] = vertices.map((v) => ({ x: v[0], y: v[1] }));
      const centroid = this.physicsService.calculateCentroids(mappedVertices);

      this.cells.push({
        id: i,
        vertices: mappedVertices,
        centroid: centroid,
        currentX: centroid.x,
        currentY: centroid.y,
        targetX: centroid.x,
        targetY: centroid.y,
        vx: 0,
        vy: 0,
      });
    }
  }
  private startAnimation(): void {
    const loop = () => {
      this.updatePhysics();
      this.draw();

      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }
  private updatePhysics(): void {
    const radius = 90;

    for (const cell of this.cells) {
      if (this.mousePosition) {
        const dx = cell.currentX - this.mousePosition.x;
        const dy = cell.currentY - this.mousePosition.y;
        const distance = Math.hypot(dx, dy);

        if (distance < radius) {
          const force = ((radius - distance) / radius) * this.shatterForce;

          cell.vx += (dx / distance) * force;
          cell.vy += (dy / distance) * force;
        }
      }
      const springTension = 0.05;
      cell.vx += (cell.targetX - cell.currentX) * springTension;
      cell.vy += (cell.targetY - cell.currentY) * springTension;

      cell.vx *= 0.8;
      cell.vy *= 0.8;

      cell.currentX += cell.vx;
      cell.currentY += cell.vy;
    }
  }
  private draw(): void {
    if (!this.ctx || !this.imageLoaded) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const cell of this.cells) {
      this.ctx.save();
      const offsetX = cell.currentX - cell.targetX;
      const offsetY = cell.currentY - cell.targetY;
      this.ctx.translate(offsetX, offsetY);

      this.ctx.beginPath();
      if (cell.vertices.length > 0) {
        this.ctx.moveTo(cell.vertices[0].x, cell.vertices[0].y);
        for (let j = 1; j < cell.vertices.length; j++) {
          this.ctx.lineTo(cell.vertices[j].x, cell.vertices[j].y);
        }
      }
      this.ctx.closePath();
      this.ctx.clip();
      this.ctx.drawImage(this.imagenElement, 0, 0, this.width, this.height);

      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
      this.ctx.restore();
    }
  }

  public tiggerImpact(mouseX: number, mouseY: number) {
    this.mousePosition = { x: mouseX, y: mouseY };
  }
  public triggerResetoration() {
    this.mousePosition = null;
  }
}

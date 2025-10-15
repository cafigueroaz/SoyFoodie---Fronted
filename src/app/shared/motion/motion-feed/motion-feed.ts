import {
  Component,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, scroll } from '@motionone/dom';

interface GalleryItem {
  id: number;
  src: string;
}

@Component({
  selector: 'app-scroll-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motion-feed.html',
  styleUrls: ['./motion-feed.scss'],
})
export class ScrollGalleryComponent implements AfterViewInit {
  // Lista de imágenes dinámicas
  gallery: GalleryItem[] = [
    { id: 1, src: '/photos/cityscape/1.jpg' },
    { id: 2, src: '/photos/cityscape/2.jpg' },
    { id: 3, src: '/photos/cityscape/3.jpg' },
    { id: 4, src: '/photos/cityscape/4.jpg' },
    { id: 5, src: '/photos/cityscape/5.jpg' },
  ];

  @ViewChildren('header') headers!: QueryList<ElementRef>;
  progress!: HTMLElement;

  ngAfterViewInit() {
    // Seleccionamos la barra de progreso
    this.progress = document.querySelector('.progress') as HTMLElement;

    if (this.progress) {
      scroll(animate(this.progress, { scaleX: [0, 1] }, { easing: 'linear' }));
    }

    // Animación de cada header
    this.headers.forEach((headerRef) => {
      const headerEl = headerRef.nativeElement as HTMLElement;
      scroll(animate(headerEl, { y: [-400, 400] }, { easing: 'linear' }), {
        target: headerEl,
      });
    });
  }
}

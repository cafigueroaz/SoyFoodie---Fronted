import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, scroll } from 'motion';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.scss'],
})
export class GalleryComponent implements AfterViewInit {
  // Rutas de tus imágenes
  images = [
    'photos/cityscape/1.jpg',
    'photos/cityscape/2.jpg',
    'photos/cityscape/3.jpg',
    'photos/cityscape/4.jpg',
  ];

  ngAfterViewInit(): void {
    const items = document.querySelectorAll('.img-container');
    const container = document.querySelector('.img-group-container');
    const group = document.querySelector('.img-group');
    const progress = document.querySelector('.progress');

    if (!container || !group || !progress) return;

    // Movimiento horizontal del grupo durante el scroll
    scroll(
      animate('.img-group', {
        transform: ['none', `translateX(-${(items.length - 1) * 100}vw)`],
      }),
      { target: container as Element }
    );

    // Barra de progreso
    scroll(animate('.progress', { scaleX: [0, 1] }), {
      target: container as Element,
    });
  }
}

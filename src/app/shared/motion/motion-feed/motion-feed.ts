import {
  Component,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, scroll } from '@motionone/dom';
import { NavbarComponent } from '../../components/navbar/navbar';

interface GalleryItem {
  id: number;
  src: string;
  username: string;
}

@Component({
  selector: 'app-scroll-gallery',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './motion-feed.html',
  styleUrls: ['./motion-feed.scss'],
})
export class ScrollGalleryComponent implements AfterViewInit {
  gallery: GalleryItem[] = [
    { id: 1, src: '/photos/cityscape/1.jpg', username: '@cristian' },
    { id: 2, src: '/photos/cityscape/2.jpg', username: '@maria' },
    { id: 3, src: '/photos/cityscape/3.jpg', username: '@juan' },
    { id: 4, src: '/photos/cityscape/4.jpg', username: '@laura' },
    { id: 5, src: '/photos/cityscape/5.jpg', username: '@alex' },
  ];

  // Selecciona todos los elementos del template que tengan #username
  @ViewChildren('username') usernames!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.usernames.forEach((userRef) => {
      const userEl = userRef.nativeElement as HTMLElement;

      scroll(
        animate(
          userEl,
          { y: [-400, 400] }, // movimiento vertical
          { easing: 'linear' }
        ),
        { target: userEl }
      );
    });
  }
}

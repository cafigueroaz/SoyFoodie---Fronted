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
  username: string;
}

@Component({
  selector: 'app-scroll-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motion-feed.html',
  styleUrls: ['./motion-feed.scss'],
})
export class ScrollGalleryComponent implements AfterViewInit {
  gallery: GalleryItem[] = [
    {
      id: 1,
      src: 'https://res.cloudinary.com/dupuzbtuc/video/upload/v1760667197/Video_Hero_3_cpiuis.mp4',
      username: '@cristian',
    },
    {
      id: 2,
      src: 'https://res.cloudinary.com/dupuzbtuc/video/upload/v1760667191/Video_Hero_1_o6sdll.mp4',
      username: '@maria',
    },
    {
      id: 3,
      src: 'https://res.cloudinary.com/dupuzbtuc/video/upload/v1760667179/Video_Hero_4_nsglzw.mp4',
      username: '@santiago',
    },
    {
      id: 4,
      src: 'https://res.cloudinary.com/dupuzbtuc/video/upload/v1760667179/Video_Hero_2_z5cytf.mp4',
      username: '@alejandro',
    },
  ];

  @ViewChildren('username') usernames!: QueryList<ElementRef>;
  @ViewChildren('videoEl') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  ngAfterViewInit() {
    // Animación de usernames
    this.usernames.forEach((userRef) => {
      const userEl = userRef.nativeElement as HTMLElement;
      scroll(animate(userEl, { y: [-400, 400] }, { easing: 'linear' }), {
        target: userEl,
      });
    });

    // Observer para controlar los videos
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            // Pausar todos los videos excepto el visible
            this.videos.forEach((v) => {
              if (v.nativeElement !== video) {
                v.nativeElement.pause();
              }
            });
            // Reproducir el actual
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    // Observar cada video
    this.videos.forEach((videoRef) => {
      observer.observe(videoRef.nativeElement);
    });
  }
}

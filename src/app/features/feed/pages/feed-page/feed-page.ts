import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar';
import { ScrollGalleryComponent } from '../../../../shared/motion/motion-feed/motion-feed';

@Component({
  selector: 'app-feed-page',
  imports: [NavbarComponent, ScrollGalleryComponent],
  templateUrl: './feed-page.html',
  styleUrl: './feed-page.scss',
})
export class FeedPage {}

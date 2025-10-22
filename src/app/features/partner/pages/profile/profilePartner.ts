import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPostsComponent } from '../../../../shared/motion/user-posts/user-posts';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar';

interface PostItem {
  id: number;
  type: 'video' | 'image';
  src: string;
  likes: number;
}

interface Tab {
  icon: string;
  posts: PostItem[];
}

@Component({
  selector: 'app-profile-restaurant',
  standalone: true,
  imports: [UserPostsComponent, NavbarComponent, CommonModule],
  templateUrl: './profilePartner.html',
  styleUrls: ['./profilePartner.scss'],
})
export class ProfilePartner {
  tags: string[] = ['Pet Friendly', 'Vegano', 'Económico'];
  infos: string[] = ['Dirección', 'Teléfono', 'Horario'];

  partnerTabs: Tab[] = [
    {
      icon: '/icons/grid.svg',
      posts: [
        {
          id: 1,
          type: 'image',
          src: 'https://res.cloudinary.com/dupuzbtuc/image/upload/v1760993140/daniele-colucci-kIZvTPUlMIY-unsplash_hfjnxh.jpg',
          likes: 24,
        },
        {
          id: 2,
          type: 'image',
          src: 'https://res.cloudinary.com/dupuzbtuc/image/upload/v1760993139/richard-tao-etc3j1nnTik-unsplash_ei28xd.jpg',
          likes: 12,
        },
        {
          id: 3,
          type: 'video',
          src: 'https://res.cloudinary.com/dupuzbtuc/video/upload/v1760667197/Video_Hero_3_cpiuis.mp4',
          likes: 32,
        },
      ],
    },
    {
      icon: '/icons/tag.svg',
      posts: [
        {
          id: 4,
          type: 'image',
          src: 'https://res.cloudinary.com/dupuzbtuc/image/upload/v1760993137/ariel-leek-WNoPS4nA1XY-unsplash_alljsh.jpg',
          likes: 50,
        },
        {
          id: 5,
          type: 'video',
          src: 'https://res.cloudinary.com/dupuzbtuc/video/upload/v1760667179/Video_Hero_4_nsglzw.mp4',
          likes: 18,
        },
        {
          id: 6,
          type: 'video',
          src: 'https://res.cloudinary.com/dupuzbtuc/video/upload/v1760667190/Video_Hero_5_gwetwq.mp4',
          likes: 41,
        },
      ],
    },
  ];
}

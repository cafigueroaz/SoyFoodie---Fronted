import { Component, OnInit, computed, inject } from '@angular/core';
import { AuthService } from '../../../../features/auth/services/auth';
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
  selector: 'app-profile',
  standalone: true,
  imports: [UserPostsComponent, NavbarComponent],
  templateUrl: './profileUser.html',
  styleUrl: './profileUser.scss',
})
export class ProfileUser implements OnInit {
  private auth = inject(AuthService);

  // Obtenemos el usuario como señal reactiva
  user = computed(() => this.auth.user());

  userTabs: Tab[] = [
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
      ],
    },
    {
      icon: '/icons/hearth.svg',
      posts: [
        {
          id: 3,
          type: 'image',
          src: 'https://res.cloudinary.com/dupuzbtuc/image/upload/v1760993137/ariel-leek-WNoPS4nA1XY-unsplash_alljsh.jpg',
          likes: 50,
        },
        {
          id: 4,
          type: 'video',
          src: 'https://res.cloudinary.com/dupuzbtuc/video/upload/v1760667197/Video_Hero_3_cpiuis.mp4',
          likes: 32,
        },
        {
          id: 5,
          type: 'video',
          src: 'https://res.cloudinary.com/dupuzbtuc/video/upload/v1760667190/Video_Hero_5_gwetwq.mp4',
          likes: 18,
        },
      ],
    },
    {
      icon: '/icons/arrow-path-rounded-square.svg',
      posts: [
        {
          id: 6,
          type: 'video',
          src: 'https://res.cloudinary.com/dupuzbtuc/video/upload/v1760667179/Video_Hero_4_nsglzw.mp4',
          likes: 5,
        },
      ],
    },
    {
      icon: '/icons/bookmark.svg',
      posts: [
        {
          id: 7,
          type: 'image',
          src: 'https://res.cloudinary.com/dupuzbtuc/image/upload/v1760993140/daniele-colucci-kIZvTPUlMIY-unsplash_hfjnxh.jpg',
          likes: 40,
        },
        {
          id: 8,
          type: 'video',
          src: 'https://res.cloudinary.com/dupuzbtuc/video/upload/v1760667197/Video_Hero_3_cpiuis.mp4',
          likes: 19,
        },
        {
          id: 9,
          type: 'image',
          src: 'https://res.cloudinary.com/dupuzbtuc/image/upload/v1760993139/richard-tao-etc3j1nnTik-unsplash_ei28xd.jpg',
          likes: 25,
        },
        {
          id: 10,
          type: 'image',
          src: 'https://res.cloudinary.com/dupuzbtuc/image/upload/v1760993137/ariel-leek-WNoPS4nA1XY-unsplash_alljsh.jpg',
          likes: 9,
        },
        {
          id: 11,
          type: 'video',
          src: 'https://res.cloudinary.com/dupuzbtuc/video/upload/v1760667190/Video_Hero_5_gwetwq.mp4',
          likes: 41,
        },
      ],
    },
  ];

  ngOnInit() {
    // Si el usuario no está en memoria, lo cargamos desde el backend
    if (!this.user()) {
      this.auth.fetchUser().subscribe({
        error: () => console.error('Error al obtener el usuario'),
      });
    }
  }
}

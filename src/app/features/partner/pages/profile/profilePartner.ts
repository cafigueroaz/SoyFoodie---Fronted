import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../features/auth/services/auth';
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
export class ProfilePartner implements OnInit {
  private auth = inject(AuthService);

  tags: string[] = ['Pet Friendly', 'Vegano', 'Económico'];

  // Usuario actual
  currentUser: any = null;

  // Getter dinámico de información
  get infos(): string[] {
    const u = this.currentUser;
    return [
      `Dirección: ${u?.address || 'No disponible'}`,
      `Teléfono: ${u?.phone || 'No disponible'}`,
      `Horario: ${u?.schedule || 'No disponible'}`,
    ];
  }

  user = this.auth.user; // si quieres mantener computed para otras cosas

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

  ngOnInit() {
    this.auth.user$.subscribe({
      next: (u) => (this.currentUser = u),
      error: () => console.error('Error al obtener el usuario'),
    });

    if (!this.auth.user()) {
      this.auth.fetchUser().subscribe({
        error: () => console.error('Error al obtener el usuario'),
      });
    }
  }
}

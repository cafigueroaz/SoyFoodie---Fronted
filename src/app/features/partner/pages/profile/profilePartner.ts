import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../features/auth/services/auth';
import { CommonModule } from '@angular/common';
import { UserPostsComponent } from '../../../../shared/motion/user-posts/user-posts';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar';
import { HttpClient } from '@angular/common/http';

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

interface BackendPost {
  _id: string;
  comment: string;
  rating: number;
  mediaUrls: string[];
  likes: string[];
  origin: 'self' | 'tagged';
  createdBy: string;
  nickname: string;
  partner?: string;
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
  private http = inject(HttpClient);

  tags: string[] = ['Pet Friendly', 'Vegano', 'Económico'];

  currentUser: any = null;
  user = this.auth.user; // computed signal

  partnerTabs: Tab[] = [
    { icon: '/icons/grid.svg', posts: [] },
    { icon: '/icons/tag.svg', posts: [] }, // Aquí se llenarán los posts “tagged”
  ];

  ngOnInit() {
    if (!this.user()) {
      this.auth.fetchUser().subscribe({
        next: () => this.loadUserPosts(),
        error: () => console.error('Error al obtener el usuario'),
      });
    } else {
      this.loadUserPosts();
    }
  }

  private loadUserPosts() {
    this.http
      .get<BackendPost[]>(`http://localhost:10000/users/post/me`)
      .subscribe({
        next: (posts) => {
          this.partnerTabs[0].posts = this.mapBackendPosts(posts);
        },
        error: (err) => console.error('Error al obtener posts', err),
      });
  }
  private mapBackendPosts(posts: BackendPost[]): PostItem[] {
    return posts
      .filter((p) => p.mediaUrls?.[0])
      .map((p, index) => ({
        id: index + 1,
        type: p.mediaUrls[0].endsWith('.mp4') ? 'video' : 'image',
        src: p.mediaUrls[0],
        likes: p.likes.length,
      }));
  }

  get infos(): string[] {
    const u = this.user();
    return [
      `Dirección: ${u?.address || 'No disponible'}`,
      `Teléfono: ${u?.phone || 'No disponible'}`,
      `Horario: ${u?.schedule || 'No disponible'}`,
    ];
  }
}

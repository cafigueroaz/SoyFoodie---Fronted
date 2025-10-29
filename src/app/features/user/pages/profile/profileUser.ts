import { Component, OnInit, computed, inject } from '@angular/core';
import { AuthService } from '../../../../features/auth/services/auth';
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
  selector: 'app-profile',
  standalone: true,
  imports: [UserPostsComponent, NavbarComponent],
  templateUrl: './profileUser.html',
  styleUrls: ['./profileUser.scss'],
})
export class ProfileUser implements OnInit {
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  user = computed(() => this.auth.user());

  userTabs: Tab[] = [
    { icon: '/icons/grid.svg', posts: [] },
    { icon: '/icons/hearth.svg', posts: [] },
    { icon: '/icons/arrow-path-rounded-square.svg', posts: [] },
    { icon: '/icons/bookmark.svg', posts: [] },
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
          this.userTabs[0].posts = this.mapBackendPosts(posts);
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
}

import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar';
import { PostService } from '../../services/post';

interface Post {
  partner: string;
  type: string;
  comment: string;
  rating: number | string;
  origin?: 'self' | 'tagged';
  mediaUrl?: string;
}

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './create.html',
  styleUrls: ['./create.scss'],
})
export class CreatePost {
  post: Post = {
    partner: '',
    type: 'reseña',
    comment: '',
    rating: 'Del 1 al 5',
    mediaUrl: '',
  };

  etiquetasInput = '';
  loading = false;

  constructor(
    private location: Location,
    private postService: PostService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.post.partner || !this.post.rating) {
      alert('Debes ingresar el restaurante y una calificación.');
      return;
    }

    this.loading = true;

    const postData = {
      ...this.post,
      mediaUrls: this.post.mediaUrl ? [this.post.mediaUrl] : [],
    };

    this.postService.createPost(postData).subscribe({
      next: (res) => {
        console.log('✅ Post creado correctamente:', res);
        alert('Publicación creada con éxito');
        this.loading = false;
        this.router.navigate(['/profile/user']);
      },
      error: (err) => {
        console.error('❌ Error al crear el post:', err);
        alert('Error al crear la publicación.');
        this.loading = false;
      },
    });
  }

  goBack() {
    this.location.back();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar';
import { Location } from '@angular/common';

interface Post {
  id?: string;
  usuarioId: string;
  restauranteId?: string;
  titulo: string;
  descripcion: string;
  fotos: string[];
  ubicacion?: string;
  etiquetas?: string[];
  calificacion: number;
  fechaPublicacion: Date;
  visibilidad: 'public' | 'private' | 'followers';
  likes?: string[];
  guardados?: string[];
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
    usuarioId: '',
    titulo: '',
    descripcion: '',
    fotos: [],
    ubicacion: '',
    etiquetas: [],
    calificacion: undefined!,
    fechaPublicacion: new Date(),
    visibilidad: 'public',
  };

  etiquetasInput = '';

  addEtiqueta() {
    if (this.etiquetasInput.trim()) {
      this.post.etiquetas!.push(this.etiquetasInput.trim());
      this.etiquetasInput = '';
    }
  }

  removeEtiqueta(tag: string) {
    this.post.etiquetas = this.post.etiquetas!.filter((t) => t !== tag);
  }

  onFileSelected(event: any) {
    const files = Array.from(event.target.files);
    this.post.fotos = files.map((f: any) => f.name);
  }

  onSubmit() {
    console.log('✅ Post creado:', this.post);
  }

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}

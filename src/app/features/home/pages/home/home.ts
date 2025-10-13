import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth';
import { GalleryComponent } from '../../../../shared/motion/gallery/gallery';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GalleryComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) {}
}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Por favor complete ambos campos.');
      return;
    }

    // Simulación de login (sin API)
    const ok = this.authService.loginMock(this.email, this.password);
    if (ok) {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales inválidas (simulación).');
    }
  }
}

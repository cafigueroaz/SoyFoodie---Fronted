// login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;

  constructor(public authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      return alert('Completa email y contraseña.');
    }

    this.loading = true;

    // Login real
    this.authService
      .loginHttp({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          // Aplicamos el token en Signals y localStorage
          this.authService.applyToken(res.token);

          const role = this.authService.role();
          if (role === 'user') this.router.navigate(['/profile/user']);
          else if (role === 'partner')
            this.router.navigate(['/profile/partner']);
          else this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
          alert('Credenciales inválidas.');
        },
        complete: () => (this.loading = false),
      });
  }

  logout() {
    this.authService.logout();
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

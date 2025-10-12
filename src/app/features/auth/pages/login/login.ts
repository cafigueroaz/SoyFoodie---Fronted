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
  isLoggedIn!: boolean;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.isLoggedInCheck();
  }
  onSubmit() {
    const ok = this.authService.loginMock(this.email, this.password);
    if (ok) {
      this.isLoggedInCheck();
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales inválidas.');
    }
  }
  isLoggedInCheck() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

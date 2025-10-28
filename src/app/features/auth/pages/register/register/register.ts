import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  step: 'choose' | 'foodie' | 'partner' = 'choose';

  name = '';
  nickname = '';
  email = '';
  password = '';

  age: number | null = null;

  address = '';
  schedule = '';
  phone = '';
  ownerName = '';

  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  select(type: 'foodie' | 'partner') {
    this.step = type;
  }

  submitFoodie() {
    if (
      !this.name ||
      !this.nickname ||
      !this.email ||
      !this.password ||
      !this.age
    ) {
      alert('Completa todos los campos.');
      return;
    }

    this.loading = true;

    this.auth
      .registerHttp({
        name: this.name,
        nickname: this.nickname,
        email: this.email,
        password: this.password,
        role: 'foodie',
        age: this.age,
      })
      .subscribe({
        next: ({ token }) => {
          this.auth.applyToken(token);
          this.loading = false;
          this.router.navigate(['/feed']);
        },
        error: (err) => {
          this.loading = false;
          alert(err?.error?.error || 'Error al registrar usuario.');
        },
      });
  }

  submitPartner() {
    if (
      !this.name ||
      !this.nickname ||
      !this.email ||
      !this.password ||
      !this.address ||
      !this.ownerName ||
      !this.phone ||
      !this.schedule
    ) {
      alert('Completa todos los campos del restaurante.');
      return;
    }

    this.loading = true;

    this.auth
      .registerHttp({
        name: this.name,
        nickname: this.nickname,
        email: this.email,
        password: this.password,
        role: 'partner',
        address: this.address,
        ownerName: this.ownerName,
        phone: this.phone,
        schedule: this.schedule,
      })
      .subscribe({
        next: ({ token }) => {
          this.auth.applyToken(token);
          this.loading = false;
          this.router.navigate(['/feed']);
        },
        error: (err) => {
          this.loading = false;
          alert(err?.error?.error || 'Error al registrar partner.');
        },
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

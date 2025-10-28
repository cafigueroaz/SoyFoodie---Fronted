import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

type Role = 'user' | 'partner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  step: 'choose' | 'user' | 'partner' = 'choose';

  // Campos comunes
  email = '';
  name = '';
  lastname = '';
  nickname = '';
  password = '';

  // Campos específicos de user
  age = '';

  // Campos específicos de partner
  address = '';
  ownerName = '';
  phone = '';
  schedule = '';

  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  select(type: 'user' | 'partner') {
    this.step = type;
  }

  submitUser() {
    if (
      !this.name ||
      !this.lastname ||
      !this.nickname ||
      !this.email ||
      !this.password ||
      !this.age
    )
      return alert('Completa todos los campos.');

    this.loading = true;

    this.auth
      .registerHttp({
        name: this.name,
        email: this.email,
        password: this.password,
        type: 'user',
        lastname: this.lastname,
        nickname: this.nickname,
        age: this.age,
      })
      .subscribe({
        next: ({ token }) => {
          this.auth.applyToken(token); // queda logueado tras registro
          this.loading = false;
          this.router.navigate(['/home']);
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
      !this.lastname ||
      !this.nickname ||
      !this.email ||
      !this.password ||
      !this.address ||
      !this.ownerName ||
      !this.phone ||
      !this.schedule
    )
      return alert('Completa todos los campos de empresa.');

    this.loading = true;

    this.auth
      .registerHttp({
        name: this.name,
        email: this.email,
        password: this.password,
        type: 'partner',
        lastname: this.lastname,
        nickname: this.nickname,
        address: this.address,
        ownerName: this.ownerName,
        phone: this.phone,
        schedule: this.schedule,
      })
      .subscribe({
        next: ({ token }) => {
          this.auth.applyToken(token); // queda logueado tras registro
          this.loading = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loading = false;
          alert(err?.error?.error || 'Error al registrar empresa.');
        },
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

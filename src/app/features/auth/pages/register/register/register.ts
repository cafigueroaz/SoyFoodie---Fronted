import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth'; // asegúrate que exista este servicio

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
  dateOfBirth = '';

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
      !this.dateOfBirth
    )
      return alert('Completa todos los campos.');
    this.loading = true;

    const ok = this.auth.register({
      name: this.name,
      lastname: this.lastname,
      nickname: this.nickname,
      email: this.email,
      password: this.password,
      dateOfBirth: this.dateOfBirth,
      type: 'user',
    });

    setTimeout(() => {
      this.loading = false;
      ok
        ? this.router.navigate(['/home'])
        : alert('Error al registrar usuario.');
    }, 1000);
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

    const ok = this.auth.register({
      name: this.name,
      lastname: this.lastname,
      nickname: this.nickname,
      email: this.email,
      password: this.password,
      address: this.address,
      ownerName: this.ownerName,
      phone: this.phone,
      schedule: this.schedule,
      type: 'partner',
    });

    setTimeout(() => {
      this.loading = false;
      ok
        ? this.router.navigate(['/home'])
        : alert('Error al registrar empresa.');
    }, 1000);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  constructor(private router: Router) {}
  email = '';
  name = '';
  lastname = '';
  nickname = '';
  password = '';
  dateOfBirth = '';
  onSubmit() {
    console.log('Formulario de registro enviado');
  }

  goToLogin() {
    console.log('Ir a login');
  }
}

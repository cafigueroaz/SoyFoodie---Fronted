import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: '**', redirectTo: 'home' },
  { path: 'register', component: Register },
];

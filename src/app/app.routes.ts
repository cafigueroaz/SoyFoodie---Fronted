import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { Login } from './features/auth/pages/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: '**', redirectTo: 'home' },
];

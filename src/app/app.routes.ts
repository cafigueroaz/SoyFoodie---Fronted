import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home';
import { LoginComponent } from './features/auth/pages/login/login';
import { RegisterComponent } from './features/auth/pages/register/register/register';
import { GalleryComponent } from './shared/motion/gallery/gallery';
import { ProfileUser } from './features/user/pages/profile/profileUser';
import { ProfileRestaurant } from './features/restaurant/pages/profile/profileRestaurant';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'profile-user', component: ProfileUser },
  { path: 'profile-rest', component: ProfileRestaurant },
  { path: '**', redirectTo: 'home' },
];

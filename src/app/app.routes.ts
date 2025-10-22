import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home';
import { LoginComponent } from './features/auth/pages/login/login';
import { RegisterComponent } from './features/auth/pages/register/register/register';
import { ProfileUser } from './features/user/pages/profile/profileUser';
import { ProfilePartner } from './features/partner/pages/profile/profilePartner';
import { CreatePost } from './features/post/pages/create/create';
import { FeedPage } from './features/feed/pages/feed-page/feed-page';
import { authGuard } from './guards/auth-guard';
import { guestOnlyGuard } from './guards/guest-only-guard';
import { rolGuard } from './guards/rol-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', canActivate: [guestOnlyGuard], component: LoginComponent },
  {
    path: 'register',
    canActivate: [guestOnlyGuard],
    component: RegisterComponent,
  },
  {
    path: 'profile',
    canActivate: [rolGuard],
    children: [
      { path: 'user', component: ProfileUser },
      { path: 'partner', component: ProfilePartner },
    ],
  },
  { path: 'create/post', canActivate: [authGuard], component: CreatePost },
  { path: 'feed', canActivate: [authGuard], component: FeedPage },
  { path: '**', redirectTo: 'home' },
];

import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home';
import { LoginComponent } from './features/auth/pages/login/login';
import { RegisterComponent } from './features/auth/pages/register/register/register';
import { ProfileUser } from './features/user/pages/profile/profileUser';
import { ProfilePartner } from './features/partner/pages/profile/profilePartner';
import { CreatePost } from './features/post/pages/create/create';
import { FeedPage } from './features/feed/pages/feed-page/feed-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/user', component: ProfileUser },
  { path: 'profile/partner', component: ProfilePartner },
  { path: 'create/post', component: CreatePost },
  { path: 'feed', component: FeedPage },

  { path: '**', redirectTo: 'home' },
];

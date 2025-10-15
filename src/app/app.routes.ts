import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home';
import { LoginComponent } from './features/auth/pages/login/login';
import { RegisterComponent } from './features/auth/pages/register/register/register';
import { GalleryComponent } from './shared/motion/gallery/gallery';
import { ProfileUser } from './features/user/pages/profile/profileUser';
import { ProfileRestaurant } from './features/restaurant/pages/profile/profileRestaurant';
import { CreatePost } from './features/post/pages/create/create';
import { ScrollGalleryComponent } from './shared/motion/motion-feed/motion-feed';
import { FeedPage } from './features/feed/pages/feed-page/feed-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-user', component: ProfileUser },
  { path: 'profile-rest', component: ProfileRestaurant },
  { path: 'create/post', component: CreatePost },
  { path: 'feed', component: FeedPage },
  { path: 'gallery', component: GalleryComponent },
  { path: 'feedprueba', component: ScrollGalleryComponent },
  { path: '**', redirectTo: 'home' },
];

import { Component } from '@angular/core';
import { UserPostsComponent } from '../../../../shared/motion/user-posts/user-posts';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-profile',
  imports: [UserPostsComponent, NavbarComponent],
  templateUrl: './profileUser.html',
  styleUrl: './profileUser.scss',
})
export class ProfileUser {}

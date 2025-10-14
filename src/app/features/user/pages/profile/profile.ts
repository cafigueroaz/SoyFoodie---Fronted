import { Component } from '@angular/core';
import { UserPostsComponent } from '../../../../shared/motion/user-posts/user-posts';
@Component({
  selector: 'app-profile',
  imports: [UserPostsComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {}

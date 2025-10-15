import { Component } from '@angular/core';
import { UserPostsComponent } from '../../../../shared/motion/user-posts/user-posts';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar';

interface Tab {
  icon: string;
}
@Component({
  selector: 'app-profile',
  imports: [UserPostsComponent, NavbarComponent],
  templateUrl: './profileUser.html',
  styleUrl: './profileUser.scss',
})
export class ProfileUser {
  userTabs: Tab[] = [
    { icon: '/icons/grid.svg' },
    { icon: '/icons/hearth.svg' },
    { icon: '/icons/arrow-path-rounded-square.svg' },
    { icon: '/icons/bookmark.svg' },
  ];
}

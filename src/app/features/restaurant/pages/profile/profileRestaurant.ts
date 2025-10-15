import { Component } from '@angular/core';
import { UserPostsComponent } from '../../../../shared/motion/user-posts/user-posts';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar';
import { CommonModule } from '@angular/common';

interface Tab {
  icon: string;
}

@Component({
  selector: 'app-profile-restaurant',
  standalone: true,
  imports: [UserPostsComponent, NavbarComponent, CommonModule],
  templateUrl: './profileRestaurant.html',
  styleUrls: ['./profileRestaurant.scss'],
})
export class ProfileRestaurant {
  tags: string[] = ['Pet Friendly', 'Vegano', 'Económico'];
  infos: string[] = ['Dirección', 'Teléfono', 'Horario'];

  restaurantTabs: Tab[] = [
    { icon: '/icons/grid.svg' },
    { icon: '/icons/tag.svg' },
  ];
}

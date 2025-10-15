import { Component } from '@angular/core';
import { UserPostsComponent } from '../../../../shared/motion/user-posts/user-posts';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile-restaurant',
  imports: [UserPostsComponent, NavbarComponent, CommonModule],
  templateUrl: './profileRestaurant.html',
  styleUrl: './profileRestaurant.scss',
})
export class ProfileRestaurant {
  tags: string[] = ['Pet Friendly', 'Vegano', 'Económico'];
  infos: string[] = ['Dirección', 'Telefono', 'Horario'];
}

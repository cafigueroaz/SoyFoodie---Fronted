import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tab {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../user-posts/user-posts.html',
  styleUrls: ['./user-posts.scss'],
})
export class UserPostsComponent {
  tabs: Tab[] = [
    { icon: '🍅', label: 'Tomate' },
    { icon: '🥬', label: 'Lechuga' },
    { icon: '🧀', label: 'Queso' },
    { icon: '🧀', label: 'Queso' },
  ];

  selectedTab: Tab = this.tabs[0];

  selectTab(tab: Tab) {
    this.selectedTab = tab;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tab {
  icon: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  tabs: Tab[] = [
    { icon: '/icons/home.svg' },
    { icon: '/icons/search.svg' },
    { icon: '/icons/plus-square.svg' },
    { icon: '/icons/map.svg' },
    { icon: '/icons/user-circle-2.svg' },
  ];

  selectedTab: Tab = this.tabs[0];

  selectTab(tab: Tab) {
    this.selectedTab = tab;
  }
}

import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Tab {
  icon: string;
  route: string;
  name: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements OnInit, OnChanges {
  tabs: Tab[] = [
    { icon: '/icons/home.svg', route: '', name: 'Home' },
    { icon: '/icons/search.svg', route: '', name: 'Search' },
    { icon: '/icons/plus-square.svg', route: '/create/post', name: 'Create' },
    { icon: '/icons/map.svg', route: '', name: 'Map' },
    {
      icon: '/icons/user-circle-2.svg',
      route: '/profile-user',
      name: 'Profile',
    },
  ];

  @Input() activeTabName: string = '';

  selectedTab?: Tab;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateSelectedTab();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeTabName']) {
      this.updateSelectedTab();
    }
  }

  selectTab(tab: Tab) {
    this.selectedTab = tab;
    this.router.navigate([tab.route]);
  }

  private updateSelectedTab() {
    this.selectedTab = this.tabs.find(
      (tab) => tab.name.toLowerCase() === this.activeTabName.toLowerCase()
    );
  }
}

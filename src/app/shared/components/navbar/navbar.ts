import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth';

interface Tab {
  icon: string;
  route?: string;
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
    { icon: '/icons/home.svg', route: '/feed', name: 'Home' },
    { icon: '/icons/search.svg', route: undefined, name: 'Search' },
    { icon: '/icons/plus-square.svg', route: '/create/post', name: 'Create' },
    { icon: '/icons/map.svg', route: undefined, name: 'Map' },
    {
      icon: '/icons/user-circle-2.svg',
      route: '/profile/user',
      name: 'Profile',
    },
  ];
  auth = inject(AuthService);
  @Input() activeTabName: string = '';

  selectedTab?: Tab;
  role = localStorage.getItem('auth_role');

  holdTimeout: any;
  showProfileMenu = false;

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

  startHold(tab: Tab) {
    if (tab.name === 'Profile') {
      this.holdTimeout = setTimeout(() => {
        this.showProfileMenu = true;
      }, 600);
    }
  }

  cancelHold() {
    clearTimeout(this.holdTimeout);
  }

  buttomLogout() {
    this.auth.logout();
    this.router.navigate(['/feed']);
  }

  private updateSelectedTab() {
    this.selectedTab = this.tabs.find(
      (tab) => tab.name.toLowerCase() === this.activeTabName.toLowerCase()
    );
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tab {
  icon: string;
}

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../user-posts/user-posts.html',
  styleUrls: ['./user-posts.scss'],
})
export class UserPostsComponent {
  @Input() tabs: Tab[] = [];

  selectedTab: Tab = this.tabs[0];

  selectTab(tab: Tab) {
    this.selectedTab = tab;
  }

  ngOnInit() {
    if (this.tabs.length > 0) {
      this.selectedTab = this.tabs[0];
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PostItem {
  id: number;
  type: 'video' | 'image';
  src: string;
  likes: number;
}

interface Tab {
  icon: string;
  posts: PostItem[];
}

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../user-posts/user-posts.html',
  styleUrls: ['./user-posts.scss'],
})
export class UserPostsComponent implements OnInit {
  @Input() tabs: Tab[] = [];
  selectedTab!: Tab;

  ngOnInit() {
    if (this.tabs.length > 0) {
      this.selectedTab = this.tabs[0];
    }
  }

  selectTab(tab: Tab) {
    this.selectedTab = tab;
  }
}

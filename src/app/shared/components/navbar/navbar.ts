import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tab {
  icon: string;
  label: string;
}

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  tabs: Tab[] = [
    { icon: '/icons/home.svg', label: 'Inicio' },
    { icon: '/icons/search.svg', label: 'Buscar' },
    { icon: '/icons/plus-square.svg', label: 'Agregar' },
    { icon: '/icons/map.svg', label: 'Mapa' },
    { icon: '/icons/user-circle-2.svg', label: 'Perfil' },
  ];

  selectedTab: Tab = this.tabs[0];

  selectTab(tab: Tab) {
    this.selectedTab = tab;
  }
}

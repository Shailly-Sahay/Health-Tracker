import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconField } from 'primeng/iconfield';

@Component({
  selector: 'app-layout',
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutComponent {
  isCollapsed = false;
  items: any[] = [
    { label: 'Home', icon: 'home-outline' },
    { label: 'Profile', icon: 'person-circle-outline' },
    { label: 'Settings', icon: 'settings-outline' },
  ];

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}

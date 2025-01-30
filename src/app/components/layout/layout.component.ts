import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconField } from 'primeng/iconfield';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutComponent {
  isCollapsed = false;
  items: any[] = [
    { label: 'Home', href: '/', icon: 'home-outline' },
    { label: 'Workouts', href: '/workouts', icon: 'person-circle-outline' },
    { label: 'Progress', href: '/workout-progress', icon: 'settings-outline' },
  ];

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}

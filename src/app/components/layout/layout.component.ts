import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxStarrySkyComponent } from '@omnedia/ngx-starry-sky';
import { DockModule } from 'primeng/dock';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, NgxStarrySkyComponent, DockModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  position: any = 'left';
  items: any[] = [
    { label: 'Home', icon: 'pi pi-home', href: '/' },
    { label: 'Workouts', icon: 'pi pi-calendar', href: '/workouts' },
    { label: 'Progress', icon: 'pi pi-cog', href: '/workout-progress' },
  ];
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { LayoutComponent } from './components/layout/layout.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    WorkoutFormComponent,
    LayoutComponent,
    WorkoutListComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'health-tracker';

  showTable = false;

  toggleView() {
    this.showTable = !this.showTable;
  }
}

import { Component } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [
    LayoutComponent,
    WorkoutFormComponent,
    WorkoutListComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Health Tracker';
}

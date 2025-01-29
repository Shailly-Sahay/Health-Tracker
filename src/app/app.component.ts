import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WorkoutFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'health-tracker';
}

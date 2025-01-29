import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent {
  workouts: any[] = [];

  constructor() {
    this.loadWorkouts();
  }
  loadWorkouts() {
    const storedWorkouts = localStorage.getItem('workouts');
    if (storedWorkouts) {
      this.workouts = JSON.parse(storedWorkouts);
    }
  }
}

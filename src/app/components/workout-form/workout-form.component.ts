import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ Required for *ngIf, *ngFor

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number | null = null;

  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Gym'];

  addWorkout() {
    console.log('Workout added:', {
      name: this.userName,
      type: this.workoutType,
      minutes: this.workoutMinutes,
    });
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = null;
  }
}

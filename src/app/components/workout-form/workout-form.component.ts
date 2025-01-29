import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent {
  @Output() workoutAdded = new EventEmitter<void>();

  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number | null = null;

  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Gym'];

  addWorkout() {
    if (!this.userName || !this.workoutType || !this.workoutMinutes) {
      alert('Please fill all fields!');
      return;
    }

    // Save workout data in localStorage (temporary storage)
    const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    workouts.push({
      name: this.userName,
      type: this.workoutType,
      minutes: this.workoutMinutes,
    });
    localStorage.setItem('workouts', JSON.stringify(workouts));

    // Emit event to switch to workout list
    this.workoutAdded.emit();
  }
}

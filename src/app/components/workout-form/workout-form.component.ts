import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { WorkoutService, Workout } from '../../services/workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-form',

  imports: [
    FormsModule,
    CommonModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent {
  @Output() workoutAdded = new EventEmitter<void>();

  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number | null = null;

  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Gym'];

  constructor(private workoutService: WorkoutService, private router: Router) {}

  addWorkout() {
    if (!this.userName || !this.workoutType || this.workoutMinutes === null) {
      alert('Please fill all fields!');
      return;
    }

    const newWorkout: Workout = {
      userName: this.userName.trim(), // Ensure name is stored properly
      type: [this.workoutType], // ✅ Wrap as an array
      workoutNumber: 1, // Default to 1 (will be updated if user already exists)
      minutes: [this.workoutMinutes], // Convert minutes to an array
    };

    this.workoutService.addWorkout(newWorkout); // Add/update the workout
    this.workoutAdded.emit(); // Notify parent component

    // Reset form fields
    this.userName = '';
    this.workoutType = ''; // ✅ Reset as empty string, not an array
    this.workoutMinutes = null;

    // Navigate to the /workouts route
    this.router.navigate(['/workouts']);
  }
}

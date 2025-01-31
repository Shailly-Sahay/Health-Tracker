import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { WorkoutService } from '../../services/workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-form',
  standalone: true,
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

    // ✅ Add structured workout data
    this.workoutService.addWorkout(
      this.userName,
      this.workoutType,
      this.workoutMinutes
    );
    this.workoutAdded.emit(); // Notify parent component

    // ✅ Reset form fields
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = null;

    // ✅ Navigate to the /workouts route
    this.router.navigate(['/workouts']);
  }
}

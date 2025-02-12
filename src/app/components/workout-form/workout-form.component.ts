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
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

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
    ReactiveFormsModule,
  ],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent {
  title = 'Hey! Add Your Workout';
  workoutForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    workoutType: new FormControl('', [Validators.required]),
    workoutMinutes: new FormControl('', [Validators.required]),
  });

  userName = this.workoutForm.get('userName');
  workoutType = this.workoutForm.get('workoutType');
  workoutMinutes = this.workoutForm.get('workoutMinutes');

  @Output() workoutAdded = new EventEmitter<void>();

  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Gym'];

  constructor(private workoutService: WorkoutService, private router: Router) {}

  addWorkout() {
    if (this.workoutForm.invalid) {
      this.workoutForm.markAllAsTouched(); // Show validation errors
      return;
    }

    console.log('Submitting workout:', this.workoutForm.value); // ✅ Debugging (optional)

    // ✅ Submit entire object directly
    const workoutData = {
      userName: this.workoutForm.value.userName as string,
      workoutType: this.workoutForm.value.workoutType as string,
      workoutMinutes: Number(this.workoutForm.value.workoutMinutes),
    };
    this.workoutService.addWorkout(workoutData);

    this.workoutAdded.emit();

    // ✅ Reset the form after submission
    this.workoutForm.reset();

    this.router.navigate(['/workouts']);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { WorkoutService, Workout } from '../../services/workout.service';

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

  constructor(private workoutService: WorkoutService) {} //  Inject WorkoutService

  addWorkout() {
    if (!this.userName || !this.workoutType || !this.workoutMinutes) {
      alert('Please fill all fields!');
      return;
    }

    const newWorkout: Workout = {
      username: this.userName,
      type: this.workoutType,
      minutes: this.workoutMinutes,
    };

    this.workoutService.addWorkout(newWorkout); //  Add workout to the service
    this.workoutAdded.emit(); //  Notify parent component

    // Reset form fields
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = null;
  }
}

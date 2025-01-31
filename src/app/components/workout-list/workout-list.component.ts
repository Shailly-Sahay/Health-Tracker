import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../services/workout.service';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule, Table } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';
interface Workout {
  userName: string;
  type: string[]; // Array of workout types
  workoutNumber: number;
  minutes: number[]; // Array of durations
}
@Component({
  selector: 'app-workout-list',
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    IconFieldModule,
    DropdownModule,
    InputIconModule,
  ],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit {
  workouts: any[] = [];
  selectedSize: any = 'large';
  dt2: Table | undefined;

  @ViewChild('dt2') dt: Table | undefined;

  onFilterInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.dt?.filterGlobal(target.value, 'contains');
    }
  }
  applyFilterGlobal(event: Event, matchMode: string) {
    const inputElement = event.target as HTMLInputElement;
    this.dt?.filterGlobal(inputElement.value, matchMode);
  }

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.workouts = this.workoutService.getWorkouts().map((workout) => ({
      userName: workout.userName,
      type: workout.type.join(', '),
      workoutNumber: workout.workoutNumber,
      minutes: workout.minutes.reduce((sum, min) => sum + min, 0) + ' mins',
    }));
  }
}

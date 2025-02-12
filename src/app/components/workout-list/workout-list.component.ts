import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../services/workout.service';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule, Table } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit {
  workouts: any[] = [];
  selectedSize: any = 'large';

  @ViewChild('dt') dt: Table | undefined;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.workouts = this.workoutService.getWorkouts().map((workout) => ({
      userName: workout.userName,
      // Properly formats workout types with counts if repeated
      type: this.formatWorkoutTypes(workout.workouts),
      // Counts the number of workout sessions
      workoutNumber: workout.workouts.length,
      // Sums total workout minutes
      minutes:
        workout.workouts.reduce((sum, w) => sum + w.minutes, 0) + ' mins',
    }));
  }

  // Helper function to format workout types with count
  private formatWorkoutTypes(
    workouts: { type: string; minutes: number }[]
  ): string {
    const workoutCounts: { [key: string]: number } = {};

    workouts.forEach(({ type }) => {
      workoutCounts[type] = (workoutCounts[type] || 0) + 1;
    });

    return Object.entries(workoutCounts)
      .map(([type, count]) => (count > 1 ? `${type} (${count})` : type))
      .join(', ');
  }

  // Filters for username & workout type
  onFilterInput(event: Event, field: string): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.dt?.filter(target.value.toLowerCase(), field, 'contains');
    }
  }
}

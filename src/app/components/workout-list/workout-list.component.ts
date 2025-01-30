import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../services/workout.service';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DockModule } from 'primeng/dock';

interface Workout {
  userName: string;
  workoutType: string;
  duration: number;
  date: Date;
}
@Component({
  selector: 'app-workout-list',
  imports: [CommonModule, DockModule, TooltipModule, TableModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit {
  workouts: any[] = [];
  items: any[] = [
    { label: 'Delete', icon: 'pi pi-times' },
    { label: 'Edit', icon: 'pi pi-pencil' },
    { label: 'View', icon: 'pi pi-eye' },
  ];
  position: any = 'left';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.workouts = this.workoutService.getWorkouts();
  }
}

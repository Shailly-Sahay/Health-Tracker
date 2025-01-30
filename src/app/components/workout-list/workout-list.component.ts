import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../services/workout.service';

import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';

interface Workout {
  userName: string;
  workoutType: string;
  duration: number;
  date: Date;
}
@Component({
  selector: 'app-workout-list',
  imports: [CommonModule, TableModule],
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

  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal(event: Event, matchMode: string) {
    const inputElement = event.target as HTMLInputElement;
    this.dt?.filterGlobal(inputElement.value, matchMode);
  }

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.workouts = this.workoutService.getWorkouts();
  }
}

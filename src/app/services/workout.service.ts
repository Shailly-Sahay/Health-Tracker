import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Workout {
  username: string;
  type: string;
  minutes: number;
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly STORAGE_KEY = 'workouts';

  // Initialize with predefined workouts
  private workouts: Workout[] = [
    { username: 'Alice', type: 'Running', minutes: 30 },
    { username: 'Bob', type: 'Cycling', minutes: 45 },
    { username: 'Charlie', type: 'Swimming', minutes: 60 },
  ];

  // BehaviorSubject to manage workout state
  private workoutsSubject = new BehaviorSubject<Workout[]>(this.workouts);
  workouts$ = this.workoutsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  // Load workouts from localStorage if available
  private loadFromLocalStorage() {
    const storedWorkouts = localStorage.getItem(this.STORAGE_KEY);
    if (storedWorkouts) {
      this.workouts = JSON.parse(storedWorkouts);
      this.workoutsSubject.next(this.workouts);
    } else {
      this.saveToLocalStorage();
    }
  }

  // Save workouts to localStorage
  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.workouts));
  }

  // Add a new workout
  addWorkout(workout: Workout) {
    this.workouts.push(workout);
    this.workoutsSubject.next(this.workouts);
    this.saveToLocalStorage();
  }
}

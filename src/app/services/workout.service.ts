import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Workout {
  userName: string;
  type: string[]; // Each workout has multiple types
  workoutNumber: number;
  minutes: number[]; // Each workout session has multiple durations
}

interface UserWorkoutSummary {
  userName: string;
  workoutSummary: { [type: string]: number };
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly STORAGE_KEY = 'workouts';

  private workouts: Workout[] = [
    {
      userName: 'Alice',
      type: ['Running', 'Yoga'],
      workoutNumber: 2,
      minutes: [30, 25],
    },
    {
      userName: 'Bob',
      type: ['Cycling', 'Gym', 'Swimming'],
      workoutNumber: 3,
      minutes: [45, 20, 22],
    },
    {
      userName: 'Charlie',
      type: ['Swimming'],
      workoutNumber: 1,
      minutes: [60],
    },
  ];

  private workoutsSubject = new BehaviorSubject<Workout[]>(this.workouts);
  workouts$ = this.workoutsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const storedWorkouts = localStorage.getItem(this.STORAGE_KEY);
    if (storedWorkouts) {
      this.workouts = JSON.parse(storedWorkouts);
      this.workoutsSubject.next(this.workouts);
    } else {
      this.saveToLocalStorage();
    }
  }

  getWorkouts(): Workout[] {
    return this.workouts;
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.workouts));
  }

  addWorkout(workout: Workout) {
    const existingWorkout = this.workouts.find(
      (w) =>
        w.userName.trim().toLowerCase() ===
        workout.userName.trim().toLowerCase()
    );

    if (existingWorkout) {
      // Ensure type is an array
      if (!Array.isArray(existingWorkout.type)) {
        existingWorkout.type = [existingWorkout.type];
      }

      // Add the new workout type only if it's not already present
      const newWorkoutType = workout.type[0].trim();
      if (newWorkoutType && !existingWorkout.type.includes(newWorkoutType)) {
        existingWorkout.type.push(newWorkoutType);
      }

      // Increase the workout number
      existingWorkout.workoutNumber += 1;

      // Ensure minutes is an array before pushing
      if (!Array.isArray(existingWorkout.minutes)) {
        existingWorkout.minutes = [existingWorkout.minutes];
      }

      // Push new minutes value
      existingWorkout.minutes.push(workout.minutes[0]);
    } else {
      // If user does not exist, add as a new entry
      this.workouts.push(workout);
    }

    this.workoutsSubject.next(this.workouts);
    this.saveToLocalStorage();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WorkoutEntry {
  type: string;
  minutes: number;
}

export interface Workout {
  id: number;
  userName: string;
  workouts: WorkoutEntry[];
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly STORAGE_KEY = 'workouts';

  private workouts: Workout[] = [
    {
      id: 1,
      userName: 'Alice',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 },
        { type: 'Cycling', minutes: 74 },
      ],
    },
    {
      id: 2,
      userName: 'Charlie',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Yoga', minutes: 40 },
      ],
    },
    {
      id: 3,
      userName: 'Harry',
      workouts: [
        { type: 'Gym', minutes: 50 },
        { type: 'Running', minutes: 35 },
        { type: 'Swimming', minutes: 45 },
      ],
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

  addWorkout(workoutData: {
    userName: string;
    workoutType: string;
    workoutMinutes: number;
  }) {
    const { userName, workoutType, workoutMinutes } = workoutData;

    const existingUser = this.workouts.find(
      (w) => w.userName.trim().toLowerCase() === userName.trim().toLowerCase()
    );

    if (existingUser) {
      // Always push a new workout entry instead of merging
      existingUser.workouts.push({
        type: workoutType,
        minutes: workoutMinutes,
      });
    } else {
      //  If user does not exist, create new user with first workout
      this.workouts.push({
        id: this.workouts.length + 1, // Unique ID for the user
        userName: userName.trim(),
        workouts: [{ type: workoutType, minutes: workoutMinutes }],
      });
    }

    this.workoutsSubject.next(this.workouts);
    this.saveToLocalStorage();
  }
}

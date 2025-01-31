import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () =>
      import('./components/workout-form/workout-form.component').then(
        (m) => m.WorkoutFormComponent
      ),
  },
  {
    path: 'workouts',
    loadComponent: () =>
      import('./components/workout-list/workout-list.component').then(
        (m) => m.WorkoutListComponent
      ),
  },
  {
    path: 'workout-progress',
    loadComponent: () =>
      import('./components/workout-progress/workout-progress.component').then(
        (m) => m.WorkoutProgressComponent
      ),
  },
];

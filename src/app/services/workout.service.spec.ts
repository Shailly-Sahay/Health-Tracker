// import { TestBed } from '@angular/core/testing';
// import { WorkoutService, Workout } from './workout.service';

// describe('WorkoutService', () => {
//   let service: WorkoutService;
//   const STORAGE_KEY = 'workouts';

//   const testWorkout: Workout = {
//     userName: 'Shailly',
//     type: ['Running'],
//     workoutNumber: 1,
//     minutes: [45],
//   };

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(WorkoutService);

//     // Mock localStorage with a testable object
//     const localStorageMock = (() => {
//       let store: { [key: string]: string } = {};
//       return {
//         getItem: (key: string) => store[key] || null,
//         setItem: (key: string, value: string) => {
//           store[key] = value;
//         },
//         removeItem: (key: string) => {
//           delete store[key];
//         },
//         clear: () => {
//           store = {};
//         },
//       };
//     })();

//     spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
//     spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
//     spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);
//     spyOn(localStorage, 'clear').and.callFake(localStorageMock.clear);

//     service.addWorkout(testWorkout);
//   });

//   it('should save workouts to localStorage', () => {
//     // Retrieve stored data
//     const storedDataString = localStorage.getItem(STORAGE_KEY);
//     expect(storedDataString).toBeDefined(); // Ensure it's not null

//     const storedData: Workout[] = JSON.parse(storedDataString!);
//     console.log('Stored Workouts:', storedData); // Debugging log

//     // Ensure at least one workout is stored
//     expect(storedData.length).toBeGreaterThan(0);

//     // Ensure the stored data contains the workout for "Shailly"
//     const foundWorkout = storedData.find((w) => w.userName === 'Shailly');
//     expect(foundWorkout).toBeDefined();
//     expect(foundWorkout!.type).toContain('Running');
//     expect(foundWorkout!.minutes).toContain(45);
//   });
// });

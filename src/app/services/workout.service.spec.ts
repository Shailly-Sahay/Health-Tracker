import { TestBed } from '@angular/core/testing';
import { WorkoutService, Workout, WorkoutEntry } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;
  const STORAGE_KEY = 'workouts';

  const testWorkout: Workout = {
    id: 4,
    userName: 'Shailly',
    workouts: [{ type: 'Running', minutes: 45 }],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);

    // Mock localStorage
    const localStorageMock = (() => {
      let store: { [key: string]: string } = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
      };
    })();

    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);
    spyOn(localStorage, 'clear').and.callFake(localStorageMock.clear);
  });

  it('should initialize with default workouts', () => {
    const workouts = service.getWorkouts();
    expect(workouts.length).toBeGreaterThan(0);
  });

  it('should add a new user with a workout', () => {
    service.addWorkout('Shailly', 'Running', 45);
    const workouts = service.getWorkouts();
    const foundUser = workouts.find((w) => w.userName === 'Shailly');
    expect(foundUser).toBeDefined();
    expect(foundUser!.workouts.length).toBe(1);
    expect(foundUser!.workouts[0].type).toBe('Running');
    expect(foundUser!.workouts[0].minutes).toBe(45);
  });

  it('should add multiple workouts for the same user', () => {
    service.addWorkout('Shailly', 'Running', 45);
    service.addWorkout('Shailly', 'Swimming', 60);
    service.addWorkout('Shailly', 'Running', 30);

    const workouts = service.getWorkouts();
    const foundUser = workouts.find((w) => w.userName === 'Shailly');
    expect(foundUser).toBeDefined();
    expect(foundUser!.workouts.length).toBe(3);
    expect(foundUser!.workouts.filter((w) => w.type === 'Running').length).toBe(
      2
    );
  });

  it('should save workouts to localStorage', () => {
    service.addWorkout('Shailly', 'Running', 45);
    const storedDataString = localStorage.getItem(STORAGE_KEY);
    expect(storedDataString).toBeDefined();

    const storedData: Workout[] = JSON.parse(storedDataString!);
    const foundWorkout = storedData.find((w) => w.userName === 'Shailly');
    expect(foundWorkout).toBeDefined();
    expect(foundWorkout!.workouts.length).toBeGreaterThan(0);
  });
});

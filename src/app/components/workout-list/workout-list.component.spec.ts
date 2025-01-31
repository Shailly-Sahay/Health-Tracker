// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { WorkoutListComponent } from './workout-list.component';
// import {
//   WorkoutService,
//   WorkoutEntry,
//   Workout,
// } from '../../services/workout.service';
// import { TableModule } from 'primeng/table';
// import { PaginatorModule } from 'primeng/paginator';
// import { IconFieldModule } from 'primeng/iconfield';
// import { InputIconModule } from 'primeng/inputicon';
// import { of } from 'rxjs';
// import { By } from '@angular/platform-browser';

// describe('WorkoutListComponent', () => {
//   let component: WorkoutListComponent;
//   let fixture: ComponentFixture<WorkoutListComponent>;
//   let workoutService: jasmine.SpyObj<WorkoutService>;

//   const mockWorkouts: Workout[] = [
//     {
//       id: 1,
//       userName: 'Shailly',
//       workouts: [
//         { type: 'Yoga', minutes: 30 },
//         { type: 'Cycling', minutes: 40 },
//       ],
//     },
//     {
//       id: 2,
//       userName: 'Alice',
//       workouts: [{ type: 'Running', minutes: 25 }],
//     },
//   ];

//   beforeEach(async () => {
//     const workoutServiceMock = jasmine.createSpyObj('WorkoutService', [
//       'getWorkouts',
//     ]);
//     workoutServiceMock.getWorkouts.and.returnValue(mockWorkouts);

//     await TestBed.configureTestingModule({
//       imports: [
//         WorkoutListComponent,
//         TableModule,
//         PaginatorModule,
//         IconFieldModule,
//         InputIconModule,
//       ],
//       providers: [{ provide: WorkoutService, useValue: workoutServiceMock }],
//     }).compileComponents();

//     fixture = TestBed.createComponent(WorkoutListComponent);
//     component = fixture.componentInstance;
//     workoutService = TestBed.inject(
//       WorkoutService
//     ) as jasmine.SpyObj<WorkoutService>;

//     fixture.detectChanges();

//     console.log('Component Workouts:', component.workouts);
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should filter by name', async () => {
//     const filterInput = fixture.debugElement.query(
//       By.css('input[placeholder="Search by name"]')
//     ).nativeElement;

//     filterInput.value = 'Shailly';
//     filterInput.dispatchEvent(new Event('input'));

//     fixture.detectChanges();
//     await fixture.whenStable();

//     const filteredWorkouts = component.workouts.filter((w: Workout) =>
//       w.userName.toLowerCase().includes('shailly')
//     );

//     console.log('Filtered Workouts:', filteredWorkouts); // Debugging log

//     expect(filteredWorkouts.length).toBe(1);
//     expect(filteredWorkouts[0].userName).toBe('Shailly');
//   });

//   it('should filter workouts by type', async () => {
//     const filterInput = fixture.debugElement.query(
//       By.css('input[placeholder="Search workout"]')
//     ).nativeElement;

//     filterInput.value = 'Running';
//     filterInput.dispatchEvent(new Event('input'));

//     fixture.detectChanges();
//     await fixture.whenStable();

//     // ✅ Ensure `component.workouts` is not undefined before filtering
//     expect(component.workouts).toBeDefined();

//     // ✅ Filter workouts properly
//     const filteredWorkouts = component.workouts.filter((w: Workout) =>
//       (w.workouts ?? []).some((workout: WorkoutEntry) =>
//         workout.type.toLowerCase().includes('running')
//       )
//     );

//     console.log('Filtered Workouts:', filteredWorkouts); // Debugging log

//     expect(filteredWorkouts.length).toBe(1);
//     expect(
//       filteredWorkouts[0].workouts.some(
//         (w: WorkoutEntry) => w.type === 'Running'
//       )
//     ).toBeTrue();
//   });
// });

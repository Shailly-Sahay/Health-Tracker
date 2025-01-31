import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from '../../services/workout.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mock WorkoutService
    const workoutServiceMock = jasmine.createSpyObj('WorkoutService', [
      'addWorkout',
      'getWorkouts',
    ]);
    workoutServiceMock.addWorkout.and.stub(); // Prevents real method execution
    workoutServiceMock.getWorkouts.and.returnValue(of([]));

    // Mock Router
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    // Configure TestBed with proper imports (since it's a standalone component)
    await TestBed.configureTestingModule({
      imports: [WorkoutFormComponent, FormsModule],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(
      WorkoutService
    ) as jasmine.SpyObj<WorkoutService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges(); // Trigger initial component lifecycle
  });

  // Check if the component initializes correctly
  it('should create the workout form component', () => {
    expect(component).toBeTruthy();
  });

  // Ensure form submission is blocked if fields are empty
  it('should not submit the form if any field is empty', () => {
    spyOn(window, 'alert');

    component.addWorkout(); // Attempt to submit

    expect(window.alert).toHaveBeenCalledWith('Please fill all fields!');
    expect(workoutService.addWorkout).not.toHaveBeenCalled(); // No API call should be made
  });

  // Ensure form submission calls `addWorkout()` and emits an event
  it('should call addWorkout and emit an event when form is submitted', () => {
    spyOn(component.workoutAdded, 'emit');

    // Simulate user input
    component.userName = 'Alice';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;

    component.addWorkout(); // Submit the form

    // Check that the service method was called with the correct data
    expect(workoutService.addWorkout).toHaveBeenCalledWith({
      userName: 'Alice',
      type: ['Running'], // Converted to an array
      workoutNumber: 1,
      minutes: [30], // Converted to an array
    });

    // Check that the event was emitted
    expect(component.workoutAdded.emit).toHaveBeenCalled();

    // Ensure navigation happens
    expect(router.navigate).toHaveBeenCalledWith(['/workouts']);
  });

  // Check if input fields correctly update component properties
  it('should update component variables when form inputs change', () => {
    // Find input elements
    const nameInput = fixture.debugElement.query(
      By.css('#userName')
    ).nativeElement;
    const typeSelect = fixture.debugElement.query(
      By.css('#workoutType')
    ).nativeElement;
    const minutesInput = fixture.debugElement.query(
      By.css('#workoutMinutes')
    ).nativeElement;

    // Simulate user typing in inputs
    nameInput.value = 'Bob';
    nameInput.dispatchEvent(new Event('input'));

    typeSelect.value = typeSelect.options[1].value; // Select first workout type
    typeSelect.dispatchEvent(new Event('change'));

    minutesInput.value = '45';
    minutesInput.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // Update the component state

    // Ensure values are updated correctly in the component
    expect(component.userName).toBe('Bob');
    expect(component.workoutType).toBe('Running'); // First option selected
    expect(component.workoutMinutes).toBe(45);
  });

  // Ensure form resets after submission
  it('should reset form fields after submission', () => {
    // Simulate a valid submission
    component.userName = 'Alice';
    component.workoutType = 'Cycling';
    component.workoutMinutes = 40;

    component.addWorkout(); // Submit

    // Ensure fields are reset after submission
    expect(component.userName).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBeNull(); // Should be `null`, not `0`
  });
});

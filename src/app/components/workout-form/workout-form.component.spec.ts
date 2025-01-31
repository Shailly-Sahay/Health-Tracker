import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from '../../services/workout.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;
  let router: jasmine.SpyObj<Router>;

  // Define a test user workout entry
  const testUser = {
    userName: 'Shailly',
    workoutType: 'Swimming',
    workoutMinutes: 45,
  };

  beforeEach(async () => {
    workoutService = jasmine.createSpyObj('WorkoutService', ['addWorkout']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [WorkoutFormComponent, FormsModule],
      providers: [
        { provide: WorkoutService, useValue: workoutService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if any field is empty', () => {
    spyOn(window, 'alert');
    component.addWorkout();
    expect(window.alert).toHaveBeenCalledWith('Please fill all fields!');
    expect(workoutService.addWorkout).not.toHaveBeenCalled();
  });

  it('should submit form and call addWorkout', async () => {
    spyOn(component.workoutAdded, 'emit');

    await fillForm(testUser);
    component.addWorkout();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(workoutService.addWorkout).toHaveBeenCalledWith(
      testUser.userName,
      testUser.workoutType,
      testUser.workoutMinutes
    );

    expect(component.workoutAdded.emit).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/workouts']);
  });

  it('should update form values on input', async () => {
    await fillForm(testUser);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.userName).toBe(testUser.userName);
    expect(component.workoutType).toBe(testUser.workoutType);
    expect(component.workoutMinutes).toBe(testUser.workoutMinutes);
  });

  it('should reset form fields after submission', async () => {
    await fillForm(testUser);
    component.addWorkout();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.userName).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBeNull();
  });

  // Helper function to fill the form inputs
  async function fillForm({
    userName,
    workoutType,
    workoutMinutes,
  }: typeof testUser) {
    updateInput('#userName', userName);
    updateSelect('#workoutType', workoutType);
    updateInput('#workoutMinutes', String(workoutMinutes));

    fixture.detectChanges();
    await fixture.whenStable();
  }

  // Simulate user typing in an input field
  function updateInput(selector: string, value: string) {
    const input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  // Simulate selecting an option in a dropdown
  function updateSelect(selector: string, value: string) {
    const select = fixture.debugElement.query(By.css(selector)).nativeElement;
    select.value = value;
    select.dispatchEvent(new Event('change'));
  }
});

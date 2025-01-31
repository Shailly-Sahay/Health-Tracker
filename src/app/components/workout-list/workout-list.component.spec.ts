import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../../services/workout.service';
import { TableModule, Table } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;

  const mockWorkouts = [
    {
      userName: 'Shailly',
      type: ['Yoga', 'Cycling'],
      workoutNumber: 2,
      minutes: [30, 40],
    },
    { userName: 'Alice', type: ['Running'], workoutNumber: 1, minutes: [25] },
  ];

  beforeEach(async () => {
    const workoutServiceMock = jasmine.createSpyObj('WorkoutService', [
      'getWorkouts',
    ]);
    workoutServiceMock.getWorkouts.and.returnValue(mockWorkouts);

    await TestBed.configureTestingModule({
      imports: [
        WorkoutListComponent,
        TableModule,
        PaginatorModule,
        IconFieldModule,
        InputIconModule,
      ],
      providers: [{ provide: WorkoutService, useValue: workoutServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(
      WorkoutService
    ) as jasmine.SpyObj<WorkoutService>;

    fixture.detectChanges();
  });

  it('should filter workouts by name', async () => {
    const filterInput = fixture.debugElement.query(
      By.css('input[placeholder="Search by name"]')
    ).nativeElement;
    filterInput.value = 'Shailly';
    filterInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.dt?.filteredValue?.length).toBe(1);
    expect(component.dt?.filteredValue?.[0]?.userName).toBe('Shailly');
  });

  it('should filter workouts by type', async () => {
    const filterInput = fixture.debugElement.query(
      By.css('input[placeholder="Search workout"]')
    ).nativeElement;
    filterInput.value = 'Running';
    filterInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.dt?.filteredValue?.length).toBe(1);
    expect(component.dt?.filteredValue?.[0]?.type).toContain('Running');
  });
});

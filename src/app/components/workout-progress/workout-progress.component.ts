import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WorkoutService, Workout } from '../../services/workout.service';
import { ChartData, ChartOptions } from 'chart.js';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { CHART_COLORS } from '../constants/chart-color';

@Component({
  selector: 'app-workout-progress',
  standalone: true,
  imports: [TableModule, ChartModule, CommonModule],
  templateUrl: './workout-progress.component.html',
  styleUrls: ['./workout-progress.component.css'],
})
export class WorkoutProgressComponent implements OnInit {
  workouts: Workout[] = [];
  users: string[] = [];
  selectedUser: string | null = null;
  chartData: ChartData<'bar'> | null = null;
  chartOptions: ChartOptions<'bar'> = this.getChartOptions();
  selectedSize: any = 'small';
  chartColors = CHART_COLORS;

  constructor(
    private workoutService: WorkoutService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.workouts = this.workoutService.getWorkouts();

    // ✅ Extract unique users from the workout list
    this.users = [...new Set(this.workouts.map((w) => w.userName))];

    // ✅ Auto-select the first user if available
    if (this.users.length > 0) {
      this.selectedUser = this.users[0];
      this.updateChartData();
    }
  }

  selectUser(user: string) {
    this.selectedUser = user;
    this.updateChartData();
  }

  updateChartData() {
    if (!this.selectedUser) {
      this.chartData = null;
      return;
    }

    // ✅ Get all workouts for the selected user
    const userWorkouts = this.workouts.filter(
      (w) => w.userName === this.selectedUser
    );

    // ✅ Extract workout types & minutes
    const workoutMap: { [type: string]: number } = {};
    userWorkouts.forEach((workout) => {
      workout.type.forEach((workoutType, index) => {
        const minutes = workout.minutes[index] || 0; // Prevent undefined errors
        workoutMap[workoutType] = (workoutMap[workoutType] || 0) + minutes;
      });
    });

    const workoutTypes = Object.keys(workoutMap);
    const workoutValues = Object.values(workoutMap);

    // ✅ Prepare chart data
    this.chartData = {
      labels: workoutTypes,
      datasets: [
        {
          label: 'Minutes Spent',
          data: workoutValues,
          backgroundColor: this.chartColors.slice(0, workoutTypes.length),
          borderColor: this.chartColors.slice(0, workoutTypes.length),
          borderWidth: 1,
        },
      ],
    };

    this.cdr.detectChanges(); // Ensure UI updates properly
  }

  private getChartOptions(): ChartOptions<'bar'> {
    return {
      responsive: true,
      plugins: {
        legend: { display: true, position: 'top' },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Workout Type',
            font: { size: 14, weight: 'bold' },
          },
        },
        y: {
          title: {
            display: true,
            text: 'Minutes Spent',
            font: { size: 14, weight: 'bold' },
          },
          ticks: { stepSize: 10 },
        },
      },
    };
  }
}

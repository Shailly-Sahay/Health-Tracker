import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { ChartData, ChartOptions } from 'chart.js';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

interface UserWorkoutSummary {
  userName: string;
  workoutSummary: { [type: string]: number };
}

const CHART_COLORS = [
  '#42A5F5',
  '#66BB6A',
  '#FFA726',
  '#AB47BC',
  '#FF7043',
  '#29B6F6',
  '#8D6E63',
];

@Component({
  selector: 'app-workout-progress',
  standalone: true,
  imports: [TableModule, ChartModule, CommonModule],
  templateUrl: './workout-progress.component.html',
  styleUrls: ['./workout-progress.component.css'],
})
export class WorkoutProgressComponent implements OnInit {
  userWorkoutSummaries: UserWorkoutSummary[] = [];
  selectedUser: UserWorkoutSummary | null = null;
  chartData: ChartData<'bar'> | null = null;
  chartOptions: ChartOptions<'bar'> = this.getChartOptions();
  selectedSize: any = 'large';

  constructor(
    private workoutService: WorkoutService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userWorkoutSummaries = this.workoutService.getUserWorkoutSummaries();

    // Auto-select the first user if there are users available
    if (this.userWorkoutSummaries.length > 0) {
      this.selectedUser = this.userWorkoutSummaries[0];
      this.updateChartData(); // Update the chart for the first user
    }
  }

  selectUser(user: UserWorkoutSummary) {
    this.selectedUser = user;
    this.updateChartData();
  }

  updateChartData() {
    if (!this.selectedUser) {
      this.chartData = null;
      return;
    }

    const workoutTypes = Object.keys(this.selectedUser.workoutSummary);
    const workoutValues = Object.values(this.selectedUser.workoutSummary);

    this.chartData = {
      labels: workoutTypes,
      datasets: [
        {
          label: 'Minutes Spent',
          data: workoutValues,
          backgroundColor: CHART_COLORS.slice(0, workoutTypes.length),
          borderColor: CHART_COLORS.slice(0, workoutTypes.length),
          borderWidth: 1,
        },
      ],
    };

    this.cdr.detectChanges(); // Ensures UI updates properly
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

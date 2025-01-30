import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { ChartData, ChartOptions } from 'chart.js';
import { TableModule, Table } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { NgModule } from '@angular/core';

interface UserWorkoutSummary {
  userName: string;
  workoutSummary: { [type: string]: number };
}

@Component({
  selector: 'app-workout-progress',
  imports: [TableModule, ChartModule],
  templateUrl: './workout-progress.component.html',
  styleUrls: ['./workout-progress.component.css'],
})
export class WorkoutProgressComponent implements OnInit {
  userWorkoutSummaries: UserWorkoutSummary[] = [];
  selectedUser: UserWorkoutSummary | null = null;
  chartData: ChartData<'bar'> | null = null;
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.userWorkoutSummaries = this.workoutService.getUserWorkoutSummaries();
  }

  selectUser(user: UserWorkoutSummary) {
    this.selectedUser = user;
    this.updateChartData();
  }

  updateChartData() {
    if (this.selectedUser) {
      this.chartData = {
        labels: Object.keys(this.selectedUser.workoutSummary),
        datasets: [
          {
            label: 'Minutes',
            data: Object.values(this.selectedUser.workoutSummary),
            backgroundColor: '#42A5F5',
          },
        ],
      };
    }
  }
}

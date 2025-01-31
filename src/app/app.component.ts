import { Component } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Health Tracker';
}

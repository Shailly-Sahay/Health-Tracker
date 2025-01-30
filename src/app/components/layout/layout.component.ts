import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxStarrySkyComponent } from '@omnedia/ngx-starry-sky';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, NgxStarrySkyComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {}

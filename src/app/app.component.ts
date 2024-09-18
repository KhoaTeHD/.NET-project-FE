import { Component } from '@angular/core';
import { RevenueComponent } from './features/dashboard/revenue/revenue.component';
import { HomeComponent } from './features/home/home/home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RevenueComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HKHProject';
}

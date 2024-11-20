import { Component } from '@angular/core';
import { RevenueComponent } from './features/admin/dashboard/revenue/revenue.component';
import { HomeComponent } from './features/home/home/home.component';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { TokenStorageService } from './core/services/auth/token-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RevenueComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HKHProject';
}
import { Component } from '@angular/core';
import { RevenueComponent } from "./revenue/revenue.component";
import { ProductStaticComponent } from "./product-static/product-static.component";
import Chart from 'chart.js/auto';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RevenueComponent, ProductStaticComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
}

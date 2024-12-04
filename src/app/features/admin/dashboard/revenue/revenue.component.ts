import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';
import { OrderDto } from '../../../../core/models/order.model';
import { firstValueFrom } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.css'
})
export class RevenueComponent implements OnInit {
  chart: any;
  orders: OrderDto[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  async loadOrders(): Promise<void> {
    try {
      const data = await firstValueFrom(this.orderService.getAllOrders());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.orders = data.result;
        this.calculateRevenue();
      }
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  }

  calculateRevenue(): void {
    const revenueByMonth = new Array(12).fill(0);

    this.orders.forEach(order => {
      const month = new Date(order.datetime!).getMonth();
      revenueByMonth[month] += order.total ?? 0;
    });

    this.renderChart(revenueByMonth);
  }

  renderChart(revenueByMonth: number[]): void {
    const ctx = document.getElementById('myAreaChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [{
          label: 'Doanh thu',
          data: revenueByMonth,
          fill: true,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

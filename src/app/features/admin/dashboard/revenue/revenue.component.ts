import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.css'
})
export class RevenueComponent implements OnInit {
  chart: any;

  constructor() {}

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    const ctx = document.getElementById('myAreaChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line', // Sử dụng biểu đồ 'line' để vẽ Area chart
      data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        datasets: [{
          label: 'Doanh thu',
          data: [30, 20, 50, 40, 60, 70],
          fill: true, // Để vùng dưới đường được tô màu (tạo Area Chart)
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu của vùng dưới đường
          tension: 0.4 // Độ cong của đường
        }]
      },
      options: {
        responsive: true, // Cho phép chart thay đ��i kích thước và đ�� ưu tiên khi hiển thị trên màn hình
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}

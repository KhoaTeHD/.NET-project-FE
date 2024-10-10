import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-product-static',
  standalone: true,
  imports: [],
  templateUrl: './product-static.component.html',
  styleUrl: './product-static.component.css'
})
export class ProductStaticComponent implements OnInit {
  chart: any;
  constructor() {}

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart():void {
    const ctx = document.getElementById('myDoughnutChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Áo thun', 'Áo polo', 'Áo khoác', 'Quần đùi', 'Áo ba lỗ', 'Quần dài'],
        datasets: [{
          label: 'My Doughnut Dataset',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
      }
    });
  }
}

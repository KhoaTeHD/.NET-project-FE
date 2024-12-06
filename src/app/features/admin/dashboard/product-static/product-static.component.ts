import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';
import { OrderDto } from '../../../../core/models/order.model';
import { firstValueFrom } from 'rxjs';
import { Chart } from 'chart.js/auto';
import { CategoryDto } from '../../../../core/models/category.model';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-product-static',
  standalone: true,
  imports: [],
  templateUrl: './product-static.component.html',
  styleUrl: './product-static.component.css'
})
export class ProductStaticComponent implements OnInit {
  chart: any;
  orders: OrderDto[] = [];
  categories: CategoryDto[] = [];

  constructor(private orderService: OrderService, 
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  async loadOrders(): Promise<void> {
    try {
      const data = await firstValueFrom(this.orderService.getAllOrders());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.orders = data.result;
        await this.loadCategories();
        //console.log(this.orders);
        this.calculateTopCategories();
      }
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  }
  async loadCategories(): Promise<void> {
    try {
      const data = await firstValueFrom(this.categoryService.getAllCategorys());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.categories = data.result;
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }

  calculateTopCategories(): void {
    const categoryCount: { [key: string]: number } = {};

    this.orders.forEach(order => {
      order.detailOrders?.forEach(detail => {
        const categoryName = this.categories.find(c => c.id === detail.productVariation?.product?.cat_Id)?.name;
        if (categoryName) {
          if (!categoryCount[categoryName]) {
            categoryCount[categoryName] = 0;
          }
          categoryCount[categoryName] += detail.quantity ?? 0;
        }
      });
    });

    const sortedCategories = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const labels = sortedCategories.map(entry => entry[0]);
    const data = sortedCategories.map(entry => entry[1]);

    this.renderChart(labels, data);
  }

  renderChart(labels: string[], data: number[]): void {
    const ctx = document.getElementById('myDoughnutChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Đã bán',
          data: data,
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

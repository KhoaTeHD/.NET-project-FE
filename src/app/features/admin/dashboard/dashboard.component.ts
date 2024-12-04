import { Component, OnInit } from '@angular/core';
import { RevenueComponent } from "./revenue/revenue.component";
import { ProductStaticComponent } from "./product-static/product-static.component";
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { OrderDto } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order.service';
import { firstValueFrom } from 'rxjs';
import { ProductDto } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RevenueComponent, ProductStaticComponent, TableModule, TagModule, InputTextModule, ProgressBarModule, CommonModule, SliderModule, ButtonModule, FormsModule, MultiSelectModule, DropdownModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  orders: OrderDto[] = [];
  products: ProductDto[] = [];
  soldProducts: any[] = [];

  searchValue: string = '';

  constructor(private orderService: OrderService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadOrders();
    
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }

  async loadOrders(): Promise<void> {
    try {
      const data = await firstValueFrom(this.orderService.getAllOrders());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.orders = data.result;
        await this.loadProducts();
        this.calculateSoldProducts();
      }
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  }

  async loadProducts(): Promise<void> {
    try {
      const data = await firstValueFrom(this.productService.getAllProducts());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.products = data.result;
      }
    } catch (error) {
      console.error('Error fetching products', error);
    }
  }

  calculateSoldProducts(): void {
    const productCount: { [key: string]: any } = {};

    this.orders.forEach(order => {
      order.detailOrders?.forEach(detail => {
        var product = this.products.find(p => p.id === detail.productVariation?.product?.id);
        //console.log(product);
        //const productVar = product?.productVariations?.find(pv => pv.id === detail.productVariation?.id);
        if (product) {
          const key = `${product.id}-${detail.productVariation?.col_Id}-${detail.productVariation?.siz_Id}`;
          if (!productCount[key]) {
            productCount[key] = {
              name: product.name,
              category: product.category?.name,
              brand: product.brand?.name,
              size: detail.productVariation?.size?.name,
              color: detail.productVariation?.color?.name,
              quantity: 0
            };
          }
          productCount[key].quantity += detail.quantity ?? 0;
        }
      });
    });

    this.soldProducts = Object.values(productCount).sort((a, b) => b.quantity - a.quantity);
    console.log(this.soldProducts);
  }

  handleInput(event: Event, dt: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      dt.filterGlobal(inputElement.value, 'contains');
    }
  }

  getSeverity(status: string) {
    switch (status.toLowerCase()) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return undefined;
      default:
        return undefined;
    }
  }
}
import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog'

import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ CommonModule, CurrencyPipe, MatDialogModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  order = {
    id: 'DH001',
    date: '2023-10-01',
    customerName: 'Nguyễn Văn A',
    total: 1500000,
    products: [
        { id: 'SP001', name: 'Sản phẩm 1 Sản phẩm 1 Sản phẩm 1 Sản phẩm 1', quantity: 2, price: 200000 },
        { id: 'SP002', name: 'Sản phẩm 2', quantity: 1, price: 500000 },
        { id: 'SP003', name: 'Sản phẩm 3', quantity: 3, price: 150000 },
        { id: 'SP004', name: 'Sản phẩm 4', quantity: 1, price: 300000 },
        { id: 'SP005', name: 'Sản phẩm 5', quantity: 4, price: 100000 }
    ]
};

}
export interface Order {
  id: string;
  date: string;
  customerName: string;
  total: number;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
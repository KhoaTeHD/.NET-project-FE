import { Component, OnInit } from '@angular/core';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, InputTextModule, ButtonModule, ToastModule, DropdownModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.css'
})
export class ManageOrderComponent{
  visible: boolean = false;

  orders: Order[] = [
    {
      orderId: '000001',
      customerId: '00001',
      discountCode: 'Mã giảm giá',
      address: '34, Phường Bồng Lai, Thị xã Quế Võ, Tỉnh Bắc Ninh',
      orderDate: new Date('2024-05-19T05:04:42'),
      discount: -20000,
      totalAmount: 7605000,
      status: 0, // 0 là chưa xác nhận, 1 là đã xác nhận
      orderDetails: [
        {
          productId: 'P001',
          productName: 'Sản phẩm 1',
          quantity: 2,
          price: 3000000
        },
        {
          productId: 'P002',
          productName: 'Sản phẩm 2',
          quantity: 1,
          price: 1605000
        }
      ]
    },
    {
      orderId: '000002',
      customerId: '00002',
      discountCode: 'Mã giảm giá 2',
      address: '12, Phường Đình Bảng, Thị xã Từ Sơn, Tỉnh Bắc Ninh',
      orderDate: new Date('2024-05-20T06:00:00'),
      discount: -15000,
      totalAmount: 5000000,
      status: 1,
      orderDetails: [
        {
          productId: 'P003',
          productName: 'Sản phẩm 3',
          quantity: 1,
          price: 5000000
        }
      ]
    },
    // Thêm các dữ liệu mẫu khác
  ];

  selected_order: Order | null = null;

  constructor() { }

    showDialog(order: Order) {
      this.visible = true;
      this.selected_order = order;
    }
  
  handleInput(event: Event, dt: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
        dt.filterGlobal(inputElement.value, 'contains');
    }
  }
}

interface Order {
  orderId: string;
  customerId: string;
  discountCode: string;
  address: string;
  orderDate: Date;
  discount: number;
  totalAmount: number;
  status: number;
  orderDetails: OrderDetail[];
}

interface OrderDetail {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}
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
import { OrderService } from '../../../core/services/order.service';
import { firstValueFrom } from 'rxjs';
import { OrderDto } from '../../../core/models/order.model';

@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, InputTextModule, ButtonModule, ToastModule, DropdownModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.css'
})
export class ManageOrderComponent implements OnInit {
  visible: boolean = false;

  orders: OrderDto[] = [];

  clonedOrders: { [id: number]: OrderDto } = {};

  createOrder: OrderDto = {};

  searchValue: string = '';

  ngOnInit(): void {
    this.loadOrders();
  }

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private orderService: OrderService) { }

  showDialog(order: OrderDto | null) {
    this.visible = true;
    if (order) this.createOrder = { ...order };
  }

  deleteOrder(order: OrderDto) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa đơn hàng ' + order.order_ID + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(order.order_ID as number).subscribe({
          next: () => {
            this.orders = this.orders.filter((val) => val.order_ID !== order.order_ID);
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa đơn hàng', life: 3000 });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
          }
        });
      }
    });
  }

  handleInput(event: Event, dt: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      dt.filterGlobal(inputElement.value, 'contains');
    }
  }

  async loadOrders(): Promise<void> {
    try {
      const data = await firstValueFrom(this.orderService.getAllOrders());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.orders = data.result;
      }
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  }

  createNewOrder(): void {
    this.orderService.createOrder(this.createOrder).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đơn hàng đã được tạo' });
        this.loadOrders(); // Reload orders after creation
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }

  editOrder(order: OrderDto): void {
    this.orderService.updateOrder(order).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đơn hàng đã được cập nhật' });
        this.loadOrders(); // Reload orders after update
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }
}
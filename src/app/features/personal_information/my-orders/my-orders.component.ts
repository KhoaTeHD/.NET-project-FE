import { Component } from '@angular/core';
import { SidebarPersonalInfoComponent } from '../../../shared/components/sidebar-personal-info/sidebar-personal-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { OrderDto } from '../../../core/models/order.model';
import { firstValueFrom } from 'rxjs';
import { OrderService } from '../../../core/services/order.service';
import { UserDto } from '../../../core/models/auth/user-dto.model';
import { TokenStorageService } from '../../../core/services/auth/token-storage.service';
import { MessageService } from 'primeng/api'; // Import MessageService
import { ToastModule } from 'primeng/toast';
// npm install sweetalert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [SidebarPersonalInfoComponent, CommonModule, FormsModule, HeaderComponent, ToastModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
  providers: [MessageService],
})
export class MyOrdersComponent {
  orderList: OrderDto[] = [];
  user: UserDto | null = null;
  filteredOrders: OrderDto[] = [];

  selectedOrder: OrderDto = {
    order_ID: 0,
    customer_ID: '',
    coupon_Code: '',
    address: "",
    datetime: new Date(),
    discount_amount: 0,
    total: 0,
    orderStatus: "",
    formOfPayment: "",
    shipping_Charge: 0,
    detailOrders: [],
  };
  

  constructor(
    private orderService: OrderService,
    private tokenStorageService: TokenStorageService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    
    if(this.user) {
      await this.loadOrders();
    }
  }

  openModal(order: OrderDto) {
    this.selectedOrder = { ...order };
  }

  // Phương thức lọc đơn hàng
  filterOrders(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Ép kiểu cho event.target
    const status = selectElement.value; // Lấy giá trị từ dropdown

    if (status === 'Tất cả') {
      this.filteredOrders = [...this.orderList]; // Hiện tất cả đơn hàng
    } else {
      this.filteredOrders = this.orderList.filter(order => order.orderStatus === status);
    }
  }

  async loadOrders(): Promise<void> {
    try {
      const data = await firstValueFrom(this.orderService.getOrdersByCustomerId(this.user!.id));
      if (data.isSuccess && Array.isArray(data.result)) {
        this.orderList = data.result.sort((a, b) => {
          const dateA = a.datetime ? new Date(a.datetime).getTime() : 0; // Gán giá trị 0 nếu undefined
          const dateB = b.datetime ? new Date(b.datetime).getTime() : 0; // Gán giá trị 0 nếu undefined
          return dateB - dateA; // Sắp xếp giảm dần
        });
      }
    } catch (error) {
      console.error('Error fetching orders', error);
    }
    this.filteredOrders = this.orderList;
  }

  // Phương thức xác nhận hủy đơn hàng
  async cancelOrder(id: number): Promise<void> {
    const result = await Swal.fire({
      title: 'Huỷ đơn hàng?',
      text: 'Bạn có chắn chắn muốn hủy đơn hàng này?',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Không',
      confirmButtonText: 'Chấp nhận',
    });

    if (result.isConfirmed) {
      try {
        this.orderService.updateOrderStatus(id, 'Đã hủy').subscribe({
          next: async (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công!',
              detail: 'Hủy đơn hàng thành công!',
            });
            await this.loadOrders();
          },
          error: (err) => {
            console.error('Error when canceling order:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại!',
              detail: 'Hủy đơn hàng thất bại!',
            });
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}

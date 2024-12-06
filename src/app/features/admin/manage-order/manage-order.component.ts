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
import { AddressApiService } from '../../../core/services/address-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, InputTextModule, ButtonModule, ToastModule, DropdownModule, ConfirmDialogModule, DialogModule, FormsModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.css'
})
export class ManageOrderComponent implements OnInit {
  visible: boolean = false;

  orders: OrderDto[] = [];
  filteredOrders: OrderDto[] = [];
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  clonedOrders: { [id: number]: OrderDto } = {};

  createOrder: OrderDto = {};

  searchValue: string = '';
  selectedProvince: number = 0;
  selectedDistrict: number = 0;
  selectedWard: number = 0;
  dateFrom: string = '';
  dateTo: string = '';

  ngOnInit(): void {
    this.loadOrders();
    this.loadProvinces();
  }

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private orderService: OrderService,
    private addressApiService: AddressApiService) { }

  showDialog(order: OrderDto | null) {
    this.visible = true;
    if (order) this.createOrder = { ...order };
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
        this.filteredOrders = [...this.orders];
        console.log(this.orders);
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

  async loadProvinces(): Promise<void> {
    try {
      const data: any = await firstValueFrom(this.addressApiService.getProvinces());
      if (data.error === 0) {
        this.provinces = data.data;
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách Tỉnh Thành:', error);
    }
  }

  async onProvinceChange(): Promise<void> {
    this.districts = [];
    this.wards = [];
    if (this.selectedProvince !== 0) {
      try {
        const data: any = await firstValueFrom(this.addressApiService.getDistricts(this.selectedProvince));
        if (data.error === 0) {
          this.districts = data.data;
        }
        this.selectedDistrict = 0;
        this.selectedWard = 0;
      } catch (error) {
        console.error('Lỗi khi tải quận huyện:', error);
      }
    }
  }

  async onDistrictChange(): Promise<void> {
    this.wards = [];
    if (this.selectedDistrict !== 0) {
      try {
        const data: any = await firstValueFrom(this.addressApiService.getWards(this.selectedDistrict));
        if (data.error === 0) {
          this.wards = data.data;
        }
        this.selectedWard = 0;
      } catch (error) {
        console.error('Lỗi khi tải phường xã:', error);
      }
    }
  }

  filterOrders(): void {
    // Kiểm tra nếu ngày bắt đầu sau ngày kết thúc
    if (this.dateFrom && this.dateTo && new Date(this.dateFrom) > new Date(this.dateTo)) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Ngày bắt đầu phải trước ngày kết thúc' });
      return;
    }
  
    this.filteredOrders = this.orders.filter(order => {
      const orderDate = order.datetime ? new Date(order.datetime) : null;
      const fromDate = this.dateFrom ? new Date(this.dateFrom) : null;
      const toDate = this.dateTo ? new Date(this.dateTo) : null;
  
      // Lọc theo ngày
      const isWithinDateRange = 
        (!fromDate || (orderDate && orderDate >= fromDate)) &&
        (!toDate || (orderDate && orderDate <= toDate));
  
      // Lọc theo địa chỉ
      const isMatchingProvince = this.selectedProvince === 0 || (order.address && order.address.includes(this.provinces.find(p => p.id === this.selectedProvince)?.name || ''));
      const isMatchingDistrict = this.selectedDistrict === 0 || (order.address && order.address.includes(this.districts.find(d => d.id === this.selectedDistrict)?.name || ''));
      const isMatchingWard = this.selectedWard === 0 || (order.address && order.address.includes(this.wards.find(w => w.id === this.selectedWard)?.name || ''));
  
      // Điều kiện lọc tổng
      return isWithinDateRange && isMatchingProvince && isMatchingDistrict && isMatchingWard;
    });
  
    if (this.filteredOrders.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Không tìm thấy đơn hàng nào phù hợp!' });
    }
  }
  
}
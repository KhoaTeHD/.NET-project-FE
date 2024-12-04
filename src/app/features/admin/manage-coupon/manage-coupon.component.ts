import { Component, OnInit } from '@angular/core';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { firstValueFrom } from 'rxjs';
import { CouponDto } from '../../../core/models/coupon.model';
import { CouponService } from '../../../core/services/coupon.service';


@Component({
  selector: 'app-manage-coupon',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-coupon.component.html',
  styleUrl: './manage-coupon.component.css'
})
export class ManageCouponComponent implements OnInit {

  coupons: CouponDto[] = [];

  visible: boolean = false;

  statuses!: SelectItem[];

  createCoupon: CouponDto = {};

  clonedCoupons: { [id: string]: CouponDto } = {};

  ngOnInit(): void {
    this.statuses = [
      { label: 'Hoạt động', value: true },
      { label: 'Ngừng bán', value: false }
    ];
    this.loadCoupons();
  }

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private couponService: CouponService) { }

  async loadCoupons(): Promise<void> {
    try {
      // Sử dụng firstValueFrom để lấy dữ liệu từ observable
      const data = await firstValueFrom(this.couponService.getAllCoupons());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.coupons = data.result;
      }
    } catch (error) {
      console.error('Error fetching suppliers', error);
    }
  }

  showDialog() {
    this.visible = true;
    this.createCoupon = { status: true };
  }

  handleInput(event: Event, dt: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
        dt.filterGlobal(inputElement.value, 'contains');
    }
  }

  onRowEditInit(coupon: CouponDto) {
    this.clonedCoupons[coupon.coupon_Code as string] = { ...coupon };
  }

  onRowEditSave(coupon: CouponDto, index: number) {
    if (coupon.couponName?.trim().length !== 0) {
      //this.editSupplier(coupon);
      delete this.clonedCoupons[coupon.coupon_Code as string];
    } else {
      this.coupons[index] = this.clonedCoupons[coupon.coupon_Code as string];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(coupon: CouponDto, index: number) {
    this.coupons[index] = this.clonedCoupons[coupon.coupon_Code as string];
    delete this.clonedCoupons[coupon.coupon_Code as string];
  }

  deleteSupplier(coupon: CouponDto) {
    this.confirmationService.confirm({
        message: 'Bạn có chắc xóa ' + coupon.couponName + ' không?',
        header: 'Xác nhận',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.coupons = this.coupons.filter((val) => val.coupon_Code !== coupon.coupon_Code);
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa nhà cung cấp', life: 3000 });
        }
    });
  }

  getSeverity(status: boolean) {
    switch (status) {
        case true:
            return 'success';
        case false:
            return 'danger';
        default:
            return undefined;
    }
  }


}

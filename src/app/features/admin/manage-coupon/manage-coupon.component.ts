import { Component, OnInit } from '@angular/core';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-manage-coupon',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule, ReactiveFormsModule, CalendarModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-coupon.component.html',
  styleUrl: './manage-coupon.component.css'
})
export class ManageCouponComponent implements OnInit {

  coupons: CouponDto[] = [];

  visible: boolean = false;

  statuses!: SelectItem[];

  couponForm: FormGroup = new FormGroup({
    coupon_Code: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    expirationDate: new FormControl('', [Validators.required]),
    couponName: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required]),
    unit: new FormControl('', [Validators.required]),
    status: new FormControl(true)
  });

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
        console.log(this.coupons);
      }
    } catch (error) {
      console.error('Error fetching suppliers', error);
    }
  }

  showDialog() {
    this.visible = true;
  }

  handleInput(event: Event, dt: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
        dt.filterGlobal(inputElement.value, 'contains');
    }
  }

  onRowEditInit(coupon: CouponDto) {
    this.clonedCoupons[coupon.coupon_Code as string] = { ...coupon };
    //console.log(this.clonedCoupons);
  }

  async onRowEditSave(coupon: CouponDto, index: number) {
    if (coupon.couponName?.trim().length !== 0) {
      try {
        const response = await firstValueFrom(this.couponService.updateCoupon(coupon));
        if (response.isSuccess && response.result) {
          this.coupons[index] = response.result;
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật mã giảm giá thành công', life: 3000 });
          delete this.clonedCoupons[coupon.coupon_Code as string];
        } else {
          throw new Error('Cập nhật thất bại');
        }
      } catch (error) {
        this.coupons[index] = this.clonedCoupons[coupon.coupon_Code as string];
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Không thể cập nhật mã giảm giá', life: 3000 });
        console.error('Error updating coupon', error);
      }
    } else {
      this.coupons[index] = this.clonedCoupons[coupon.coupon_Code as string];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ', life: 3000 });
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

  async saveCoupon(): Promise<void> {
    try {
      if(this.couponForm.invalid) return;
      const coupon: CouponDto = this.couponForm.value;
      const response = await firstValueFrom(this.couponService.createCoupon(coupon));
      if (response.isSuccess) {
        if (response.result) {
          this.coupons.push(response.result);
        }
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm mã giảm giá', life: 3000 });
        this.visible = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Không thể thêm mã giảm giá', life: 3000 });
      }
    } catch (error) {
      console.error('Error creating coupon', error);
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Không thể thêm mã giảm giá', life: 3000 });
    }
    this.visible = false;
  }

  unitOptions = [
    { label: '%', value: '%' },
    { label: 'nghìn đồng', value: 'nghìn đồng' }
  ];

}

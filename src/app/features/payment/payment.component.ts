import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CartService } from '../../core/services/cart.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterModule,
  RouterStateSnapshot,
} from '@angular/router';
import { CanDeactivate } from '@angular/router';
import { AddressDto } from '../../core/models/address.model';
import { AddressService } from '../../core/services/address.service';
import { UserDto } from '../../core/models/auth/user-dto.model';
import { TokenStorageService } from '../../core/services/auth/token-storage.service';
import { CouponDto } from '../../core/models/coupon.model';
import { CouponService } from '../../core/services/coupon.service';
import { MessageService } from 'primeng/api'; // Import MessageService
import { ToastModule } from 'primeng/toast';
// npm install sweetalert2
import Swal from 'sweetalert2';
import { OrderService } from '../../core/services/order.service';
import { OrderDto } from '../../core/models/order.model';
import { CartDto } from '../../core/models/cart.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    RouterModule,
    ToastModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  providers: [MessageService],
})
export class PaymentComponent
  implements OnInit, CanDeactivate<PaymentComponent>
{
  paymentMethods = [
    { name: 'Thẻ ATM', icon: '../../../assets/images/payment/credit_card.png' },
    {
      name: 'Thanh toán khi nhận hàng',
      icon: '../../../assets/images/payment/local_atm.png',
    },
    {
      name: 'Ví điện tử Momo',
      icon: '../../../assets/images/payment/logo-momo-png-1.png',
    },
    {
      name: 'Ví điện tử VNPAY',
      icon: '../../../assets/images/payment/vnpay_icon.png',
    },
    {
      name: 'Internet banking',
      icon: '../../../assets/images/payment/account_balance.png',
    },
    {
      name: 'QR Code',
      icon: '../../../assets/images/payment/qr_code_scanner.png',
    },
  ];

  selectedMethodIndex: number = 0; // Chọn mặc định phương thức đầu tiên
  delivery: number = 30000; // Phí vận chuyển
  voucher: number = 0; // Giảm giá

  checkedItems: any[] = [];
  address_book: AddressDto[] = [];
  user: UserDto | null = null;
  selectedAddress: AddressDto | null = null;

  currentCoupon: CouponDto | null = null; // Mã giảm giá hiện tại (chỉ 1 mã)
  couponCode: string = ''; // Mã giảm giá nhập từ input
  errorMessage: string = ''; // Thông báo lỗi (nếu có)
  coupons: CouponDto[] = []; // Danh sách mã giảm giá

  constructor(
    private cartService: CartService,
    private router: Router,
    private addressService: AddressService,
    private tokenStorageService: TokenStorageService,
    private couponService: CouponService,
    private messageService: MessageService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    this.checkedItems = this.cartService.getCheckedItems();
    if (!this.checkedItems || this.checkedItems.length === 0) {
      // Redirect to cart if no checked items
      this.router.navigate(['/cart']);
    }
    console.log('Received checked items:', this.checkedItems);
    this.user = this.tokenStorageService.getUser();
    await this.loadAddress();
    this.selectedAddress = this.getDefaulAddress();
    await this.loadCoupons();
  }

  selectMethod(index: number) {
    this.selectedMethodIndex = index;
  }

  totalAmount_temp() {
    return this.checkedItems.reduce(
      (total, item) =>
        total +
        (item.productVariation.price -
          (item.productVariation.price * item.productVariation.discount) /
            100) *
          item.quantity,
      0
    );
  }

  totalAmount() {
    return this.totalAmount_temp() + this.delivery - this.voucher;
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event) {
    if (this.hasUnsavedChanges()) {
      event.returnValue = true;
      alert('Dữ liệu sẽ mất hết nếu bạn rời đi.');
    }
  }
  hasUnsavedChanges(): boolean {
    // Implement your logic to check for unsaved changes
    return true; // Example return value
  }

  canDeactivate(
    component: PaymentComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const targetUrl = nextState?.url || '';
    console.log('Target URL:', targetUrl);

    const exemptUrls = ['my-orders'];
    const isExempt = exemptUrls.some((url) => targetUrl.includes(url));

    if (!isExempt && component.hasUnsavedChanges()) {
      const confirmLeave = confirm(
        'Phiên thanh toán này sẽ kết thúc nếu bạn rời đi. Bạn có muốn tiếp tục?'
      );
      if (confirmLeave) {
        this.cartService.setCheckedItems([]);
      }
      return confirmLeave;
    }

    return true;
  }

  async loadAddress(): Promise<void> {
    try {
      // Sử dụng firstValueFrom để lấy dữ liệu từ observable
      const data = await firstValueFrom(
        this.addressService.getAddressesByCustomerId(this.user!.id)
      );
      if (data.isSuccess && Array.isArray(data.result)) {
        this.address_book = data.result;
      }
    } catch (error) {
      console.error('Error fetching brands', error);
    }
  }

  getDefaulAddress(): AddressDto | null {
    return this.address_book.find((address) => address.isDefault) || null;
  }

  selectAddress(address: AddressDto) {
    this.selectedAddress = address;
  }

  applyCoupon(): void {
    // Kiểm tra nếu mã giảm giá chưa được nhập
    if (!this.couponCode) {
      this.errorMessage = 'Vui lòng nhập mã giảm giá.';
      return;
    }

    // Tìm mã giảm giá trong danh sách đã load
    const selectedCoupon = this.coupons.find(
      (coupon) => coupon.coupon_Code === this.couponCode
    );

    if (selectedCoupon) {
      const now = new Date(); // Lấy ngày hiện tại

      // Kiểm tra ngày hết hạn
      if (
        selectedCoupon.expirationDate &&
        new Date(selectedCoupon.expirationDate) < now
      ) {
        this.errorMessage = 'Mã giảm giá đã hết hạn.';
        return;
      }

      // Kiểm tra trạng thái mã giảm giá
      if (selectedCoupon.status === false) {
        this.errorMessage = 'Mã giảm giá không hợp lệ.';
        return;
      }

      if (selectedCoupon.discount !== undefined) {
        if (selectedCoupon.unit === '%') {
          this.voucher =
            (this.totalAmount_temp() * selectedCoupon.discount) / 100;
        } else {
          this.voucher = selectedCoupon.discount;
        }
      }

      // Lưu thông tin mã giảm giá và reset lỗi
      this.currentCoupon = selectedCoupon;
      this.errorMessage = '';
    } else {
      // Nếu mã không hợp lệ
      this.errorMessage = 'Mã giảm giá không hợp lệ.';
    }
  }

  // Xóa mã giảm giá
  removeCoupon(): void {
    this.currentCoupon = null; // Xóa mã giảm giá hiện tại
    this.couponCode = ''; // Reset input
    this.errorMessage = '';
    this.voucher = 0;
  }

  async loadCoupons(): Promise<void> {
    try {
      // Sử dụng firstValueFrom để lấy dữ liệu từ observable
      const data = await firstValueFrom(this.couponService.getAllCoupons());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.coupons = data.result;
      }
    } catch (error) {
      console.error('Error fetching brands', error);
    }
  }

  async placeAnOrder(): Promise<void> {
    const result = await Swal.fire({
      title: 'Thanh toán',
      text: 'Bạn có chắc chắn muốn thanh toán đơn hàng này?',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Chấp nhận',
    });

    const newOrder: OrderDto = {
      order_ID: 0,
      customer_ID: this.user?.id,
      coupon_Code: this.currentCoupon?.coupon_Code,
      address:
        this.selectedAddress?.name +
        '#' +
        this.selectedAddress?.phone +
        '#' +
        this.selectedAddress?.addressLine +
        ', ' +
        this.selectedAddress?.ward?.split('#')[1] +
        ', ' +
        this.selectedAddress?.district?.split('#')[1] +
        ', ' +
        this.selectedAddress?.province?.split('#')[1],
      datetime: new Date(),
      discount_amount: this.voucher,
      total: this.totalAmount_temp(),
      formOfPayment: this.paymentMethods[this.selectedMethodIndex].name,
      shipping_Charge: this.delivery,
      orderStatus: 'Chờ xác nhận',
      detailOrders: [],
    };

    this.checkedItems.forEach((item) => {
      newOrder.detailOrders?.push({
        order_ID: 0,
        product_ID: item.productVariation.id,
        quantity: item.quantity,
        unit_Price: item.price,
      });
    });

    console.log('New order:', newOrder);

    if (result.isConfirmed) {
      try {
        this.orderService.createOrder(newOrder).subscribe({
          next: async (response) => {
            for (const item of this.checkedItems) {
              console.log('Deleting item with ID:', item.item_Id);
              await firstValueFrom(this.cartService.deleteCart(item.item_Id));
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công!',
              detail: 'Thanh toán đơn hàng thành công!',
            });
            setTimeout(() => {
              this.router.navigate(['my-orders'], { replaceUrl: true });
            }, 500);
          },
          error: (err) => {
            console.error('Error when canceling order:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại!',
              detail: 'Thanh toán đơn hàng thất bại!',
            });
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}

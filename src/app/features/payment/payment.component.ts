import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CartService } from '../../core/services/cart.service';
import { Observable } from 'rxjs';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CanDeactivate } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent implements OnInit, CanDeactivate<PaymentComponent> {

  paymentMethods = [
    { name: 'Thẻ ATM', icon: '../../../assets/images/payment/credit_card.png' },
    { name: 'Thanh toán khi nhận hàng', icon: '../../../assets/images/payment/local_atm.png' },
    { name: 'Ví điện tử Momo', icon: '../../../assets/images/payment/logo-momo-png-1.png' },
    { name: 'Ví điện tử Zalo Pay', icon: '../../../assets/images/payment/zalo-pay-logo-png-2.png' },
    { name: 'Internet banking', icon: '../../../assets/images/payment/account_balance.png' },
    { name: 'QR Code', icon: '../../../assets/images/payment/qr_code_scanner.png' }
  ];

  selectedMethodIndex: number = 0;  // Chọn mặc định phương thức đầu tiên
  delivery: number = 15000; // Phí vận chuyển
  voucher: number = 0; // Giảm giá

  checkedItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) {}


  ngOnInit() {
    this.checkedItems = this.cartService.getCheckedItems();
    if (!this.checkedItems || this.checkedItems.length === 0) {
      // Redirect to cart if no checked items
      this.router.navigate(['/cart']);
    }
    console.log('Received checked items:', this.checkedItems);
  }


  selectMethod(index: number) {
    this.selectedMethodIndex = index;
  }

  totalAmount_temp() {
    return this.checkedItems.reduce((total, item) => total + (item.productVariation.price - item.productVariation.price * item.productVariation.discount / 100) * item.quantity, 0);
  }

  totalAmount() {
    return this.checkedItems.reduce((total, item) => total + (item.productVariation.price - item.productVariation.price * item.productVariation.discount / 100) * item.quantity, 0) + this.delivery - this.voucher;
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

    const exemptUrls = ['record', 'shop'];
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
}

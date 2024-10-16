import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentMethods = [
    { name: 'Thẻ ATM', icon: '../../../assets/images/payment/credit_card.png' },
    { name: 'Thanh toán khi nhận hàng', icon: '../../../assets/images/payment/local_atm.png' },
    { name: 'Ví điện tử Momo', icon: '../../../assets/images/payment/logo-momo-png-1.png' },
    { name: 'Ví điện tử Zalo Pay', icon: '../../../assets/images/payment/zalo-pay-logo-png-2.png' },
    { name: 'Internet banking', icon: '../../../assets/images/payment/account_balance.png' },
    { name: 'QR Code', icon: '../../../assets/images/payment/qr_code_scanner.png' }
  ];

  selectedMethodIndex: number = 0;  // Chọn mặc định phương thức đầu tiên

  selectMethod(index: number) {
    this.selectedMethodIndex = index;
  }
}

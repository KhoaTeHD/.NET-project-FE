// can-deactivate.guard.ts
import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentComponent } from '../features/payment/payment.component';
import { CartService } from '../core/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<PaymentComponent> {
  constructor(private cartService: CartService) {}

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
}

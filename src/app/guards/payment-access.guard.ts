// payment-access.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartService } from '../core/services/cart.service';// Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class PaymentAccessGuard implements CanActivate {
  
  constructor(private cartService: CartService, private router: Router) {}

  canActivate(): boolean {
    const checkedItems = this.cartService.getCheckedItems();
    if (checkedItems && checkedItems.length > 0) {
      return true;
    } else {
      this.router.navigate(['/cart']);
      return false;
    }
  }
}
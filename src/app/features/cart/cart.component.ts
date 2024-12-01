import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { CartDto, CartDtoExtendStatus } from '../../core/models/cart.model';
import { CartService } from '../../core/services/cart.service';
import { CookieService } from 'ngx-cookie-service'; // Import CookieService
import { TokenStorageService } from '../../core/services/auth/token-storage.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';

import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ToastModule,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService],
})
export class CartComponent implements OnInit {
  cartItems: CartDtoExtendStatus[] = []; // Khởi tạo
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private cookieService: CookieService,
    private tokenStorageService: TokenStorageService,
    protected router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    const userId = this.tokenStorageService.getUser()?.id;
    if (userId) {
      this.cartService.getCartItemsByCusId(userId).subscribe((response) => {
        this.cartItems = response.result || [];
        this.updateTotalPrice();
      });
    }
  }

  toggleAllCheckboxes(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.cartItems.forEach((item) => (item.status = isChecked));
    this.updateTotalPrice();
  }

  updateCheckAllStatus() {
    const checkAll = document.getElementById('checkAll') as HTMLInputElement;
    checkAll.checked = this.cartItems.every((item) => item.status);
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    this.totalPrice = this.cartItems
      .filter((item) => {
        const status = item.status;
        const priceDefined = item.price !== undefined;
        console.log('Item status:', status, 'Price defined:', priceDefined);
        return status && priceDefined;
      })
      .reduce((sum, item) => {
        const price = item.price ?? 0;
        const discount = (item.productVariation?.discount ?? 0) / 100;
        const quantity = item.quantity ?? 0;
        const discountedPrice = price - price * discount;
        const itemTotal = discountedPrice * quantity;
        console.log(
          'Item price:',
          price,
          'Discount:',
          discount,
          'Quantity:',
          quantity,
          'Discounted price:',
          discountedPrice,
          'Item total:',
          itemTotal
        );
        return sum + itemTotal;
      }, 0);
    console.log('Total price:', this.totalPrice); // Log the total price
  }

  updateItemPrice(item: CartDtoExtendStatus, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);
    if (item.price) {
      item.totalPrice = item.price * quantity;
    }
    this.updateTotalPrice();
  }

  decreaseQuantity(item: CartDtoExtendStatus) {
    if (item.quantity !== undefined && item.quantity > 1) {
      item.quantity--;
      this.updateItemPrice(item, {
        target: { value: item.quantity },
      } as unknown as Event);
    }
  }

  increaseQuantity(item: CartDtoExtendStatus) {
    if (
      item.quantity !== undefined &&
      item.productVariation !== undefined &&
      item.productVariation.quantity !== undefined &&
      item.quantity < item.productVariation.quantity
    ) {
      item.quantity++;
      this.updateItemPrice(item, {
        target: { value: item.quantity },
      } as unknown as Event);
    }
  }

  removeItem(item: CartDtoExtendStatus) {
    const userId = this.tokenStorageService.getUser()?.id;
    if (userId) {
      const itemToDelete = {
        item_Id: item.item_Id,
        cus_Id: userId,
        price: item.price,
        quantity: item.quantity,
      };
      console.log('Attempting to delete item:', itemToDelete); // Log the item to delete
      this.cartService.deleteCartByCartDto(itemToDelete).subscribe(
        () => {
          console.log('Item deleted successfully:', itemToDelete); // Log successful deletion
          this.cartItems = this.cartItems.filter(
            (cartItem) => cartItem.item_Id !== item.item_Id
          );
          this.updateTotalPrice();
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting cart item:', error);
          // Provide user feedback here, e.g., show a notification
        }
      );
    } else {
      console.error('User ID not found'); // Log if user ID is not found
    }
  }

  checkout() {
    const checkedItems = this.cartItems.filter((item) => item.status);
    if(checkedItems.length === 0) {
      this.messageService.add({
        severity: 'info',
        summary: 'Thông báo',
        detail: 'Bạn chưa chọn sản phẩm nào để thanh toán!',
      });
      return;
    }
    this.cartService.setCheckedItems(checkedItems);
    console.log('Checked items:', checkedItems);
    console.log('Total price:', this.totalPrice);
    this.router.navigate(['/payment']); // Redirect to payment component
  }
}

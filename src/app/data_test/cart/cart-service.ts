import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../../data_test/cart/cart-interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart;
  private cartSubject: BehaviorSubject<Cart>;

  constructor() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : {
      cus_id: 1001,
      items: null,
      item_quantity: 0,
      total_price: 0,
    };
    this.cartSubject = new BehaviorSubject<Cart>(this.cart);
  }

  getCart() {
    return this.cartSubject.asObservable(); // Trả về observable để các component có thể subscribe
  }

  addItem(itemId: number, price: number) {
    if (!this.cart.items) {
      this.cart.items = [];
    }

    const itemIndex = this.cart.items.findIndex(entry => entry.id === itemId);

    if (itemIndex === -1) {
      this.cart.items.push({ id: itemId, price, quantity: 1 });
    } else {
      this.cart.items[itemIndex].quantity += 1;
    }

    this.cart.item_quantity = this.cart.items.length;
    this.cart.total_price = this.cart.items.reduce((total, entry) => total + (entry.price * entry.quantity), 0);

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart); // Phát thông báo cho các subscriber
  }

  clearCart() {
    this.cart = {
      cus_id: 1001,
      items: null,
      item_quantity: 0,
      total_price: 0,
    };
    localStorage.removeItem('cart');
    this.cartSubject.next(this.cart); // Phát thông báo cho các subscriber
  }
}

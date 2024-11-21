import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../../data_test/cart/cart-interface';
import { Item } from '../item/item-interface';
import { Item_v2 } from '../item/item-interface';
import { Cart_v2 } from '../../data_test/cart/cart-interface';
import { CARTS } from './cart-data';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  /*
  private cart: Cart;
  private cartSubject: BehaviorSubject<Cart>;

  constructor() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart
      ? JSON.parse(storedCart)
      : {
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

  addItem2(item: Item, price: number) {
    if (!this.cart.items) {
      this.cart.items = [];
    }

    const itemIndex = this.cart.items.findIndex(
      (entry) => entry.item.id === item.id
    );

    if (itemIndex === -1) {
      this.cart.items.push({ item: item, price, quantity: 1 });
    } else {
      this.cart.items[itemIndex].quantity += 1;
    }

    this.cart.item_quantity = this.cart.items.length;
    this.cart.total_price = this.cart.items.reduce(
      (total, entry) => total + entry.price * entry.quantity,
      0
    );

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
*/
  /**---------------------------------------v2----------------------------------------------- */

  private cart_v2: Cart_v2[] = CARTS;

  getCart() {
    return this.cart_v2;
  }
  addItem_v3(item_v2: Item_v2) {
    //kiểm tra trong cart_v2 đã có item này chưa
    // nếu có rồi thì tăng số lượng lên 1
    // nếu chưa thì thêm vào cart_v2
    //update item vào cơ sở dữ liệu
  }
}

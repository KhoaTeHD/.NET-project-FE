import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Item } from '../../../data_test/item/item-interface';
import { ITEMS } from '../../../data_test/item/item-data';
import { CartService } from '../../../data_test/cart/cart-service'; // Nhập CartService
import { Cart } from '../../../data_test/cart/cart-interface'; // Nhập interface Cart

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  items: Item[] = ITEMS;
  cart: Cart = { cus_id: 1001, items: null, item_quantity: 0, total_price: 0 }; // Khởi tạo với giá trị mặc định

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribe để nhận thông báo về sự thay đổi giỏ hàng
    // this.cartService.getCart().subscribe(updatedCart => {
    //   this.cart = updatedCart; // Cập nhật dữ liệu giỏ hàng
    // });
  }
}

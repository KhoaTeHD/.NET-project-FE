import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Item } from '../../../data_test/item/item-interface';
import { ITEMS } from '../../../data_test/item/item-data';

@Component({
  selector: 'app-special-item-shop',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './special-item-shop.component.html',
  styleUrl: './special-item-shop.component.css'
})
export class SpecialItemShopComponent implements OnInit{
  items: Item[] = ITEMS;
  ngOnInit() {
  }
  constructor(private messageService: MessageService) {
  }
  handleCartBtnClicked() {
    //console.log(item);
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm sản phẩm vào giỏ hàng!' });
  }
}

//TEST HIỂN THỊ NGAY SAU KHI NHẤN THÊM VÀO GIỎ HÀNG

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';
// import { Item } from '../../../data_test/item/item-interface';
// import { ITEMS } from '../../../data_test/item/item-data';
// import { CartService } from '../../../data_test/cart/cart-service'; // Nhập CartService
// import { Cart } from '../../../data_test/cart/cart-interface'; // Nhập interface Cart

// @Component({
//   selector: 'app-special-item-shop',
//   standalone: true,
//   imports: [CommonModule, ToastModule],
//   providers: [MessageService],
//   templateUrl: './special-item-shop.component.html',
//   styleUrls: ['./special-item-shop.component.css'] // Sửa lại đây nếu cần
// })
// export class SpecialItemShopComponent implements OnInit {
//   items: Item[] = ITEMS;
//   cart: Cart = { cus_id: 1001, items: null, item_quantity: 0, total_price: 0 }; // Khởi tạo với giá trị mặc định

//   constructor(private messageService: MessageService, private cartService: CartService) { }

//   ngOnInit() {
//     // Subscribe để nhận thông báo về sự thay đổi giỏ hàng
//     this.cartService.getCart().subscribe(updatedCart => {
//       this.cart = updatedCart; // Cập nhật dữ liệu giỏ hàng
//     });
//   }

//   handleCartBtnClicked() {
//     this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm sản phẩm vào giỏ hàng!' });
//   }
// }

//TEST HIỂN THỊ NGAY SAU KHI NHẤN THÊM VÀO GIỎ HÀNG

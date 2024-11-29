import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Item } from '../../../data_test/item/item-interface';
import { ITEMS } from '../../../data_test/item/item-data';
import { CartService } from '../../../data_test/cart/cart-service'; // Nhập CartService
import { Cart } from '../../../data_test/cart/cart-interface'; // Nhập interface Cart
import { TokenStorageService } from '../../../core/services/auth/token-storage.service';
import { UserDto } from '../../../core/models/auth/user-dto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  items: Item[] = ITEMS;
  cart: Cart = { cus_id: 1001, items: null, item_quantity: 0, total_price: 0 }; // Khởi tạo với giá trị mặc định
  user: UserDto | null = null;
  searchQuery: string = '';
  constructor(
    private cartService: CartService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe để nhận thông báo về sự thay đổi giỏ hàng
    // this.cartService.getCart().subscribe(updatedCart => {
    //   this.cart = updatedCart; // Cập nhật dữ liệu giỏ hàng
    // });
    this.user = this.tokenStorageService.getUser();
  }

  logout(): void {
    this.tokenStorageService.clearToken();
    this.tokenStorageService.deleteUser();
    this.user = null;
  }

  onSearch(): void {
    this.router.navigate(['/shop'], {
      queryParams: { search: this.searchQuery },
    });
  }
}

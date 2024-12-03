import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Item } from '../../../data_test/item/item-interface';
import { ITEMS } from '../../../data_test/item/item-data';
import { Cart } from '../../../data_test/cart/cart-interface'; // Nhập interface Cart
import { TokenStorageService } from '../../../core/services/auth/token-storage.service';
import { UserDto } from '../../../core/models/auth/user-dto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { CartDtoExtendStatus } from '../../../core/models/cart.model';
import { CategoryDto } from '../../../core/models/category.model';
import { CategoryService } from '../../../core/services/category.service';
import { ShareUserDtoService } from '../../../core/services/shared/data/share_userDto.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  cartItems: CartDtoExtendStatus[] = []; // Khởi tạo
  categories: CategoryDto[] = [];

  user: UserDto | null = null;
  searchQuery: string = '';
  constructor(
    private cartService: CartService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private categoryService: CategoryService,
    private shareUserDtoService: ShareUserDtoService
  ) {}

  ngOnInit() {
    // Subscribe để nhận thông báo về sự thay đổi giỏ hàng
    // this.cartService.getCart().subscribe(updatedCart => {
    //   this.cart = updatedCart; // Cập nhật dữ liệu giỏ hàng
    // });
    this.user = this.tokenStorageService.getUser();

    this.categoryService.getAllCategorys().subscribe((response) => {
      this.categories = response.result || [];
    });

    const userId = this.tokenStorageService.getUser()?.id;
    if (userId) {
      this.cartService.getCartItemsByCusId(userId).subscribe((response) => {
        this.cartItems = response.result || [];
      });
    }

    this.shareUserDtoService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  logout(): void {
    this.tokenStorageService.clearToken();
    this.tokenStorageService.deleteUser();
    this.user = null;
    this.router.navigate(['/']);
  }

  onSearch(): void {
    this.router.navigate(['/shop'], {
      queryParams: { search: this.searchQuery },
    });
  }

  checkUser(): void {
    if (this.user == null) {
      const confirmation = window.confirm(
        'Vui lòng đăng nhập để truy cập giỏ hàng!'
      );
      if (confirmation) {
        window.location.href = 'http://localhost:4200/sign-in';
      } else {
        return;
      }
    } else {
      this.router.navigate(['/cart']);
    }
  }
}

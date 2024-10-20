import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../data_test/cart/cart-service';
import { Cart } from '../../data_test/cart/cart-interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = { cus_id: 1001, items: null, item_quantity: 0, total_price: 0 }; // Khởi tạo 

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(updatedCart => {
      this.cart = updatedCart; 
    });
  }
}

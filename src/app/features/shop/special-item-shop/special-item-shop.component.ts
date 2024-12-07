import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Item } from '../../../data_test/item/item-interface';
import { ITEMS } from '../../../data_test/item/item-data';
import { ProductDto } from '../../../core/models/product.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-special-item-shop',
  standalone: true,
  imports: [CommonModule, ToastModule, RouterModule],
  providers: [MessageService],
  templateUrl: './special-item-shop.component.html',
  styleUrl: './special-item-shop.component.css',
})
export class SpecialItemShopComponent implements OnInit {
  items: Item[] = ITEMS;
  products$: Observable<ProductDto[]> = new BehaviorSubject<ProductDto[]>([]); // Dữ liệu hiển thị sản phẩm
  product: ProductDto | null = null;

  constructor(
    private messageService: MessageService,
    private productService: ProductService
  ) {}
  ngOnInit() {
    this.fetchProducts();
    console.log(this.products$);
  }

  fetchProducts(): void {
    this.productService
      .getAllProductsWithStatusTrue()
      .subscribe(response => {
        if (response && response.result) {
          const products = response.result;
          const sortedProducts = products.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
          let latestProduct = null;
          for (let i = 0; i < sortedProducts.length; i++) {
            if (sortedProducts[i].productVariations?.length === 0) {
              latestProduct = sortedProducts[i+1];
              break;
            }
          }
          console.log(latestProduct);
          this.product = latestProduct;
        }
      });
  }


  handleCartBtnClicked() {
    //console.log(item);
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đã thêm sản phẩm vào giỏ hàng!',
    });
  }
}


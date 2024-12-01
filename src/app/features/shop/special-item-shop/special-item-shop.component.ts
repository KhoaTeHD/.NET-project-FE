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
    this.fetchProduct(2);
    console.log(this.products$);
  }

  private fetchProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.product = response.result || null; // Cập nhật dữ liệu sản phẩm
        console.log(this.product);
      },
      error: (err) => {
        console.error(err);
      },
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


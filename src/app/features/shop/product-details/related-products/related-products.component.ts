import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductDto } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule, ToastModule, RouterModule],
  providers: [MessageService],
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css'],
})
export class RelatedProductsComponent implements OnInit {
  products$: Observable<ProductDto[]> = new BehaviorSubject<ProductDto[]>([]); // Dữ liệu hiển thị sản phẩm
  loading = true; // Trạng thái tải dữ liệu
  error: string | null = null; // Trạng thái lỗi
  products: ProductDto[] = []; // Dữ liệu tất cả sản phẩm
  filteredProducts: ProductDto[] = []; // Dữ liệu sản phẩm đã lọc
  categories: any[] = []; // Danh mục
  brands: any[] = []; // Thương hiệu
  colors: any[] = []; // Màu sắc
  sizes: any[] = []; // Kích thước

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  private fetchProducts(): void {
    this.products$ = this.productService.getAllProducts().pipe(
      map((response) => response.result ?? []) // Assuming 'data' is the property containing the array of products
    ); // Gọi API lấy sản phẩm từ service
    this.products$.subscribe({
      next: () => (this.loading = false),
      error: (err) => {
        this.error = 'Không thể tải danh sách sản phẩm.';
        this.loading = false;
        console.error(err);
      },
    });
  }
}

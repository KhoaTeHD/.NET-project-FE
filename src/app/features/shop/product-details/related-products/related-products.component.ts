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
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.fetchProductById(Number(productId));
      }
    });
  }

  private fetchProductById(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        if (product && product.result && product.result.cat_Id) {
          this.fetchRelatedProducts(product.result.cat_Id);
        }
      },
      error: (err) => {
        this.error = 'Không thể tải thông tin sản phẩm.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  private fetchRelatedProducts(catId: number): void {
    this.products$ = this.productService.getAllProducts().pipe(
      map((response) => response.result ?? []),
      map((products) => products.filter((product) => product.cat_Id === catId).slice(0, 8))
    );
    this.products$.subscribe({
      next: () => (this.loading = false),
      error: (err) => {
        this.error = 'Không thể tải danh sách sản phẩm liên quan.';
        this.loading = false;
        console.error(err);
      },
    });
  }
}

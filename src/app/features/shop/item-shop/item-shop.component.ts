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
import { ProductDto } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-item-shop',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule,
  ],
  providers: [MessageService],
  templateUrl: './item-shop.component.html',
  styleUrl: './item-shop.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ItemShopComponent implements OnInit {
  products$: Observable<ProductDto[]> = new BehaviorSubject<ProductDto[]>([]); // Dữ liệu hiển thị sản phẩm
  loading = true; // Trạng thái tải dữ liệu
  error: string | null = null; // Trạng thái lỗi
  page: number = 1;
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
    // this.fetchProducts(); // Lấy danh sách sản phẩm khi khởi tạo component
    this.route.queryParams.subscribe((params) => {
      // Lấy số trang từ URL (nếu không có thì mặc định là 1)
      this.page = +params['page'] || 1;

      if (
        params['price'] !== undefined ||
        params['bra_Id'] !== undefined ||
        params['cat_Id'] !== undefined ||
        params['col_Id'] !== undefined ||
        params['siz_Id'] !== undefined
      ) {
        console.log('đang có bộ lọc');
      }

      this.fetchProducts();
      this.productService.getAllProducts().subscribe((response) => {
        this.products = response.result || [];
        console.log(this.products);
        this.filteredProducts = [...this.products]; // Sao chép tất cả sản phẩm để lọc sau
        this.loadFilters();
      });
    });
  }

  private fetchProducts(): void {
    this.products$ = this.productService.getAllProducts_cache(this.page).pipe(
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

  onPageChange(page: number): void {
    this.page = page;
    // Cập nhật URL với số trang mới
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge', // Giữ các query params khác nếu có
    });
    window.scrollTo(0, 0);
  }

  loadFilters(): void {
    this.categories = this.getUniqueCategories(this.products);
    this.brands = this.getUniqueBrands(this.products);
    this.colors = this.getUniqueColors(this.products);
    this.sizes = this.getUniqueSizes(this.products);
  }

  getUniqueCategories(products: ProductDto[]): any[] {
    return Array.from(new Set(products.map((product) => product.cat_Id))).map(
      (id) => ({
        id,
        name: `Category ${id}`,
      })
    );
  }

  getUniqueBrands(products: ProductDto[]): any[] {
    return Array.from(new Set(products.map((product) => product.bra_Id))).map(
      (id) => ({
        id,
        name: `Brand ${id}`,
      })
    );
  }

  getUniqueColors(products: ProductDto[]): any[] {
    const colors = new Set<number>();
    products.forEach((product) => {
      product.productVariations?.forEach((variation) => {
        if (variation.col_Id !== undefined) {
          colors.add(variation.col_Id);
        }
      });
    });
    return Array.from(colors).map((id) => ({
      id,
      name: `Color ${id}`,
    }));
  }

  getUniqueSizes(products: ProductDto[]): any[] {
    const sizes = new Set<number>();
    products.forEach((product) => {
      product.productVariations?.forEach((variation) => {
        if (variation.siz_Id !== undefined) {
          sizes.add(variation.siz_Id);
        }
      });
    });
    return Array.from(sizes).map((id) => ({
      id,
      name: `Size ${id}`,
    }));
  }

  // Hàm xử lý tìm kiếm với các filter
  onSearch(filters: any): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = filters.cat_Id
        ? product.cat_Id === +filters.cat_Id
        : true;
      const matchesBrand = filters.bra_Id
        ? product.bra_Id === +filters.bra_Id
        : true;
      const matchesColor = filters.col_Id
        ? product.productVariations?.some((v) => v.col_Id === +filters.col_Id)
        : true;
      const matchesSize = filters.siz_Id
        ? product.productVariations?.some((v) => v.siz_Id === +filters.siz_Id)
        : true;
      const matchesPrice = filters.price
        ? product.productVariations?.some(
            (v) => v.price && v.price <= +filters.price
          )
        : true;

      return (
        matchesCategory &&
        matchesBrand &&
        matchesColor &&
        matchesSize &&
        matchesPrice
      );
    });
  }
}

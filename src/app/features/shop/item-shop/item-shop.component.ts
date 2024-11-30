/**
 * this.search.emit(this.filters) (cái nì ở file sidebar-shop):
 * Dòng này phát ra một sự kiện search với dữ liệu là this.filters.
 * Điều này có nghĩa là khi phương thức onSearch được gọi, nó sẽ kích hoạt
 *  sự kiện search và truyền this.filters (các bộ lọc hiện tại) cho bất
 * kỳ thành phần nào đang lắng nghe sự kiện này.
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Input,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductDto } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
interface Filters {
  [key: string]: any;
  cat_Id: any;
  bra_Id: any;
  col_Id: any;
  siz_Id: any;
  price: any;
  nat_Id: any;
  sup_Id: any;
}
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
export class ItemShopComponent implements OnInit, OnDestroy {
  @Input() filters!: any;
  private routeSub!: Subscription;
  // `products$` là một Observable, được khởi tạo từ BehaviorSubject.
  // Observable này cho phép các thành phần khác đăng ký lắng nghe và nhận thông báo mỗi khi danh sách sản phẩm thay đổi.
  products$: Observable<ProductDto[]> = new BehaviorSubject<ProductDto[]>([]);
  loading = true; // Trạng thái tải dữ liệu
  error: string | null = null; // Trạng thái lỗi
  page: number = 1; // Số trang hiện tại
  // `products` là một mảng thông thường, được khởi tạo với giá trị rỗng.
  // Mảng này chỉ lưu trữ dữ liệu sản phẩm và không có khả năng thông báo cho các thành phần khác khi dữ liệu thay đổi.
  products: ProductDto[] = [];
  filteredProducts: ProductDto[] = []; // Dữ liệu sản phẩm đã lọc
  categories: any[] = []; // Danh mục
  brands: any[] = []; // Thương hiệu
  colors: any[] = []; // Màu sắc
  sizes: any[] = []; // Kích thước
  displayedProducts!: ProductDto[];
  sort: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.fetchProducts(); // Lấy danh sách sản phẩm khi khởi tạo component
    this.routeSub = this.route.queryParams.subscribe((params) => {
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
      this.filters = params;
      this.applyFilters(this.filters);
    });
    this.fetchProducts();
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
  /**
   * 
   * ngOnChanges: Là một lifecycle hook được gọi khi bất kỳ thuộc tính đầu vào nào thay đổi.
  changes: Là một đối tượng kiểu SimpleChanges chứa giá trị hiện tại và trước đó của các thuộc tính đã thay đổi.
  if (changes['filters']): Kiểm tra xem thuộc tính filters có thay đổi hay không.
  this.applyFilters(changes['filters'].currentValue): Gọi phương thức applyFilters với giá trị mới của filters.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      this.applyFilters(changes['filters'].currentValue);
    }
  }

  applyFilters(filters: any): void {
    console.log('Current filters:', filters);

    if (filters.sort) {
      this.sort = filters.sort;
      console.log('Sort:', this.sort);
    }

    if (
      filters.search &&
      !filters.col_Id &&
      !filters.bra_Id &&
      !filters.siz_Id &&
      !filters.cat_Id &&
      !filters.price
    ) {
      const searchQuery = filters.search.toLowerCase();
      const filteredProducts = this.products.filter(
        (product) =>
          product.name && product.name.toLowerCase().includes(searchQuery)
      );
      this.displayedProducts = filteredProducts;
      console.log('Filtered products by search:', filteredProducts);
      return;
    }

    const priceRange = filters.price
      ? filters.price.split(',').map(Number)
      : [0, Infinity];
    const colIds = filters.col_Id ? filters.col_Id.split(',').map(Number) : [];
    const braIds = filters.bra_Id ? filters.bra_Id.split(',').map(Number) : [];
    const sizIds = filters.siz_Id ? filters.siz_Id.split(',').map(Number) : [];
    const catIds = filters.cat_Id ? filters.cat_Id.split(',').map(Number) : [];

    const filteredProducts = this.products.filter((product) => {
      const isCatMatch = catIds.length === 0 || catIds.includes(product.cat_Id);
      const isBraMatch = braIds.length === 0 || braIds.includes(product.bra_Id);
      const isVariationMatch = product.productVariations?.some((variation) => {
        const isColMatch =
          colIds.length === 0 || colIds.includes(variation.col_Id);
        const isSizMatch =
          sizIds.length === 0 || sizIds.includes(variation.siz_Id);
        const isPriceMatch =
          variation.price !== undefined &&
          variation.price >= priceRange[0] &&
          variation.price <= priceRange[1];
        return isColMatch && isSizMatch && isPriceMatch;
      });
      return isCatMatch && isBraMatch && isVariationMatch;
    });

    console.log('Filtered products:', filteredProducts);
    // Update the displayed products with the filteredProducts
    this.displayedProducts = filteredProducts;
    console.log('Displayed products:', this.displayedProducts);
  }

  private fetchProducts(): void {
    // Hàm lấy dữ liệu sản phẩm từ service
    this.products$ = this.productService.getAllProducts_cache(this.page).pipe(
      map((response) => response.result ?? []) // Assuming 'data' is the property containing the array of products
    ); // Gọi API lấy sản phẩm từ service
    this.products$.subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Không thể tải danh sách sản phẩm.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  onPageChange(page: number): void {
    // Hàm xử lý khi thay đổi trang
    this.page = page;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge', // Giữ các query params khác nếu có
    });
    window.scrollTo(0, 0);
  }

  loadFilters(): void {
    // Hàm tải các bộ lọc từ dữ liệu sản phẩm
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

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
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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

  // Observable quản lý sản phẩm
  private productsSubject = new BehaviorSubject<ProductDto[]>([]);
  products$ = this.productsSubject.asObservable();

  private filterSubject = new Subject<any>(); // Quản lý bộ lọc
  private routeSub!: Subscription;

  loading = true; // Trạng thái tải dữ liệu
  error: string | null = null; // Lỗi nếu xảy ra
  page = 1; // Trang hiện tại
  products: ProductDto[] = []; // Danh sách sản phẩm gốc
  displayedProducts: ProductDto[] = []; // Sản phẩm hiển thị
  sort: string | undefined;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    // Lắng nghe queryParams để cập nhật filters
    this.routeSub = this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1;
      this.filters = params;
      this.filterSubject.next(this.filters);
      console.log(this.displayedProducts);
      this.applySort(this.filters.sort);
    });

    // Lắng nghe thay đổi bộ lọc và áp dụng
    this.filterSubject.pipe(debounceTime(300)).subscribe((filters) => {
      this.applyFilters(filters);
      this.applySort(this.filters.sort);
      if (this.displayedProducts.length < 9) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: 1 },
          queryParamsHandling: 'merge',
        });
      }
    });

    // Lấy sản phẩm khi khởi tạo
    this.fetchProducts();
  }

  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

  fetchProducts(): void {
    this.productService
      .getAllProducts_cache(this.page)
      .pipe(map((response) => response.result ?? []))
      .subscribe({
        next: (products) => {
          this.products = products.filter((product) => product.status === true);
          this.productsSubject.next(products); // Cập nhật BehaviorSubject
          this.loading = false;
          this.applyFilters(this.filters); // Lọc ngay sau khi tải xong
        },
        error: (err) => {
          this.error = 'Không thể tải danh sách sản phẩm.';
          this.loading = false;
          console.error(err);
        },
      });
  }

  applySort(sort: string): void {
    if (!sort || sort === '-1') {
      return; // Nếu không có sắp xếp hoặc sắp xếp là -1, không làm gì
    }

    // Sắp xếp theo giá giảm dần
    if (sort === '1') {
      this.displayedProducts.sort((a, b) => {
        const aPrice = a.productVariations?.[0]?.price ?? 0;
        const bPrice = b.productVariations?.[0]?.price ?? 0;
        return bPrice - aPrice; // Giảm dần theo giá
      });
    }
    // Sắp xếp theo giá tăng dần
    else if (sort === '2') {
      this.displayedProducts.sort((a, b) => {
        const aPrice = a.productVariations?.[0]?.price ?? 0;
        const bPrice = b.productVariations?.[0]?.price ?? 0;
        return aPrice - bPrice; // Tăng dần theo giá
      });
    }
  }

  applyFilters(filters: any): void {
    if (!filters) return;

    const searchQuery = filters.search ? filters.search.toLowerCase() : '';
    const priceRange = filters.price
      ? filters.price.split(',').map(Number)
      : [0, Infinity];
    const colIds = filters.col_Id ? filters.col_Id.split(',').map(Number) : [];
    const braIds = filters.bra_Id ? filters.bra_Id.split(',').map(Number) : [];
    const sizIds = filters.siz_Id ? filters.siz_Id.split(',').map(Number) : [];
    const catIds = filters.cat_Id ? filters.cat_Id.split(',').map(Number) : [];


    this.displayedProducts = this.products.filter((product) => {
      const isNameMatch =
        !searchQuery || product.name?.toLowerCase().includes(searchQuery);
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

      return isNameMatch && isCatMatch && isBraMatch && isVariationMatch;
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
    });
    window.scrollTo(0, 0);
  }

  trackByProductId(index: number, product: ProductDto): number {
    return product.id ?? 0; // Sử dụng ID duy nhất của sản phẩm
  }
}

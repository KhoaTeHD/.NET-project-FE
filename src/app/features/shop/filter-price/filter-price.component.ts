import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/share.service';
import { FormsModule } from '@angular/forms';
interface FilterPrice {
  name: string;
  value: number;
}

@Component({
  selector: 'app-filter-price',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-price.component.html',
  styleUrls: ['./filter-price.component.css'],
})
export class FilterPriceComponent implements OnInit {
  filterprice: FilterPrice[] = [
    { name: 'Giá từ cao đến thấp', value: 1 },
    { name: 'Giá từ thấp đến cao', value: 2 },
  ];

  selectedColors: string[] = [];
  selectedCategory: string = '';
  isfilterColSizeNatPrice: boolean = false;
  query: string = '';
  selectedSort: number = -1; // Default value

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shareService: SharedService
  ) {}

  ngOnInit() {
    // Theo dõi các tham số query trong URL
    this.route.queryParams.subscribe((params) => {
      if (
        params['price'] !== undefined ||
        params['bra_Id'] !== undefined ||
        params['cat_Id'] !== undefined ||
        params['col_Id'] !== undefined ||
        params['siz_Id'] !== undefined
      ) {
        console.log('đang có bộ lọc- nhìn từ filer-price');
        this.isfilterColSizeNatPrice = true;
      }
      if (params['search']) {
        console.log(params['search']);
        this.isfilterColSizeNatPrice = false;
        this.query = params['search'];
      }
      if (params['sort']) {
        const sort = params['sort'];
        this.selectedSort = sort ? +sort : -1;
        console.log(this.selectedSort);
      } else {
        this.selectedSort = -1; // Default value
      }
    });
  }

  get filtersDisplay(): string {
    // Tạo chuỗi hiển thị dựa trên các bộ lọc đã chọn
    const colorDisplay =
      this.selectedColors.length > 0
        ? `Màu sắc: ${this.selectedColors.join(', ')}`
        : '';
    const categoryDisplay = this.selectedCategory
      ? `- Danh mục: ${this.selectedCategory}`
      : '';

    return `${colorDisplay} ${categoryDisplay}`;
  }

  clearFilters() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        price: null,
        bra_Id: null,
        cat_Id: null,
        col_Id: null,
        siz_Id: null,
      },
      queryParamsHandling: 'merge', // Sử dụng 'merge' để giữ lại các query params khác không bị thay đổi
    });
    this.isfilterColSizeNatPrice = false;
  }

  clearColorFilter(color: string) {
    // Xoá màu trong mảng selectedColors
    this.selectedColors = this.selectedColors.filter((c) => c !== color);

    this.router.navigate([], {
      queryParams: { color: this.selectedColors.join(' ') },
      queryParamsHandling: 'merge',
    });
  }

  clearSelectFilter() {
    this.selectedCategory = '';

    // Cập nhật URL
    this.router.navigate([], {
      queryParams: { select: null },
      queryParamsHandling: 'merge',
    });
  }
  onFilterPriceChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedPriceId = +selectElement.value;
    console.log(selectedPriceId);
    this.shareService.setFilerPriceId(selectedPriceId);

    // Update the URL with the new price filter value
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: selectedPriceId },
      queryParamsHandling: 'merge',
    });
  }
}

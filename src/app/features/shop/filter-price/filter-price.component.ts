import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

interface FilterPrice {
  name: string;
}

@Component({
  selector: 'app-filter-price',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-price.component.html',
  styleUrls: ['./filter-price.component.css'],
})
export class FilterPriceComponent implements OnInit {
  filterprice: FilterPrice[] = [
    { name: 'Mặc định' },
    { name: 'Giá từ cao đến thấp' },
    { name: 'Giá từ thấp đến cao' },
  ];

  selectedColors: string[] = [];
  selectedCategory: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Theo dõi các tham số query trong URL
    this.route.queryParams.subscribe((params) => {
      this.selectedColors = params['color'] ? params['color'].split(' ') : [];
      this.selectedCategory = params['select'] || '';
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
    // Reset giá trị filter về mặc định
    this.selectedColors = [];
    this.selectedCategory = '';

    // Cập nhật URL
    this.router.navigate([], {
      queryParams: { color: null, select: null },
      queryParamsHandling: 'merge',
    });
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
}

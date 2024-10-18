import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface Item {
  id: number;
  name: String;
  price: number;
  pricesale: number;
  type: String;
}


@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent implements OnInit {
  constructor(private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const page = +params['page'];
      if (page) {
        this.currentPage = page;
        this.updatePage();
      }
    });
  }

  navigateToProductDetail(productId: string) {
    this.router.navigate(['/shop/product/details/', productId]); // Điều hướng đến trang chi tiết sản phẩm
    window.scrollTo(0, 0);
  }

  handleCartBtnClicked(item: Item) {
    console.log(item);
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm sản phẩm ' +item.name+ ' vào giỏ hàng!' });
  }

  items: Item[] = [
    {
      id: 1,
      name: "Quần thun Lavi",
      price: 120000,
      pricesale: 10,
      type: 'Thời trang'
    },
    {
      id: 2,
      name: "Áo Tanjiro Cosplay",
      price: 300000,
      pricesale: 12,
      type: 'Thời trang'
    },
    {
      id: 3,
      name: "Áo Hokage",
      price: 120000,
      pricesale: 15,
      type: 'Thời trang'
    },
    {
      id: 4,
      name: "Balo J97",
      price: 120000,
      pricesale: 20,
      type: 'Thời trang'
    },
    {
      id: 5,
      name: "Áo khoác Mitsuri",
      price: 120000,
      pricesale: 20,
      type: 'Thời trang'
    },
    { id: 6, name: 'Item 6', price: 1600, pricesale: 15, type: 'Trang sức' },
    { id: 7, name: 'Item 7', price: 1700, pricesale: 10, type: 'Trang sức' },
    { id: 8, name: 'Item 8', price: 1800, pricesale: 20, type: 'Trang sức' },
    { id: 9, name: 'Item 9', price: 1900, pricesale: 25, type: 'Trang sức' },
    { id: 10, name: 'Item 10', price: 2000, pricesale: 30, type: 'Trang sức' },
    { id: 11, name: 'Item 11', price: 2100, pricesale: 35, type: 'Trang sức' },
    { id: 12, name: 'Item 12', price: 2200, pricesale: 5, type: 'Trang sức' },
    { id: 13, name: 'Item 13', price: 2300, pricesale: 15, type: 'Trang sức' },
    { id: 14, name: 'Item 14', price: 2400, pricesale: 10, type: 'Trang sức' },
    { id: 15, name: 'Item 15', price: 2500, pricesale: 25, type: 'Trang sức' },
    { id: 16, name: 'Item 16', price: 2600, pricesale: 20, type: 'Trang sức' },
    { id: 17, name: 'Item 17', price: 2700, pricesale: 30, type: 'Trang sức' },
    { id: 18, name: 'Item 18', price: 2800, pricesale: 35, type: 'Trang sức' },
    { id: 19, name: 'Item 19', price: 2900, pricesale: 40, type: 'Trang sức' },
    { id: 20, name: 'Item 20', price: 3000, pricesale: 50, type: 'Trang sức' },
  ];

  currentPage: number = 1;
  itemsPerPage: number = 6;
  pagedItems: any[] = [];

  ngOnInit() {
    this.updatePage();
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedItems = this.items.slice(start, end);

    // Tính toán số lượng item trống cần thêm
    const itemsToAdd = this.itemsPerPage - this.pagedItems.length;
    for (let i = 0; i < itemsToAdd; i++) {
      this.pagedItems.push({ isPlaceholder: true });
    }

    // Cuộn đến phần tử đầu tiên của trang
    setTimeout(() => {
      const firstItemElement = document.querySelector('.item-container');
      if (firstItemElement) {
        firstItemElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);

  }

  goToPage(currentPage: number): void {
    if (currentPage >= 1 && currentPage <= this.items.length) {
      this.currentPage = currentPage;
      this.router.navigate([], {
        queryParams: { page: currentPage },
        queryParamsHandling: 'merge' // Giữ lại các tham số khác trong URL
      });
      this.updatePage(); // Gọi hàm để tải dữ liệu cho trang
    }
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.items.length / this.itemsPerPage)) {
        this.goToPage(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Item {
  id: number;
  name: String;
  price: number;
  pricesale: number;
}

@Component({
  selector: 'app-item-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-shop.component.html',
  styleUrl: './item-shop.component.css'
})

export class ItemShopComponent implements OnInit {

  constructor(private router: Router) {}

  navigateToProductDetail(productId: string) {
    this.router.navigate(['/shop/product/details/', productId]); // Điều hướng đến trang chi tiết sản phẩm
    window.scrollTo(0, 0);
  }

  items: Item[] = [
    {
      id: 1,
      name: "Quần thun Lavi",
      price: 120000,
      pricesale: 10
    },
    {
      id: 2,
      name: "Áo Tanjiro Cosplay",
      price: 300000,
      pricesale: 12
    },
    {
      id: 3,
      name: "Áo Hokage",
      price: 120000,
      pricesale: 15
    },
    {
      id: 4,
      name: "Balo J97",
      price: 120000,
      pricesale: 20
    },
    {
      id: 5,
      name: "Áo khoác Mitsuri",
      price: 120000,
      pricesale: 20
    },
    { id: 6, name: 'Item 6', price: 1600, pricesale: 15 },
    { id: 7, name: 'Item 7', price: 1700, pricesale: 10 },
    { id: 8, name: 'Item 8', price: 1800, pricesale: 20 },
    { id: 9, name: 'Item 9', price: 1900, pricesale: 25 },
    { id: 10, name: 'Item 10', price: 2000, pricesale: 30 },
    { id: 11, name: 'Item 11', price: 2100, pricesale: 35 },
    { id: 12, name: 'Item 12', price: 2200, pricesale: 5 },
    { id: 13, name: 'Item 13', price: 2300, pricesale: 15 },
    { id: 14, name: 'Item 14', price: 2400, pricesale: 10 },
    { id: 15, name: 'Item 15', price: 2500, pricesale: 25 },
    { id: 16, name: 'Item 16', price: 2600, pricesale: 20 },
    { id: 17, name: 'Item 17', price: 2700, pricesale: 30 },
    { id: 18, name: 'Item 18', price: 2800, pricesale: 35 },
    { id: 19, name: 'Item 19', price: 2900, pricesale: 40 },
    { id: 20, name: 'Item 20', price: 3000, pricesale: 50 }
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

  nextPage() {
    if (this.currentPage < Math.ceil(this.items.length / this.itemsPerPage)) {
      this.currentPage++;
      this.updatePage();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

}

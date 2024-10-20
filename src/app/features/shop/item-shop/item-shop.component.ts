
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Item } from '../../../data_test/item/item-interface';
import { ITEMS } from '../../../data_test/item/item-data';

@Component({
  selector: 'app-item-shop',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './item-shop.component.html',
  styleUrl: './item-shop.component.css'
})
export class ItemShopComponent implements OnInit {

  constructor(private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const page = +params['page'];
      if (page) {
        this.currentPage = page;
        this.updatePage();
      }
    });
  }

  navigateToProductDetail(productId: number) {
    //this.router.navigate(['/shop/product/details/', productId]); // Điều hướng đến trang chi tiết sản phẩm
    window.location.href = `/shop/product/details/${productId}`;
  }

  handleCartBtnClicked(item: Item) {
    console.log(item);
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm sản phẩm ' + item.name + ' vào giỏ hàng!' });
  }

  items: Item[] = ITEMS;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  pagedItems: any[] = [];

  ngOnInit() {
    this.updatePage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedItems = this.items.slice(start, end);

    const itemsToAdd = this.itemsPerPage - this.pagedItems.length;
    for (let i = 0; i < itemsToAdd; i++) {
      this.pagedItems.push({ isPlaceholder: true });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToPage(currentPage: number): void {
    if (currentPage >= 1 && currentPage <= this.items.length) {
      this.currentPage = currentPage;
      this.router.navigate([], {
        queryParams: { page: currentPage },
        queryParamsHandling: 'merge'
      });
      this.updatePage();
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

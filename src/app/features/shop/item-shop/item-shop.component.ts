
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Item } from '../../../data_test/item/item-interface';
import { ITEMS } from '../../../data_test/item/item-data';
import { CartService } from '../../../data_test/cart/cart-service';
import { ItemService } from '../../../data_test/item/item-service';

@Component({
  selector: 'app-item-shop',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './item-shop.component.html',
  styleUrl: './item-shop.component.css'
})
export class ItemShopComponent implements OnInit {

  constructor(
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private itemService: ItemService
  ) {
    // Subscribe to query params
    this.route.queryParams.subscribe(params => {
      const page = +params['page'] || 1;
      const category = params['select'] || 'all';
      const colors = params['color'] ? params['color'].split(' ') : [];
  
      this.currentPage = page;
  
      // Update items based on category and colors
      this.itemService.updateItemsByCategory(category);
      this.itemService.updateItemsByColors(colors); // Lọc theo màu sắc nếu có
  
      this.updatePage();
    });
  }

  navigateToProductDetail(productId: number) {
    //this.router.navigate(['/shop/product/details/', productId]); // Điều hướng đến trang chi tiết sản phẩm
    window.location.href = `/shop/product/details/${productId}`;
  }

  items: Item[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  pagedItems: any[] = [];


  ngOnInit() {
    this.itemService.items$.subscribe(items => {
      this.items = items;
      this.updatePage();
    });
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

  handleCartBtnClicked(item: Item) {
    this.cartService.addItem2(item, item.pricesale); 
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm sản phẩm ' + item.name + ' vào giỏ hàng!' });
    console.log(this.cartService.getCart()); 
  }
  
}

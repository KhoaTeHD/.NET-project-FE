import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Item, Item_v2 } from '../../../../data_test/item/item-interface';
import { ITEMS, ITEMS_V2 } from '../../../../data_test/item/item-data';
import { PlaceholderItem } from '../../../../data_test/item/item-interface';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css'],
})
export class RelatedProductsComponent implements OnInit {
  items: Item[] = ITEMS;
  items_v2: Item_v2[] = ITEMS_V2;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  pagedItems: (Item | PlaceholderItem)[] = [];
  pagedItems_v2: (Item_v2 | PlaceholderItem)[] = [];
  excludedId: number | null = null; // Khai báo biến để lưu id cần loại trừ

  constructor(
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    // Lấy id từ URL
    this.route.params.subscribe((params) => {
      this.excludedId = +params['id']; // Chuyển đổi id thành số
      this.updatePage(); // Gọi hàm updatePage khi có id
    });
  }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**Xu ly item v2 */
  updatePage() {
    if (this.excludedId === null) return; // Kiểm tra id có hợp lệ không

    const filteredItems = this.items_v2.filter(
      (item) => item.id !== this.excludedId
    ); // Sử dụng id từ URL
    this.pagedItems_v2 = this.getRandomItems(filteredItems, 8);

    const itemsToAdd = this.itemsPerPage - this.pagedItems.length;
    for (let i = 0; i < itemsToAdd; i++) {
      this.pagedItems.push({ isPlaceholder: true } as PlaceholderItem);
    }
  }

  get totalPages(): number {
    return Math.ceil((this.items.length - 1) / this.itemsPerPage);
  }

  getRandomItems(array: Item_v2[], n: number): Item_v2[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }
  isPlaceholderItem(item: Item_v2 | PlaceholderItem): item is PlaceholderItem {
    return (item as PlaceholderItem).isPlaceholder !== undefined;
  }
  handleCartBtnClicked(item: Item_v2) {
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đã thêm sản phẩm ' + item.name + ' vào giỏ hàng!',
    });
  }
  /**Xu ly item v2 */

  // updatePage() {
  //   if (this.excludedId === null) return; // Kiểm tra id có hợp lệ không

  //   const filteredItems = this.items.filter(
  //     (item) => item.id !== this.excludedId
  //   ); // Sử dụng id từ URL
  //   this.pagedItems = this.getRandomItems(filteredItems, 8);

  //   const itemsToAdd = this.itemsPerPage - this.pagedItems.length;
  //   for (let i = 0; i < itemsToAdd; i++) {
  //     this.pagedItems.push({ isPlaceholder: true } as PlaceholderItem);
  //   }
  // }

  // getRandomItems(array: Item[], n: number): Item[] {
  //   const shuffled = array.sort(() => 0.5 - Math.random());
  //   return shuffled.slice(0, n);
  // }

  // isPlaceholderItem(item: Item | PlaceholderItem): item is PlaceholderItem {
  //   return (item as PlaceholderItem).isPlaceholder !== undefined;
  // }

  navigateToProductDetail(productId: number) {
    this.router.navigate(['/shop/product/details/', productId]);
    window.scrollTo(0, 0);
  }

  // handleCartBtnClicked(item: Item) {
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Thành công',
  //     detail: 'Đã thêm sản phẩm ' + item.name + ' vào giỏ hàng!',
  //   });
  // }

  goToPage(currentPage: number): void {
    if (currentPage >= 1 && currentPage <= this.totalPages) {
      this.currentPage = currentPage;
      this.router.navigate([], {
        queryParams: { page: currentPage },
        queryParamsHandling: 'merge',
      });
      this.updatePage();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  // get totalPages(): number {
  //   return Math.ceil((this.items.length - 1) / this.itemsPerPage);
  // }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITEMS, ITEMS_V2 } from './item-data';
import { Item, Item_v2 } from './item-interface';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemsSubject = new BehaviorSubject<Item[]>(ITEMS);
  items$ = this.itemsSubject.asObservable();
  private filteredItems: Item[] = ITEMS; // Biến lưu trữ item đã lọc theo category

  /**Xu ly item v2 */
  private itemsSubject_v2 = new BehaviorSubject<Item_v2[]>(ITEMS_V2);
  items_v2$ = this.itemsSubject_v2.asObservable();
  private filteredItems_v2: Item_v2[] = ITEMS_V2;
  /**Xu ly item v2 */

  updateItemsByCategory(category: string) {
    this.filteredItems =
      category === 'all'
        ? ITEMS
        : ITEMS.filter((item) => item.type === category);

    this.itemsSubject.next(this.filteredItems);
  }

  updateItemsByColors(selectedColors: string[]) {
    const filteredItems =
      selectedColors.length === 0
        ? this.filteredItems // Nếu không chọn màu, giữ nguyên kết quả của updateItemsByCategory
        : this.filteredItems.filter((item) =>
            selectedColors.every((color) =>
              item.color.some((c) => c.value === color)
            )
          );

    this.itemsSubject.next(filteredItems);
  }
}

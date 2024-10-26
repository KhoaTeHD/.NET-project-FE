import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITEMS } from './item-data';
import { Item } from './item-interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsSubject = new BehaviorSubject<Item[]>(ITEMS);
  items$ = this.itemsSubject.asObservable();
  private filteredItems: Item[] = ITEMS; // Biến lưu trữ item đã lọc theo category

  updateItemsByCategory(category: string) {
    this.filteredItems = category === 'all' 
      ? ITEMS 
      : ITEMS.filter(item => item.type === category);
    
    this.itemsSubject.next(this.filteredItems);
  }

  updateItemsByColors(selectedColors: string[]) {
    const filteredItems = selectedColors.length === 0 
      ? this.filteredItems // Nếu không chọn màu, giữ nguyên kết quả của updateItemsByCategory
      : this.filteredItems.filter(item => 
          selectedColors.every(color => item.color.some(c => c.value === color))
        );
    
    this.itemsSubject.next(filteredItems);
  }
}

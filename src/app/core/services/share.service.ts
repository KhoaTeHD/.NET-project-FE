import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private selectedCategoryIdSource = new BehaviorSubject<number>(-1);
  selectedCategoryId$ = this.selectedCategoryIdSource.asObservable();

  private selectedFilerPriceSource = new BehaviorSubject<number>(-1);
  selectedFilerPriceSource$ = this.selectedFilerPriceSource.asObservable();

  private selectedColorsSource = new BehaviorSubject<number[]>([]);
  selectedColorsSource$ = this.selectedColorsSource.asObservable();

  setSelectedCategoryId(id: number) {
    this.selectedCategoryIdSource.next(id);
  }

  setFilerPriceId(id: number) {
    this.selectedFilerPriceSource.next(id);
  }

  setSelectedColorsId(ids: number[]) {
    this.selectedColorsSource.next(ids);
  }
}

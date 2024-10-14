import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FilterPrice {
  name: String;
}

@Component({
  selector: 'app-filter-price',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-price.component.html',
  styleUrl: './filter-price.component.css'
})

export class FilterPriceComponent {

  filterprice: FilterPrice[] = [
    {
      name: 'Mặc định',
    },
    {
      name: 'Giá từ cao đến thấp',
    },
    {
      name: 'Giá từ thấp đến cao',
    }
   ];

   onCategoryChange(event: any) {
    const selectedCategory = event.target.value;
    console.log('Selected category:', selectedCategory);
    // Xử lý logic sau khi chọn category
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RangeSliderComponent } from '../range-slider/range-slider.component';

interface Category {
  name: string;
  quantity: number;
  detailsCategory: Array<{ name: string; link: string }>;
}

interface Color {
  name: String;
  value: String;
}

interface Brand {
  name: String;
}

interface Size {
  name: String;
}

@Component({
  selector: 'app-sidebar-shop',
  standalone: true,
  imports: [FormsModule, CommonModule, RangeSliderComponent,],
  template: '<app-range-slider [minValue]="10" [maxValue]="90"></app-range-slider>',
  templateUrl: './sidebar-shop.component.html',
  styleUrls: ['./sidebar-shop.component.css'] // Sửa styleUrl thành styleUrls
})

export class SidebarShopComponent {
  categories: Category[] = [
    {
      name: 'Light Stick',
      quantity: 100,
      detailsCategory: [
        { name: 'J97',
          link: 'j97'
        },
        { name: 'Sơn Tùng M-TP',
          link: 'sontungmtp'
        },
        { name: 'BlackPink',
          link: 'blackpink'
        }
      ]
    },
    {
      name: 'Áo mùa đông',
      quantity: 50,
      detailsCategory: [
        { name: 'Áo lông J97',
          link: 'aolongj97'
         },
        { name: 'Áo khoác J97',
          link: 'aokhoacj97'
        }
      ]
    },
    {
      name: 'Quần thời thượng',
      quantity: 80,
      detailsCategory: [
        { name: 'Quần Jean J97',
          link: 'quanjeanj97'
         },
        { name: 'Quần Free Fire',
          link: 'quanfreefire'
         },
        { name: 'Quần bò J97',
          link: 'quanboj97'
         }
      ]
    }
  ];

  colors: Color[] = [
    {
      name: 'Hồng',
      value: 'pink'
    },
    {
      name: 'Xanh',
      value: 'blue'
    },
    {
      name: 'Đỏ',
      value: 'red'
    }
  ];

  brands: Brand[] = [
    {
      name: 'J97',
    },
    {
      name: 'Sơn Tùng M-TP',
    },
    {
      name: 'Trịnh Trần Phương Tuấn',
    }
  ];

  sizes: Size[] = [
    {
      name: 'S',
    },
    {
      name: 'M',
    },
    {
      name: 'L',
    },
    {
      name: 'Over Size',
    }
  ];
}

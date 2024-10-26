import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ImportsModule } from '../../../data_test/primeng/imports';
import { Item } from '../../../data_test/item/item-interface';
import { ITEMS } from '../../../data_test/item/item-data';
import { ItemService } from '../../../data_test/item/item-service';
import { Router, ActivatedRoute } from '@angular/router';
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
  imports: [FormsModule, CommonModule, ImportsModule],
  templateUrl: './sidebar-shop.component.html',
  styleUrls: ['./sidebar-shop.component.css'] // Sửa styleUrl thành styleUrls
})

export class SidebarShopComponent implements OnInit{

  items: Item[] = ITEMS;
  
  uniqueTypes: { name: string; quantity: number }[] = [];

  selectedCategory: string = 'all';

  uniqueColors: {name: string}[] = [];

  selectedColors: string[] = [];

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) {
    this.getUniqueTypesWithQuantity();
    this.getUniqueColorsWithQuantity();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['select'] || 'all';
      this.selectedColors = params['color'] ? params['color'].split(' ') : [];

          // Cập nhật lại trạng thái checkbox
    this.updateCheckboxStates();
  
      // Cập nhật các items theo bộ lọc hiện tại
      this.itemService.updateItemsByCategory(this.selectedCategory);
      this.itemService.updateItemsByColors(this.selectedColors);
    });
  
  }
  
// Hàm để cập nhật trạng thái checkbox dựa trên selectedColors
updateCheckboxStates() {
  this.uniqueColors.forEach(color => {
    const checkbox = document.getElementById('color-' + color.name) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = this.selectedColors.includes(color.name);
    }
  });
}
  getUniqueColorsWithQuantity() {
    const colorSet = new Set<string>(); // Sử dụng Set để lưu trữ màu sắc duy nhất
      this.items.forEach(item => {
        item.color.forEach(color => {
          colorSet.add(color.value); // Thêm màu vào Set
        });
      });
      // Chuyển Set thành mảng và định dạng lại
      this.uniqueColors = Array.from(colorSet).map(color => ({ name: color }));

  }
  getUniqueTypesWithQuantity() {
    const typeMap = new Map<string, number>();

    // Duyệt qua từng item để tính số lượng cho từng loại
    this.items.forEach(item => {
      if (typeMap.has(item.type)) {
        typeMap.set(item.type, typeMap.get(item.type)! + 1);
      } else {
        typeMap.set(item.type, 1);
      }
    });

    // Chuyển typeMap thành mảng để gán vào uniqueTypes
    this.uniqueTypes = Array.from(typeMap, ([name, quantity]) => ({ name, quantity }));
  }

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
  
  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    this.updateUrl();
    this.itemService.updateItemsByCategory(this.selectedCategory);
    // Gọi updateItemsByColors để đảm bảo danh sách sản phẩm được cập nhật
    this.itemService.updateItemsByColors(this.selectedColors);
  }
  
  onColorChange(event: any) {
    const colorValue = event.target.value;
    if (!colorValue) return;
  
    if (event.target.checked) {
      if (!this.selectedColors.includes(colorValue)) {
        this.selectedColors.push(colorValue);
      }
    } else {
      this.selectedColors = this.selectedColors.filter(color => color !== colorValue);
    }
  
    this.updateUrl();
    this.itemService.updateItemsByColors(this.selectedColors);
  }
  

  updateUrl() {
    // Cập nhật URL với các giá trị đã chọn
    this.router.navigate([], {
      queryParams: {
        select: this.selectedCategory !== 'all' ? this.selectedCategory : null,
        color: this.selectedColors.length > 0 ? this.selectedColors.join(' ') : null
      },
      queryParamsHandling: 'merge',
      relativeTo: this.route
    });
  }
  

  rangeValues: number[] = [20, 80];
}

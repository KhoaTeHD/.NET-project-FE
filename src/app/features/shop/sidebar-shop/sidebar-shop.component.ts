import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-sidebar-shop',
  standalone: true,
  imports: [FormsModule], // Thêm FormsModule vào imports
  templateUrl: './sidebar-shop.component.html',
  styleUrl: './sidebar-shop.component.css'
})
export class SidebarShopComponent {
  giaTri: number = 3000000; // Khởi tạo giá trị ban đầu cho slider
}

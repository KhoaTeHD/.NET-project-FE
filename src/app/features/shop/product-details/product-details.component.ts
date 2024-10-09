import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports:[ImageSliderComponent, HeaderComponent, FooterComponent],
  standalone: true,
})
export class ProductDetailsComponent implements OnInit {
  productId: string | null = null;
  product: any;

  // Ví dụ danh sách các sản phẩm, bạn có thể thay thế bằng cách gọi API thực tế
  items = [
    { id: 1, name: 'Item 1', price: 100, description: 'Description of Item 1' },
    { id: 2, name: 'Item 2', price: 200, description: 'Description of Item 2' },
    // ... các item khác
  ];

  constructor(private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   // Lấy ID từ URL
  //   this.productId = Number(this.route.snapshot.paramMap.get('id'));

  //   // Tìm sản phẩm theo ID
  //   this.product = this.items.find(item => item.id === this.productId);
  // }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id'); // Lấy id từ URL
      // Bạn có thể sử dụng id này để gọi API và lấy thông tin chi tiết sản phẩm
      this.product = this.items.find(item => item.id.toString() === this.productId);
    });
  }
}

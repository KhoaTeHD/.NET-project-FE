import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RelatedProductsComponent } from './related-products/related-products.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AfterViewInit } from '@angular/core';
import { Item } from '../../../data_test/item/item-interface';
import { ITEMS } from '../../../data_test/item/item-data';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports:[ImageSliderComponent, HeaderComponent, FooterComponent, CommonModule, RelatedProductsComponent, ToastModule],
  providers: [MessageService],
  standalone: true,
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  productId: string | null = null;
  product: any;

  items: Item[] = ITEMS;

  constructor(private route: ActivatedRoute, private messageService: MessageService) { }

  handleCartBtnClicked() {
    //console.log(item);
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm sản phẩm vào giỏ hàng!' });
  }

  // ngOnInit(): void {
  //   // Lấy ID từ URL
  //   this.productId = Number(this.route.snapshot.paramMap.get('id'));

  //   // Tìm sản phẩm theo ID
  //   this.product = this.items.find(item => item.id === this.productId);
  // }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id'); 
      this.product = this.items.find(item => item.id.toString() === this.productId);
    });
  }

  ngAfterViewInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}

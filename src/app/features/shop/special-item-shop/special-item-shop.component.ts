import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-special-item-shop',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './special-item-shop.component.html',
  styleUrl: './special-item-shop.component.css'
})
export class SpecialItemShopComponent implements OnInit{
  
  ngOnInit() {
  }
  constructor(private messageService: MessageService) {
  }
  handleCartBtnClicked() {
    //console.log(item);
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm sản phẩm vào giỏ hàng!' });
  }
}

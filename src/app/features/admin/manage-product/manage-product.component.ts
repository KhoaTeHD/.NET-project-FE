import { Component, OnInit } from '@angular/core';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, ButtonModule, DialogModule, FormsModule, ToastModule, ConfirmDialogModule, DropdownModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit  {
  products = [
    {
      Pro_ID: 1,
      Pro_name: 'Áo thun nam',
      Pro_status: true,
      variations: [
        { ProV_ID: 101, Col_ID: 'Đỏ', Siz_ID: 'M', ProV_Price: 200000, ProV_Quantity: 10, ProV_Discount: 10, ProV_Status: true },
        { ProV_ID: 102, Col_ID: 'Xanh', Siz_ID: 'L', ProV_Price: 210000, ProV_Quantity: 5, ProV_Discount: 5, ProV_Status: true }
      ]
    },
    {
      Pro_ID: 2,
      Pro_name: 'Quần jean nữ',
      Pro_status: false,
      variations: [
        { ProV_ID: 201, Col_ID: 'Xanh', Siz_ID: 'S', ProV_Price: 350000, ProV_Quantity: 20, ProV_Discount: 15, ProV_Status: false },
        { ProV_ID: 202, Col_ID: 'Đen', Siz_ID: 'M', ProV_Price: 360000, ProV_Quantity: 10, ProV_Discount: 10, ProV_Status: true }
      ]
    }
  ];

  colors = [
    { Col_ID: 1, Col_Name: 'Đỏ', Col_Status: 1 },
    { Col_ID: 2, Col_Name: 'Xanh', Col_Status: 1 },
    { Col_ID: 3, Col_Name: 'Vàng', Col_Status: 1 },
    { Col_ID: 4, Col_Name: 'Tím', Col_Status: 1 },
    { Col_ID: 5, Col_Name: 'Đen', Col_Status: 1 },
    { Col_ID: 6, Col_Name: 'Trắng', Col_Status: 1 },
    { Col_ID: 7, Col_Name: 'Cam', Col_Status: 1 },
    { Col_ID: 8, Col_Name: 'Hồng', Col_Status: 1 },
    { Col_ID: 9, Col_Name: 'Xám', Col_Status: 1 },
    { Col_ID: 10, Col_Name: 'Nâu', Col_Status: 1 }
  ];

  sizes = [
    { Siz_ID: 1, Siz_Name: 'S', Siz_Desc: 'Size nhỏ', Siz_Status: 1 },
    { Siz_ID: 2, Siz_Name: 'M', Siz_Desc: 'Size trung bình', Siz_Status: 1 },
    { Siz_ID: 3, Siz_Name: 'L', Siz_Desc: 'Size lớn', Siz_Status: 1 },
    { Siz_ID: 4, Siz_Name: 'XL', Siz_Desc: 'Size rất lớn', Siz_Status: 1 },
    { Siz_ID: 5, Siz_Name: 'XXL', Siz_Desc: 'Size cực lớn', Siz_Status: 0 }
  ];

  visibleDialogProduct: boolean = false;

  visibleDialogVariation: boolean = false;

  product!: Product;

  variations!: Variation;

  dialogTitle: string = 'Thêm';

  constructor(
    private messageService: MessageService, 
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.product = {
      Pro_ID: 109
    };
    this.variations = { 
      ProV_ID: 109, 
      ProV_Quantity: 0 
    };
  }

  showDialogProduct(type: string, product: Product): void {
    if(type == 'Edit'){
      this.dialogTitle = 'Sửa';
      this.product = {...product };
    }
    else{
      this.dialogTitle = 'Thêm';
      this.product = {
        Pro_ID: 110
      };
    }
    this.visibleDialogProduct = true;
  }

  showDialogVariation(type: string, variation: Variation): void {
    if(type == 'Edit'){
      this.dialogTitle = 'Sửa';
      this.variations = {...variation };
    }
    else{
      this.dialogTitle = 'Thêm';
      this.variations = {
        ProV_ID: 110,
        ProV_Quantity: 0
      };
    }
    this.visibleDialogVariation = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa sản phẩm ' + product.Pro_ID + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.Pro_ID !== product.Pro_ID);
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa sản phẩm', life: 3000 });
      }
    });
  }

  deleteVariation(variation: Variation) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa biển thể ' + variation.ProV_ID + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.map((product) => {
          return {
            ...product,
            variations: product.variations.filter((val) => val.ProV_ID !== variation.ProV_ID)
          };
        });
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa biến thể', life: 3000 });
      }
    });
  }

  getSeverity(status: number) {
    switch (status) {
        case 1:
            return 'success';
        case 0:
            return 'danger';
        default:
            return undefined;
    }
  }
}

interface Product {
  Pro_ID?: number;
  Pro_name?: string;
  Pro_status?: boolean;
  variations?: Variation[];
}

interface Variation {
  ProV_ID?: number;
  Col_ID?: string;
  Siz_ID?: string;
  ProV_Price?: number;
  ProV_Quantity?: number;
  ProV_Discount?: number;
  ProV_Status?: boolean;
}

interface Color {
  Col_ID: number;
  Col_Name: string;
  Col_Status: number;
}

interface Size {
  Siz_ID: number;
  Siz_Name: string;
  Siz_Desc: string;
  Siz_Status: number;
}
import { Component, OnInit } from '@angular/core';
import { AdminFooterComponent } from "../../../shared/components/admin-footer/admin-footer.component";
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { AutoCompleteSelectEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DetailGoodsReceiptDto, GoodsReceiptDto } from '../../../core/models/goodsReceipt.model';
import { SupplierDto } from '../../../core/models/supplier.model';
import { ProductDto } from '../../../core/models/product.model';
import { ProductVariationDto } from '../../../core/models/productVariation.model';
import { GoodsReceiptService } from '../../../core/services/goodsReceipt.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-manage-goods-receipt',
  standalone: true,
  imports: [AdminFooterComponent, TagModule, TableModule, DropdownModule, ToastModule, ConfirmDialogModule, InputTextModule, CommonModule, FormsModule, DialogModule, AutoCompleteModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-goods-receipt.component.html',
  styleUrl: './manage-goods-receipt.component.css'
})
export class ManageGoodsReceiptComponent implements OnInit {

  goodsReceipts: GoodsReceiptDto[] = [];

  suppliers: SupplierDto[] = [];
  
  productVariations: ProductVariationDto[] = [];

  clonedGoodsReceipts: { [id: number]: GoodsReceiptDto } = {};

  visible: boolean = false;

  selectedGoodsReceipt!: GoodsReceiptDto;

  selectedProduct!: ProductVariationDto;

  filteredProducts!: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private goodsReceiptService: GoodsReceiptService
  ) { }

  showDialog(goodsReceipt: GoodsReceiptDto | null) {
    this.visible = true;
    if (goodsReceipt!) this.selectedGoodsReceipt = goodsReceipt;
  }

  ngOnInit(): void {
    this.selectedGoodsReceipt = {};
    this.loadReceipts();
  }

  handleInput(event: Event, dt: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      dt.filterGlobal(inputElement.value, 'contains');
    }
  }

  onRowEditInit(goodsReceipt: GoodsReceiptDto) {
    if (goodsReceipt.goo_ID !== undefined) {
      this.clonedGoodsReceipts[goodsReceipt.goo_ID] = { ...goodsReceipt };
    }
  }

  async loadReceipts(): Promise<void> {
    try {
      const data = await firstValueFrom(this.goodsReceiptService.getAllGoodsReceipts());
      console.log(data.result)
      if (data.isSuccess && Array.isArray(data.result)) {
        this.goodsReceipts = data.result;
      }
    } catch (error) {
      console.error('Error fetching goodreceipt', error);
    }
  }

  // onRowEditSave(goodsReceipt: GoodsReceiptDto, index: number) {
  //   if (goodsReceipt.goo_ID !== undefined) {
  //     if (goodsReceipt.Supplier_Name && goodsReceipt.Supplier_Name.trim().length !== 0) {
  //       delete this.clonedGoodsReceipts[goodsReceipt.GoodsReceipt_ID];
  //       this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Phiếu nhập đã được cập nhật' });
  //     } else {
  //       this.goodsReceipts[index] = this.clonedGoodsReceipts[goodsReceipt.GoodsReceipt_ID];
  //       this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên nhà cung cấp không hợp lệ' });
  //     }
  //   }
  // }

  // onRowEditCancel(goodsReceipt: GoodsReceipt, index: number) {
  //   if (goodsReceipt.GoodsReceipt_ID !== undefined){
  //     this.goodsReceipts[index] = this.clonedGoodsReceipts[goodsReceipt.GoodsReceipt_ID];
  //     delete this.clonedGoodsReceipts[goodsReceipt.GoodsReceipt_ID];
  //   }
  // }

  deleteGoodsReceipt(goodsReceipt: GoodsReceiptDto) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa phiếu nhập ' + goodsReceipt.goo_ID + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.goodsReceipts = this.goodsReceipts.filter((val) => val.goo_ID !== goodsReceipt.goo_ID);
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa phiếu nhập', life: 3000 });
      }
    });
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.productVariations as any[]).length; i++) {
        let productVar = (this.productVariations as any[])[i];
        if (productVar.product.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(productVar);
        }
    }

    this.filteredProducts = filtered;
}

addProductToSelected(event: AutoCompleteSelectEvent){
  //et inputElement = event.originalEvent.target as HTMLInputElement;
  if (event.value != null) {
    let productVar = this.productVariations.find(p => p === event.value);
    if (productVar != null) {
      let detailedGoodsReceipt: DetailGoodsReceiptDto = {
        product_ID: productVar.id,
        quantity: 0,
        unit_Price: 0
      };

      if(this.selectedGoodsReceipt.detailGoodsReceipts == null){
        this.selectedGoodsReceipt.detailGoodsReceipts = [];
      }

      let existingProduct = this.selectedGoodsReceipt.detailGoodsReceipts?.find(p => p.product_ID == detailedGoodsReceipt.product_ID);
      if (existingProduct != null) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
      }
      else{
        this.selectedGoodsReceipt.detailGoodsReceipts?.push(detailedGoodsReceipt);
      }
      
      this.selectedProduct = productVar;
      console.log(this.selectedGoodsReceipt);
    }
  }
}

editProduct(goodsReceipt: GoodsReceiptDto) {
  this.selectedGoodsReceipt = { ...goodsReceipt };
  this.visible = true;
}

formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
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


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
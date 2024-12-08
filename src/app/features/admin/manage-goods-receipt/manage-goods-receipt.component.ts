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
import { ProductVariationDto } from '../../../core/models/productVariation.model';
import { GoodsReceiptService } from '../../../core/services/goodsReceipt.service';
import { firstValueFrom } from 'rxjs';
import { SupplierService } from '../../../core/services/supplier.service';
import { ProductVariationService } from '../../../core/services/productVariation.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-manage-goods-receipt',
  standalone: true,
  imports: [AdminFooterComponent, TagModule, TableModule, DropdownModule, ToastModule, ConfirmDialogModule, InputTextModule, CommonModule, FormsModule, DialogModule, AutoCompleteModule, InputNumberModule],
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

  filteredProducts!: ProductVariationDto[];

  DialogTitle: string = 'Thêm';

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService,
    private goodsReceiptService: GoodsReceiptService, private supplierService: SupplierService, private productVariationService: ProductVariationService
  ) { }

  showDialog(type: string ,goodsReceipt: GoodsReceiptDto | null): void {
    if(type === 'add') {
      if (goodsReceipt!) this.selectedGoodsReceipt = goodsReceipt
      else this.selectedGoodsReceipt = {};
      this.DialogTitle = 'Thêm';
      this.visible = true;
    }
  }

  ngOnInit(): void {
    this.selectedGoodsReceipt = {};
    this.loadReceipts();
    this.loadSuppliers();
    this.loadVariations();
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
      //console.log(data.result)
      if (data.isSuccess && Array.isArray(data.result)) {
        this.goodsReceipts = data.result;
        //console.log(this.goodsReceipts);
      }
    } catch (error) {
      console.error('Error fetching goodreceipt', error);
    }
  }

  async loadSuppliers(): Promise<void> {
    try {
      // Sử dụng firstValueFrom để lấy dữ liệu từ observable
      const data = await firstValueFrom(this.supplierService.getAllSuppliers());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.suppliers = data.result;
      }
    } catch (error) {
      console.error('Error fetching suppliers', error);
    }
  }

  async loadVariations(): Promise<void> {
    try {
      const data = await firstValueFrom(this.productVariationService.getAllProductVariations());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.productVariations = data.result;
      }
    } catch (error) {
      console.error('Error fetching products', error);
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
    let filtered: ProductVariationDto[] = [];
    let query = event.query;

    for (let i = 0; i < this.productVariations.length; i++) {
        let productVar = this.productVariations[i];
        if (productVar?.product?.name && productVar.product.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
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
        quantity: 1,
        unit_Price: productVar.price,
        productVariation: productVar
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
      if (detailedGoodsReceipt.unit_Price !== undefined) {
        this.selectedGoodsReceipt.total = (this.selectedGoodsReceipt.total || 0) + detailedGoodsReceipt.unit_Price * (detailedGoodsReceipt.quantity ?? 0);
      }
      console.log(this.selectedGoodsReceipt);
    }
  }
}

editReceipt(goodsReceipt: GoodsReceiptDto) {
  this.selectedGoodsReceipt = { ...goodsReceipt };
  this.DialogTitle = 'Sửa';
  this.visible = true;
  console.log(this.selectedGoodsReceipt);
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

  updateTotals() {
    // Tính tổng tiền cho mỗi chi tiết và tổng tiền toàn bộ
    if (this.selectedGoodsReceipt.detailGoodsReceipts) {
        this.selectedGoodsReceipt.total = this.selectedGoodsReceipt.detailGoodsReceipts
            .reduce((acc, detail) => acc + ((detail.quantity ?? 0) * (detail.unit_Price ?? 0)), 0);
    }
  }

  saveGoodsReceipt() {
    if (!this.selectedGoodsReceipt.supplier_ID) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng chọn nhà cung cấp' });
      return;
    }
    console.log(this.selectedGoodsReceipt);
    this.goodsReceiptService.createGoodsReceipt(this.selectedGoodsReceipt).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Phiếu nhập đã được lưu.'});
          this.selectedGoodsReceipt.detailGoodsReceipts?.forEach((detail) => {
            if (detail.product_ID !== undefined && detail.quantity !== undefined) {
              this.updateQuantity(detail.product_ID, detail.quantity);
            }
          });

          this.visible = false;
          this.loadReceipts();
        } else {
          this.messageService.add({severity:'error', summary: 'Lỗi', detail: response.message || 'Lưu phiếu nhập thất bại.'});
        }
      },
      error: (err) => {
        this.messageService.add({severity:'error', summary: 'Lỗi', detail: 'Có lỗi xảy ra khi lưu phiếu nhập.'});
      }
    });
  }

  // UpdateReceipt(){
  //   this.goodsReceiptService.updateGoodsReceipt(this.selectedGoodsReceipt).subscribe({
  //     next: (response) => {
  //       if (response.isSuccess) {
  //         this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Phiếu nhập đã được lưu.'});
  //         this.visible = false;
  //         this.loadReceipts();
  //       } else {
  //         this.messageService.add({severity:'error', summary: 'Lỗi', detail: response.message || 'Lưu phiếu nhập thất bại.'});
  //       }
  //     },
  //     error: (err) => {
  //       this.messageService.add({severity:'error', summary: 'Lỗi', detail: 'Có lỗi xảy ra khi lưu phiếu nhập.'});
  //       //console.error(err);
  //     }
  //   });
  // }

  updateQuantity(id: number, quantity: number): boolean {
    let result = false;
    this.productVariationService.addProductQuantity(id, quantity).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          result = true;
        }
      }
    });
    return result;
  }

}


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}


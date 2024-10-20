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

@Component({
  selector: 'app-manage-goods-receipt',
  standalone: true,
  imports: [AdminFooterComponent, TagModule, TableModule, DropdownModule, ToastModule, ConfirmDialogModule, InputTextModule, CommonModule, FormsModule, DialogModule, AutoCompleteModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-goods-receipt.component.html',
  styleUrl: './manage-goods-receipt.component.css'
})
export class ManageGoodsReceiptComponent implements OnInit {

  goodsReceipts: GoodsReceipt[] = [
    {
      GoodsReceipt_ID: 1,
      Supplier_ID: 101,
      Supplier_Name: 'Nhà cung cấp A',
      Datetime: new Date('2024-01-15'),
      Total: 5000000,
      DetailedGoodsReceipts: [
        {
          Product_ID: 1001,
          Product_Name: 'Sản phẩm 1',
          Quantity: 50,
          Unit_Price: 100000
        },
        {
          Product_ID: 1002,
          Product_Name: 'Sản phẩm 2',
          Quantity: 30,
          Unit_Price: 150000
        }
      ]
    },
    {
      GoodsReceipt_ID: 2,
      Supplier_ID: 102,
      Supplier_Name: 'Nhà cung cấp B',
      Datetime: new Date('2024-01-16'),
      Total: 7500000,
      DetailedGoodsReceipts: [
        {
          Product_ID: 1003,
          Product_Name: 'Sản phẩm 3',
          Quantity: 20,
          Unit_Price: 200000
        },
        {
          Product_ID: 1004,
          Product_Name: 'Sản phẩm 4',
          Quantity: 10,
          Unit_Price: 350000
        }
      ]
    },
    {
      GoodsReceipt_ID: 3,
      Supplier_ID: 103,
      Supplier_Name: 'Nhà cung cấp C',
      Datetime: new Date('2024-01-17'),
      Total: 3000000,
      DetailedGoodsReceipts: [
        {
          Product_ID: 1005,
          Product_Name: 'Sản phẩm 5',
          Quantity: 15,
          Unit_Price: 200000
        }
      ]
    },
    {
      GoodsReceipt_ID: 4,
      Supplier_ID: 104,
      Supplier_Name: 'Nhà cung cấp D',
      Datetime: new Date('2024-01-18'),
      Total: 6500000,
      DetailedGoodsReceipts: [
        {
          Product_ID: 1006,
          Product_Name: 'Sản phẩm 6',
          Quantity: 40,
          Unit_Price: 180000
        },
        {
          Product_ID: 1007,
          Product_Name: 'Sản phẩm 7',
          Quantity: 25,
          Unit_Price: 220000
        }
      ]
    },
    {
      GoodsReceipt_ID: 5,
      Supplier_ID: 105,
      Supplier_Name: 'Nhà cung cấp E',
      Datetime: new Date('2024-01-19'),
      Total: 8500000,
      DetailedGoodsReceipts: [
        {
          Product_ID: 1008,
          Product_Name: 'Sản phẩm 8',
          Quantity: 60,
          Unit_Price: 120000
        },
        {
          Product_ID: 1009,
          Product_Name: 'Sản phẩm 9',
          Quantity: 70,
          Unit_Price: 110000
        }
      ]
    },
    {
      GoodsReceipt_ID: 6,
      Supplier_ID: 106,
      Supplier_Name: 'Nhà cung cấp F',
      Datetime: new Date('2024-01-20'),
      Total: 4000000,
      DetailedGoodsReceipts: [
        {
          Product_ID: 1010,
          Product_Name: 'Sản phẩm 10',
          Quantity: 80,
          Unit_Price: 170000
        },
        {
          Product_ID: 1011,
          Product_Name: 'Sản phẩm 11',
          Quantity: 90,
          Unit_Price: 210000
        }
      ]
    },
    {
      GoodsReceipt_ID: 7,
      Supplier_ID: 107,
      Supplier_Name: 'Nhà cung cấp G',
      Datetime: new Date('2024-01-21'),
      Total: 9200000,
      DetailedGoodsReceipts: [
        {
          Product_ID: 1012,
          Product_Name: 'Sản phẩm 12',
          Quantity: 100,
          Unit_Price: 190000
        },
        {
          Product_ID: 1013,
          Product_Name: 'Sản phẩm 13',
          Quantity: 35,
          Unit_Price: 140000
        }
      ]
    },
    {
      GoodsReceipt_ID: 8,
      Supplier_ID: 108,
      Supplier_Name: 'Nhà cung cấp H',
      Datetime: new Date('2024-01-22'),
      Total: 4800000,
      DetailedGoodsReceipts: [
        {
          Product_ID: 1014,
          Product_Name: 'Sản phẩm 14',
          Quantity: 45,
          Unit_Price: 230000
        },
        {
          Product_ID: 1015,
          Product_Name: 'Sản phẩm 15',
          Quantity: 55,
          Unit_Price: 160000
        }
      ]
    },
    {
      GoodsReceipt_ID: 9,
      Supplier_ID: 109,
      Supplier_Name: 'Nhà cung cấp I',
      Datetime: new Date('2024-01-23'),
      Total: 5700000,
      DetailedGoodsReceipts: [
        {
          Product_ID: 1016,
          Product_Name: 'Sản phẩm 16',
          Quantity: 65,
          Unit_Price: 130000
        },
        {
          Product_ID: 1017,
          Product_Name: 'Sản phẩm 17',
          Quantity: 75,
          Unit_Price: 250000
        }
      ]
    }
  ];

  suppliers = [
    { Supplier_ID: 1, SupplierName: 'Nhà cung cấp A', Address: 'Hà Nội', PhoneNumber: '0123456789', Status: 1 },
    { Supplier_ID: 2, SupplierName: 'Nhà cung cấp B', Address: 'TP.HCM', PhoneNumber: '0987654321', Status: 1 },
    { Supplier_ID: 3, SupplierName: 'Nhà cung cấp C', Address: 'Đà Nẵng', PhoneNumber: '0123467890', Status: 1 },
    { Supplier_ID: 4, SupplierName: 'Nhà cung cấp D', Address: 'Cần Thơ', PhoneNumber: '0987654322', Status: 0 },
    { Supplier_ID: 5, SupplierName: 'Nhà cung cấp E', Address: 'Hải Phòng', PhoneNumber: '0123456788', Status: 1 }
  ];
  
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

  clonedGoodsReceipts: { [id: number]: GoodsReceipt } = {};

  visible: boolean = false;

  selectedGoodsReceipt!: GoodsReceipt;

  selectedProduct!: Product;

  filteredProducts!: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

  showDialog(goodsReceipt: GoodsReceipt | null) {
    this.visible = true;
    if (goodsReceipt!) this.selectedGoodsReceipt = goodsReceipt;
  }

  ngOnInit(): void {
    this.selectedGoodsReceipt = {};
  }

  handleInput(event: Event, dt: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      dt.filterGlobal(inputElement.value, 'contains');
    }
  }

  onRowEditInit(goodsReceipt: GoodsReceipt) {
    if (goodsReceipt.GoodsReceipt_ID !== undefined) {
      this.clonedGoodsReceipts[goodsReceipt.GoodsReceipt_ID] = { ...goodsReceipt };
    }
  }

  onRowEditSave(goodsReceipt: GoodsReceipt, index: number) {
    if (goodsReceipt.GoodsReceipt_ID !== undefined) {
      if (goodsReceipt.Supplier_Name && goodsReceipt.Supplier_Name.trim().length !== 0) {
        delete this.clonedGoodsReceipts[goodsReceipt.GoodsReceipt_ID];
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Phiếu nhập đã được cập nhật' });
      } else {
        this.goodsReceipts[index] = this.clonedGoodsReceipts[goodsReceipt.GoodsReceipt_ID];
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên nhà cung cấp không hợp lệ' });
      }
    }
  }

  onRowEditCancel(goodsReceipt: GoodsReceipt, index: number) {
    if (goodsReceipt.GoodsReceipt_ID !== undefined){
      this.goodsReceipts[index] = this.clonedGoodsReceipts[goodsReceipt.GoodsReceipt_ID];
      delete this.clonedGoodsReceipts[goodsReceipt.GoodsReceipt_ID];
    }
  }

  deleteGoodsReceipt(goodsReceipt: GoodsReceipt) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa phiếu nhập ' + goodsReceipt.GoodsReceipt_ID + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.goodsReceipts = this.goodsReceipts.filter((val) => val.GoodsReceipt_ID !== goodsReceipt.GoodsReceipt_ID);
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa phiếu nhập', life: 3000 });
      }
    });
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.products as any[]).length; i++) {
        let product = (this.products as any[])[i];
        if (product.Pro_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(product);
        }
    }

    this.filteredProducts = filtered;
}

addProductToSelected(event: AutoCompleteSelectEvent){
  //et inputElement = event.originalEvent.target as HTMLInputElement;
  if (event.value != null) {
    let product = this.products.find(p => p === event.value);
    if (product != null) {
      let detailedGoodsReceipt: DetailedGoodsReceipt = {
        Product_ID: product.Pro_ID,
        Product_Name: product.Pro_name,
        Quantity: 0,
        Unit_Price: 0
      };

      if(this.selectedGoodsReceipt.DetailedGoodsReceipts == null){
        this.selectedGoodsReceipt.DetailedGoodsReceipts = [];
      }

      let existingProduct = this.selectedGoodsReceipt.DetailedGoodsReceipts?.find(p => p.Product_ID == detailedGoodsReceipt.Product_ID);
      if (existingProduct != null) {
        existingProduct.Quantity = (existingProduct.Quantity || 0) + 1;
      }
      else{
        this.selectedGoodsReceipt.DetailedGoodsReceipts?.push(detailedGoodsReceipt);
      }
      
      this.selectedProduct = product;
      console.log(this.selectedGoodsReceipt);
    }
  }
}

editProduct(goodsReceipt: GoodsReceipt) {
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

interface GoodsReceipt {
  GoodsReceipt_ID?: number;
  Supplier_ID?: number;
  Supplier_Name?: string;  // Tên nhà cung cấp
  Datetime?: Date;
  Total?: number;
  DetailedGoodsReceipts?: DetailedGoodsReceipt[]; // Mảng chứa các chi tiết sản phẩm
}

// Interface cho bảng DetailedGoodsReceipt
interface DetailedGoodsReceipt {
  Product_ID?: number;
  Product_Name?: string;   // Tên sản phẩm
  Quantity?: number;
  Unit_Price?: number;
}

interface Product {
  Pro_ID: number;
  Pro_name: string;
  Pro_status: boolean;
  variations: Variation[];
}

interface Variation {
  ProV_ID: number;
  Col_ID: string;
  Siz_ID: string;
  ProV_Price: number;
  ProV_Quantity: number;
  ProV_Discount: number;
  ProV_Status: boolean;
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
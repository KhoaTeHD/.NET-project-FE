import { Component } from '@angular/core';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-manage-supplier',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-supplier.component.html',
  styleUrl: './manage-supplier.component.css'
})
export class ManageSupplierComponent {

  suppliers = [
    { Supplier_ID: 1, SupplierName: 'Nhà cung cấp A', Address: 'Hà Nội', PhoneNumber: '0123456789', Status: 1 },
    { Supplier_ID: 2, SupplierName: 'Nhà cung cấp B', Address: 'TP.HCM', PhoneNumber: '0987654321', Status: 1 },
    { Supplier_ID: 3, SupplierName: 'Nhà cung cấp C', Address: 'Đà Nẵng', PhoneNumber: '0123467890', Status: 1 },
    { Supplier_ID: 4, SupplierName: 'Nhà cung cấp D', Address: 'Cần Thơ', PhoneNumber: '0987654322', Status: 0 },
    { Supplier_ID: 5, SupplierName: 'Nhà cung cấp E', Address: 'Hải Phòng', PhoneNumber: '0123456788', Status: 1 }
  ];

  statuses!: SelectItem[];

  clonedSuppliers: { [id: number]: Supplier } = {};

  visible: boolean = false;

  ngOnInit(): void {
    this.statuses = [
      { label: 'Hoạt động', value: 1 },
      { label: 'Ngừng bán', value: 0 }
    ];
  }

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

    showDialog() {
      this.visible = true;
    }

  handleInput(event: Event, dt: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
        dt.filterGlobal(inputElement.value, 'contains');
    }
  }

  onRowEditInit(supplier: Supplier) {
    this.clonedSuppliers[supplier.Supplier_ID as number] = { ...supplier };
  }

  onRowEditSave(supplier: Supplier, index: number) {
    if (supplier.SupplierName.trim().length !== 0) {
      delete this.clonedSuppliers[supplier.Supplier_ID as number];
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Nhà cung cấp đã được cập nhật' });
    } else {
      this.suppliers[index] = this.clonedSuppliers[supplier.Supplier_ID as number];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(supplier: Supplier, index: number) {
    this.suppliers[index] = this.clonedSuppliers[supplier.Supplier_ID as number];
    delete this.clonedSuppliers[supplier.Supplier_ID as number];
  }

  deleteSupplier(supplier: Supplier) {
    this.confirmationService.confirm({
        message: 'Bạn có chắc xóa ' + supplier.SupplierName + ' không?',
        header: 'Xác nhận',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.suppliers = this.suppliers.filter((val) => val.Supplier_ID !== supplier.Supplier_ID);
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa nhà cung cấp', life: 3000 });
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

interface Supplier{
  Supplier_ID: number;
  SupplierName: string;
  Address: string;
  PhoneNumber: string;
  Status: number;
}

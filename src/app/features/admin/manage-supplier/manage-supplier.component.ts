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
import { SupplierDto } from '../../../core/models/supplier.model';
import { SupplierService } from '../../../core/services/supplier.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-manage-supplier',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-supplier.component.html',
  styleUrl: './manage-supplier.component.css'
})
export class ManageSupplierComponent {

  suppliers: SupplierDto[] = [];

  statuses!: SelectItem[];

  createSupplier: SupplierDto = {};

  clonedSuppliers: { [id: number]: SupplierDto } = {};

  visible: boolean = false;

  ngOnInit(): void {
    this.statuses = [
      { label: 'Hoạt động', value: true },
      { label: 'Ngừng bán', value: false }
    ];
    this.loadSuppliers();
  }

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private supplierService: SupplierService) { }

    showDialog() {
      this.visible = true;
      this.createSupplier = { status: true };
    }

  handleInput(event: Event, dt: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
        dt.filterGlobal(inputElement.value, 'contains');
    }
  }

  onRowEditInit(supplier: SupplierDto) {
    this.clonedSuppliers[supplier.supplier_ID as number] = { ...supplier };
  }

  onRowEditSave(supplier: SupplierDto, index: number) {
    if (supplier.supplierName?.trim().length !== 0) {
      this.editSupplier(supplier);
      delete this.clonedSuppliers[supplier.supplier_ID as number];
    } else {
      this.suppliers[index] = this.clonedSuppliers[supplier.supplier_ID as number];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(supplier: SupplierDto, index: number) {
    this.suppliers[index] = this.clonedSuppliers[supplier.supplier_ID as number];
    delete this.clonedSuppliers[supplier.supplier_ID as number];
  }

  deleteSupplier(supplier: SupplierDto) {
    this.confirmationService.confirm({
        message: 'Bạn có chắc xóa ' + supplier.supplierName + ' không?',
        header: 'Xác nhận',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.suppliers = this.suppliers.filter((val) => val.supplier_ID !== supplier.supplier_ID);
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa nhà cung cấp', life: 3000 });
        }
    });
  }

  getSeverity(status: boolean) {
    switch (status) {
        case true:
            return 'success';
        case false:
            return 'danger';
        default:
            return undefined;
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

  createNewSupplier(): void {
    console.log(this.createSupplier);
    this.supplierService.createSupplier(this.createSupplier).subscribe({
      next: response => {
        // Toast
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Nhà cung cấp đã được tạo' });
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }

  editSupplier(supplier: SupplierDto): void {
    this.supplierService.updateSupplier(supplier).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Nhà cung cấp đã được cập nhật' });
        this.loadSuppliers(); // Reload colors after update
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }
}


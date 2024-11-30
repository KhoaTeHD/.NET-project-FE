import { Component, OnInit } from '@angular/core';
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
import { BrandService } from '../../../core/services/brand.service';
import { firstValueFrom } from 'rxjs';
import { BrandDto } from '../../../core/models/brand.model';

@Component({
  selector: 'app-manage-brand',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-brand.component.html',
  styleUrl: './manage-brand.component.css'
})

export class ManageBrandComponent implements OnInit {
  visible: boolean = false;

  brands: BrandDto[] = [];

  statuses!: SelectItem[];

  clonedBrands: { [id: number]: BrandDto } = {};

  createBrand: BrandDto = {};

  searchValue: string = '';

  ngOnInit(): void {
    this.statuses = [
      { label: 'Hoạt động', value: true },
      { label: 'Ngừng bán', value: false }
    ];
    this.loadBrands();
  }

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private brandService: BrandService) { }

  showDialog() {
    this.visible = true;
    this.createBrand = { status: true };
  }

  onRowEditInit(brand: BrandDto) {
    this.clonedBrands[brand.id as number] = { ...brand };
  }

  onRowEditSave(brand: BrandDto, index: number) {
    if (brand.name?.trim().length !== 0) {
      this.EditBrand(brand);
      delete this.clonedBrands[brand.id as number];
    } else {
      this.brands[index] = this.clonedBrands[brand.id as number];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(brand: BrandDto, index: number) {
    this.brands[index] = this.clonedBrands[brand.id as number];
    delete this.clonedBrands[brand.id as number];
  }

  deleteProduct(brand: BrandDto) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa ' + brand.name + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.brands = this.brands.filter((val) => val.id !== brand.id);
        // this.brand = {};
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa thương hiệu', life: 3000 });
      }
    });
  }

  handleInput(event: Event, dt: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      dt.filterGlobal(inputElement.value, 'contains');
    }
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

  async loadBrands(): Promise<void> {
    try {
      // Sử dụng firstValueFrom để lấy dữ liệu từ observable
      const data = await firstValueFrom(this.brandService.getAllBrands());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.brands = data.result;
      }
    } catch (error) {
      console.error('Error fetching brands', error);
    }
  }

  createNewBrand(): void {
    this.brandService.createBrand(this.createBrand).subscribe({
      next: response => {
        // Toast
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thương hiệu đã được tạo' });
        this.loadBrands();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }

  EditBrand(brand: BrandDto): void {
    this.brandService.updateBrand(brand).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thương hiệu đã được cập nhật' });
        this.loadBrands();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }
}
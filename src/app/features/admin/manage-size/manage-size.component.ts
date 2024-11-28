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
import { SizeService } from '../../../core/services/size.service';
import { firstValueFrom } from 'rxjs';
import { SizeDto } from '../../../core/models/size.model';

@Component({
  selector: 'app-manage-size',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-size.component.html',
  styleUrl: './manage-size.component.css'
})
export class ManageSizeComponent implements OnInit {
  visible: boolean = false;

  sizes: SizeDto[] = [];

  statuses!: SelectItem[];

  clonedSizes: { [id: number]: SizeDto } = {};

  createSize: SizeDto = {};

  searchValue: string = '';

  ngOnInit(): void {
    this.statuses = [
      { label: 'Hoạt động', value: true },
      { label: 'Ngừng bán', value: false }
    ];
    this.loadSizes();
  }

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private sizeService: SizeService) { }

  showDialog() {
    this.visible = true;
  }

  onRowEditInit(size: SizeDto) {
    this.clonedSizes[size.id as number] = { ...size };
  }

  onRowEditSave(size: SizeDto, index: number) {
    if (size.name?.trim().length !== 0) {
      this.editSize(size);
      delete this.clonedSizes[size.id as number];
    } else {
      this.sizes[index] = this.clonedSizes[size.id as number];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(size: SizeDto, index: number) {
    this.sizes[index] = this.clonedSizes[size.id as number];
    delete this.clonedSizes[size.id as number];
  }

  deleteSize(size: SizeDto) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa ' + size.name + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sizeService.deleteSize(size.id as number).subscribe({
          next: () => {
            this.sizes = this.sizes.filter((val) => val.id !== size.id);
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa kích thước', life: 3000 });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
          }
        });
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

  async loadSizes(): Promise<void> {
    try {
      const data = await firstValueFrom(this.sizeService.getAllSizes());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.sizes = data.result;
      }
    } catch (error) {
      console.error('Error fetching sizes', error);
    }
  }

  createNewSize(): void {
    this.sizeService.createSize(this.createSize).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Kích thước đã được tạo' });
        this.loadSizes(); // Reload sizes after creation
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }

  editSize(size: SizeDto): void {
    this.sizeService.updateSize(size).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Kích thước đã được cập nhật' });
        this.loadSizes(); // Reload sizes after update
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }
}

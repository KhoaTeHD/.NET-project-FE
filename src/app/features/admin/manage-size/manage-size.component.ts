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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-manage-size',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-size.component.html',
  styleUrl: './manage-size.component.css'
})
export class ManageSizeComponent implements OnInit {
  sizes = [
    { Siz_ID: 1, Siz_Name: 'S', Siz_Desc: 'Size nhỏ', Siz_Status: 1 },
    { Siz_ID: 2, Siz_Name: 'M', Siz_Desc: 'Size trung bình', Siz_Status: 1 },
    { Siz_ID: 3, Siz_Name: 'L', Siz_Desc: 'Size lớn', Siz_Status: 1 },
    { Siz_ID: 4, Siz_Name: 'XL', Siz_Desc: 'Size rất lớn', Siz_Status: 1 },
    { Siz_ID: 5, Siz_Name: 'XXL', Siz_Desc: 'Size cực lớn', Siz_Status: 0 }
  ];

  statuses!: SelectItem[];

  clonedSizes: { [id: number]: Size } = {};

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

  onRowEditInit(size: Size) {
    this.clonedSizes[size.Siz_ID as number] = { ...size };
  }

  onRowEditSave(size: Size, index: number) {
    if (size.Siz_Name.trim().length !== 0) {
      delete this.clonedSizes[size.Siz_ID as number];
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Kích thước đã được cập nhật' });
    } else {
      this.sizes[index] = this.clonedSizes[size.Siz_ID as number];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(size: Size, index: number) {
    this.sizes[index] = this.clonedSizes[size.Siz_ID as number];
    delete this.clonedSizes[size.Siz_ID as number];
  }

  deleteSize(size: Size) {
    this.confirmationService.confirm({
        message: 'Bạn có chắc xóa ' + size.Siz_Name + ' không?',
        header: 'Xác nhận',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.sizes = this.sizes.filter((val) => val.Siz_ID !== size.Siz_ID);
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa kích thước', life: 3000 });
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

interface Size {
  Siz_ID: number;
  Siz_Name: string;
  Siz_Desc: string;
  Siz_Status: number;
}

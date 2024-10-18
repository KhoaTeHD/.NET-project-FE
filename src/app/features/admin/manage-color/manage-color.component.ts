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
  selector: 'app-manage-color',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-color.component.html',
  styleUrl: './manage-color.component.css'
})
export class ManageColorComponent {
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

  statuses!: SelectItem[];

  clonedColors: { [id: number]: Color } = {};

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

  onRowEditInit(color: Color) {
    this.clonedColors[color.Col_ID as number] = { ...color };
  }

  onRowEditSave(color: Color, index: number) {
    if (color.Col_Name.trim().length !== 0) {
      delete this.clonedColors[color.Col_ID as number];
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Màu sắc đã được cập nhật' });
    } else {
      this.colors[index] = this.clonedColors[color.Col_ID as number];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(color: Color, index: number) {
    this.colors[index] = this.clonedColors[color.Col_ID as number];
    delete this.clonedColors[color.Col_ID as number];
  }

  deleteColor(color: Color) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa ' + color.Col_Name + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.colors = this.colors.filter((val) => val.Col_ID !== color.Col_ID);
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa màu sắc', life: 3000 });
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

interface Color {
  Col_ID: number;
  Col_Name: string;
  Col_Status: number;
}

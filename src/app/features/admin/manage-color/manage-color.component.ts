import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColorComponent } from '../dialog/color/color.component';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-manage-color',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './manage-color.component.html',
  styleUrl: './manage-color.component.css'
})
export class ManageColorComponent {
  dataSource: any;
  responseMessage: any;
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

  ngOnInit(): void {
    this.statuses = [
      { label: 'Hoạt động', value: 1 },
      { label: 'Ngừng bán', value: 0 }
    ];
  }

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private messageService: MessageService) { }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ColorComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    })
  }

  handleEditAction(values: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ColorComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    })
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

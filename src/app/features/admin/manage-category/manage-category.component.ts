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
  selector: 'app-manage-category',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent {

  categories = [
    { Cat_ID: 1, Cat_Name: 'Danh mục A', Cat_Desc: 'Mô tả A', Cat_Status: 1 },
    { Cat_ID: 2, Cat_Name: 'Danh mục B', Cat_Desc: 'Mô tả B', Cat_Status: 1 },
    { Cat_ID: 3, Cat_Name: 'Danh mục C', Cat_Desc: 'Mô tả C', Cat_Status: 1 },
    { Cat_ID: 4, Cat_Name: 'Danh mục D', Cat_Desc: 'Mô tả D', Cat_Status: 0 },
    { Cat_ID: 5, Cat_Name: 'Danh mục E', Cat_Desc: 'Mô tả E', Cat_Status: 1 }
  ];

  statuses!: SelectItem[];

  clonedCategories: { [id: number]: any } = {};

  searchValue: string | undefined;
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

  onRowEditInit(category: any) {
    this.clonedCategories[category.Cat_ID as number] = { ...category };
  }

  onRowEditSave(category: any, index: number) {
    if (category.Cat_Name.trim().length !== 0) {
      delete this.clonedCategories[category.Cat_ID as number];
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Danh mục đã được cập nhật' });
    } else {
      this.categories[index] = this.clonedCategories[category.Cat_ID as number];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(category: any, index: number) {
    this.categories[index] = this.clonedCategories[category.Cat_ID as number];
    delete this.clonedCategories[category.Cat_ID as number];
  }

  deleteCategory(category: any) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa ' + category.Cat_Name + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categories = this.categories.filter((val) => val.Cat_ID !== category.Cat_ID);
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa danh mục', life: 3000 });
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

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
import { CategoryService } from '../../../core/services/category.service';
import { firstValueFrom } from 'rxjs';
import { CategoryDto } from '../../../core/models/category.model';

@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent implements OnInit {
  visible: boolean = false;

  categories: CategoryDto[] = [];

  statuses!: SelectItem[];

  clonedCategories: { [id: number]: CategoryDto } = {};

  createCategory: CategoryDto = {};

  searchValue: string = '';

  ngOnInit(): void {
    this.statuses = [
      { label: 'Hoạt động', value: true },
      { label: 'Ngừng bán', value: false }
    ];
    this.loadCategories();
  }

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoryService: CategoryService) { }

  showDialog() {
    this.visible = true;
  }

  onRowEditInit(category: CategoryDto) {
    this.clonedCategories[category.id as number] = { ...category };
  }

  onRowEditSave(category: CategoryDto, index: number) {
    if (category.name?.trim().length !== 0) {
      this.editCategory(category);
      delete this.clonedCategories[category.id as number];
    } else {
      this.categories[index] = this.clonedCategories[category.id as number];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(category: CategoryDto, index: number) {
    this.categories[index] = this.clonedCategories[category.id as number];
    delete this.clonedCategories[category.id as number];
  }

  deleteCategory(category: CategoryDto) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa ' + category.name + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(category.id as number).subscribe({
          next: () => {
            this.categories = this.categories.filter((val) => val.id !== category.id);
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa danh mục', life: 3000 });
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

  async loadCategories(): Promise<void> {
    try {
      const data = await firstValueFrom(this.categoryService.getAllCategorys());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.categories = data.result;
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }

  createNewCategory(): void {
    this.categoryService.createCategory(this.createCategory).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Danh mục đã được tạo' });
        this.loadCategories(); // Reload categories after creation
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }

  editCategory(category: CategoryDto): void {
    this.categoryService.updateCategory(category).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Danh mục đã được cập nhật' });
        this.loadCategories(); // Reload categories after update
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }
}

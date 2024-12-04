import { Component, OnInit } from '@angular/core';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ColorService } from '../../../core/services/color.service';
import { firstValueFrom } from 'rxjs';
import { ColorDto } from '../../../core/models/color.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-color',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule, ReactiveFormsModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-color.component.html',
  styleUrl: './manage-color.component.css'
})
export class ManageColorComponent implements OnInit {
  visible: boolean = false;

  colors: ColorDto[] = [];

  statuses!: SelectItem[];

  clonedColors: { [id: number]: ColorDto } = {};

  createColorForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl(true),
  });

  searchValue: string = '';

  ngOnInit(): void {
    this.statuses = [
      { label: 'Hoạt động', value: true },
      { label: 'Ngừng bán', value: false }
    ];
    this.loadColors();
  }

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private colorService: ColorService) { }

  showDialog() {
    this.visible = true;
    this.createColorForm.reset({ status: true });
  }

  onRowEditInit(color: ColorDto) {
    this.clonedColors[color.id as number] = { ...color };
  }

  onRowEditSave(color: ColorDto, index: number) {
    if (color.name?.trim().length !== 0) {
      this.editColor(color);
      delete this.clonedColors[color.id as number];
    } else {
      this.colors[index] = this.clonedColors[color.id as number];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(color: ColorDto, index: number) {
    this.colors[index] = this.clonedColors[color.id as number];
    delete this.clonedColors[color.id as number];
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

  async loadColors(): Promise<void> {
    try {
      const data = await firstValueFrom(this.colorService.getAllColors());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.colors = data.result;
      }
    } catch (error) {
      console.error('Error fetching colors', error);
    }
  }

  createNewColor(): void {
    if (this.createColorForm.valid) {
      const newColor: ColorDto = this.createColorForm.value;
      this.colorService.createColor(newColor).subscribe({
        next: response => {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Màu sắc đã được tạo' });
          this.loadColors(); // Reload colors after creation
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng điền đầy đủ thông tin' });
    }
  }

  editColor(color: ColorDto): void {
    this.colorService.updateColor(color).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Màu sắc đã được cập nhật' });
        this.loadColors(); // Reload colors after update
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }
}

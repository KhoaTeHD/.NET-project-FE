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
import { NationService } from '../../../core/services/nation.service';
import { firstValueFrom } from 'rxjs';
import { NationDto } from '../../../core/models/nation.model';

@Component({
  selector: 'app-manage-country',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-country.component.html',
  styleUrl: './manage-country.component.css'
})
export class ManageCountryComponent implements OnInit {
  visible: boolean = false;

  nations: NationDto[] = [];

  statuses!: SelectItem[];

  clonedNations: { [id: number]: NationDto } = {};

  createNation: NationDto = {};

  searchValue: string = '';

  ngOnInit(): void {
    this.statuses = [
      { label: 'Hoạt động', value: true },
      { label: 'Ngừng bán', value: false }
    ];
    this.loadNations();
  }

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private nationService: NationService) { }

  showDialog() {
    this.visible = true;
  }

  onRowEditInit(nation: NationDto) {
    this.clonedNations[nation.id as number] = { ...nation };
  }

  onRowEditSave(nation: NationDto, index: number) {
    if (nation.name?.trim().length !== 0) {
      this.editNation(nation);
      delete this.clonedNations[nation.id as number];
    } else {
      this.nations[index] = this.clonedNations[nation.id as number];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(nation: NationDto, index: number) {
    this.nations[index] = this.clonedNations[nation.id as number];
    delete this.clonedNations[nation.id as number];
  }

  deleteNation(nation: NationDto) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa ' + nation.name + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.nationService.deleteNation(nation.id as number).subscribe({
          next: () => {
            this.nations = this.nations.filter((val) => val.id !== nation.id);
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa quốc gia', life: 3000 });
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

  async loadNations(): Promise<void> {
    try {
      const data = await firstValueFrom(this.nationService.getAllNations());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.nations = data.result;
      }
    } catch (error) {
      console.error('Error fetching nations', error);
    }
  }

  createNewNation(): void {
    this.nationService.createNation(this.createNation).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Quốc gia đã được tạo' });
        this.loadNations(); // Reload nations after creation
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }

  editNation(nation: NationDto): void {
    this.nationService.updateNation(nation).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Quốc gia đã được cập nhật' });
        this.loadNations(); // Reload nations after update
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
  }
}
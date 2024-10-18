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
  selector: 'app-manage-country',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-country.component.html',
  styleUrl: './manage-country.component.css'
})
export class ManageCountryComponent {

  nations = [
    { Nat_ID: 1, Nat_Name: 'Việt Nam', Nat_Status: 1 },
    { Nat_ID: 2, Nat_Name: 'Hoa Kỳ', Nat_Status: 1 },
    { Nat_ID: 3, Nat_Name: 'Nhật Bản', Nat_Status: 1 },
    { Nat_ID: 4, Nat_Name: 'Hàn Quốc', Nat_Status: 1 },
    { Nat_ID: 5, Nat_Name: 'Pháp', Nat_Status: 0 }
  ];

  statuses!: SelectItem[];

  clonedNations: { [id: number]: Nation } = {};

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

  onRowEditInit(nation: Nation) {
    this.clonedNations[nation.Nat_ID as number] = { ...nation };
  }

  onRowEditSave(nation: Nation, index: number) {
    if (nation.Nat_Name.trim().length !== 0) {
      delete this.clonedNations[nation.Nat_ID as number];
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Quốc gia đã được cập nhật' });
    } else {
      this.nations[index] = this.clonedNations[nation.Nat_ID as number];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(nation: Nation, index: number) {
    this.nations[index] = this.clonedNations[nation.Nat_ID as number];
    delete this.clonedNations[nation.Nat_ID as number];
  }

  deleteNation(nation: Nation) {
    this.confirmationService.confirm({
        message: 'Bạn có chắc xóa ' + nation.Nat_Name + ' không?',
        header: 'Xác nhận',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.nations = this.nations.filter((val) => val.Nat_ID !== nation.Nat_ID);
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa quốc gia', life: 3000 });
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

interface Nation{
  Nat_ID: number;
  Nat_Name: string;
  Nat_Status: number;
}
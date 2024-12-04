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
import { UserDto } from '../../../core/models/auth/user-dto.model';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule, InputIconModule, ConfirmDialogModule, DialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit {
  users: UserDto[] = [];
  statuses!: SelectItem[];
  createUser: UserDto = {
    id: '',
    name: '',
    avatarUrl: '',
    email: '',
    phoneNumber: '',
    status: true,
    birthDate: '',
    gender: ''
  };
  clonedUsers: { [id: string]: UserDto } = {};
  visible: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.statuses = [
      { label: 'Hoạt động', value: true },
      { label: 'Chặn', value: false }
    ];
    this.loadUsers();
  }

  showDialog() {
    this.visible = true;
    // this.createUser = { status: true };
  }

  handleInput(event: Event, dt: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
        dt.filterGlobal(inputElement.value, 'contains');
    }
  }

  onRowEditInit(user: UserDto) {
    this.clonedUsers[user.id] = { ...user };
  }

  onRowEditSave(user: UserDto, index: number) {
    if (user.name?.trim().length !== 0) {
      //this.editUser(user);
      delete this.clonedUsers[user.id];
    } else {
      this.users[index] = this.clonedUsers[user.id];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(user: UserDto, index: number) {
    this.users[index] = this.clonedUsers[user.id];
    delete this.clonedUsers[user.id];
  }

  deleteUser(user: UserDto) {
    this.confirmationService.confirm({
        message: 'Bạn có chắc xóa ' + user.name + ' không?',
        header: 'Xác nhận',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter((val) => val.id !== user.id);
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa người dùng', life: 3000 });
        }
    });
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

  async loadUsers(): Promise<void> {
    try {
      const data = await firstValueFrom(this.authService.getAllUsers());
      if (Array.isArray(data)) {
        this.users = data;
      }
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }

  // createNewUser(): void {
  //   this.authService.register(this.createUser).subscribe({
  //     next: response => {
  //       this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Người dùng đã được tạo' });
  //       this.loadUsers(); // Reload users after creation
  //     },
  //     error: err => {
  //       this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
  //     }
  //   });
  // }

  // editUser(user: UserDto): void {
  //   this.authService.updateUser(user).subscribe({
  //     next: response => {
  //       this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Người dùng đã được cập nhật' });
  //       this.loadUsers(); // Reload users after update
  //     },
  //     error: err => {
  //       this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
  //     }
  //   });
  // }
}

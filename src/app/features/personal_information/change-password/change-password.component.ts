import { Component } from '@angular/core';
import { SidebarPersonalInfoComponent } from '../../../shared/components/sidebar-personal-info/sidebar-personal-info.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenStorageService } from '../../../core/services/auth/token-storage.service';
import { UserDto } from '../../../core/models/auth/user-dto.model';
import { MessageService } from 'primeng/api'; // Import MessageService
import { ToastModule } from 'primeng/toast';
// npm install sweetalert2
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [SidebarPersonalInfoComponent, HeaderComponent, FormsModule, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
  providers: [MessageService],
})
export class ChangePasswordComponent {
  isPasswordVisible: boolean = false;
  PasswordVisible = "Hiện";
  isNewPasswordVisible: boolean = false;
  NewPasswordVisible = "Hiện";
  isReInputNewPasswordVisible: boolean = false;
  ReInputNewPasswordVisible = "Hiện";
  isLoading = false;
  userDto: UserDto | null = null;
  avatarUrl: string | null = null;

  changePassword_F: FormGroup = new FormGroup({
    old_password: new FormControl('', [Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{1,}$/)]),
    new_password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{1,}$/) // Yêu cầu chữ hoa, chữ thường và ký tự đặc biệt
    ]),
    re_password: new FormControl('', [Validators.required]),
  }, { validators: mustMatch('new_password', 're_password') });

  constructor(
    private tokenStorageService: TokenStorageService,
    private messageService: MessageService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    const storedUser = this.tokenStorageService.getUser();
    if (storedUser) {
      this.userDto = storedUser;
      this.avatarUrl = this.userDto!.avatarUrl;
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.PasswordVisible = this.isPasswordVisible === true ? "Ẩn" : "Hiện";
  }

  toggleNewPasswordVisibility() {
    this.isNewPasswordVisible = !this.isNewPasswordVisible;
    this.NewPasswordVisible = this.isNewPasswordVisible === true ? "Ẩn" : "Hiện";
  }

  toggleReInputNewPasswordVisibility() {
    this.isReInputNewPasswordVisible = !this.isReInputNewPasswordVisible;
    this.ReInputNewPasswordVisible = this.isReInputNewPasswordVisible === true ? "Ẩn" : "Hiện";
  }

  preventPaste(event: ClipboardEvent): void {
    event.preventDefault(); // Ngăn không cho dán nội dung
  }

  async changePassword(): Promise<void> {
    const result = await Swal.fire({
      title: 'Xác nhận thay đổi mật khẩu?',
      text: 'Bạn có chắn chắn muốn thay đổi mật khẩu?',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Chấp nhận',
    });

    if (result.isConfirmed && this.changePassword_F.valid) {
      this.isLoading = true; // Bật chờ loading

      // Gọi API để cập nhật mật khẩu
      this.authService.changePassword(this.changePassword_F.get('old_password')?.value, this.changePassword_F.get('new_password')?.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công!',
            detail: 'Thay đổi mật khẩu thành công!',
          });
          this.changePassword_F.reset();
        },
        error: (err) => {
          this.isLoading = false;
          // Kiểm tra thông báo lỗi cụ thể
          if (err.error && err.error.message) {
            switch (err.error.message) {
              case 'Old password is incorrect':
                this.messageService.add({
                  severity: 'error',
                  summary: 'Thất bại!',
                  detail: 'Mật khẩu cũ không chính xác!',
                });
                break;
              default:
                this.messageService.add({
                  severity: 'error',
                  summary: 'Thất bại!',
                  detail: err.error.message,
                });
                break;
            }
          }
        },
      });
    }
  }
}

export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
      return null; // Nếu có lỗi khác, không thực thi
    }

    // Xác nhận khớp mật khẩu
    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ mustMatch: true });
    } else {
      matchingControl?.setErrors(null);
    }

    return null;
  };
}

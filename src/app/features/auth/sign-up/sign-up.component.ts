import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrationRequestDto } from '../../../core/models/auth/registration-request-dto.model';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api'; // Import MessageService
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [MessageService],
})
export class SignUpComponent {
  isPasswordVisible: boolean = false;
  PasswordVisible = "Hiện";
  isReInputPasswordVisible: boolean = false;
  ReInputPasswordVisible = "Hiện";
  today: string = '';
  registrationRequestDto: RegistrationRequestDto = {
    name: '',
    email: '',
    phoneNumber: '',
    gender: 'Nam',
    password: '',
    status: true,
    birthDate: new Date().toISOString().split('T')[0],
    role: 'CUSTOMER'// Optional field
  }

  loginF: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    birthDate: new FormControl(this.registrationRequestDto.birthDate, [Validators.required]),
    gender: new FormControl(this.registrationRequestDto.gender, [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{1,}$/) // Yêu cầu chữ hoa, chữ thường và ký tự đặc biệt
    ]),
    re_password: new FormControl('', [Validators.required]),
  }, { validators: mustMatch('password', 're_password') });

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    // Lấy ngày hiện tại dưới dạng chuỗi 'YYYY-MM-DD'
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0]; // Chuỗi định dạng phù hợp với input[type="date"]
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.PasswordVisible = this.isPasswordVisible === true ? "Ẩn" : "Hiện";
  }

  toggleReInputPasswordVisibility() {
    this.isReInputPasswordVisible = !this.isReInputPasswordVisible;
    this.ReInputPasswordVisible = this.isReInputPasswordVisible === true ? "Ẩn" : "Hiện";
  }

  register(): void {
    if (this.loginF.valid) {
      // Cập nhật registrationRequestDto từ giá trị của form
      this.registrationRequestDto = {
        ...this.registrationRequestDto,
        ...this.loginF.value // Cập nhật các giá trị từ form vào DTO
      };
      this.authService.register(this.registrationRequestDto).subscribe({
        next: response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Đăng ký thành công!',
            detail: 'Vui lòng đăng nhập để mua hàng!'
          });
          // Đợi 1 giây rồi điều hướng đến trang đăng nhập
          setTimeout(() => {
            this.router.navigate(['/sign-in']); // Điều hướng sau 1 giây
          }, 1000); // 1000ms = 1 giây
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Đăng ký thất bại!'
          });
        }
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

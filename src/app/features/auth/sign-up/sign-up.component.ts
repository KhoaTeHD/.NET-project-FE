import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrationRequestDto } from '../../../core/models/auth/registration-request-dto.model';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api'; // Import MessageService
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

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
  isLoading = false;
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

  sign_up_F: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    birthDate: new FormControl(this.registrationRequestDto.birthDate, [Validators.required]),
    gender: new FormControl(this.registrationRequestDto.gender, [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,20}$/)
    ]),
    re_password: new FormControl('', [Validators.required]),
  }, { validators: mustMatch('password', 're_password') });

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }


  ngOnInit() {
    // Lấy ngày hiện tại dưới dạng chuỗi 'YYYY-MM-DD'
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0]; // Chuỗi định dạng phù hợp với input[type="date"]

    // Thêm Async Validator sau khi FormGroup đã được tạo
    this.sign_up_F.controls['phoneNumber'].addAsyncValidators(
      uniqueFieldValidator(this.authService, 'phoneNumber')
    );

    this.sign_up_F.controls['email'].addAsyncValidators(
      uniqueFieldValidator(this.authService, 'email')
    );
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.PasswordVisible = this.isPasswordVisible === true ? "Ẩn" : "Hiện";
  }

  toggleReInputPasswordVisibility() {
    this.isReInputPasswordVisible = !this.isReInputPasswordVisible;
    this.ReInputPasswordVisible = this.isReInputPasswordVisible === true ? "Ẩn" : "Hiện";
  }

  preventPaste(event: ClipboardEvent): void {
    event.preventDefault(); // Ngăn không cho dán nội dung
  }

  register(): void {
    if (this.sign_up_F.valid) {
      this.isLoading = true;
      // Cập nhật registrationRequestDto từ giá trị của form
      this.registrationRequestDto = {
        ...this.registrationRequestDto,
        ...this.sign_up_F.value // Cập nhật các giá trị từ form vào DTO
      };

      this.authService.register(this.registrationRequestDto).subscribe({
        next: response => {
          this.isLoading = false;
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
          this.isLoading = false;
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

export function uniqueFieldValidator(authService: AuthService, field: string): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null); // Không cần kiểm tra nếu không có giá trị
    }
    return authService.checkUnique(field, control.value).pipe(
      map(isUnique => (isUnique ? null : { unique: true })), // Nếu không unique thì báo lỗi
      catchError(() => of(null)) // Xử lý lỗi (nếu có) để không ảnh hưởng form
    );
  };
}

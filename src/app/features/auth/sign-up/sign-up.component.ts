import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrationRequestDto } from '../../../core/models/auth/registration-request-dto.model';
import { AuthService } from '../../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  isPasswordVisible: boolean = false;
  PasswordVisible = "Hiện";
  isReInputPasswordVisible: boolean = false;
  ReInputPasswordVisible = "Hiện";
  registrationRequestDto: RegistrationRequestDto = {
    name: '',
    email: '',
    phoneNumber: '',
    birthDateTemp: new Date(),
    gender: 'Nam',
    password: '',
    status: true,
    birthDate: '',
    role: 'CUSTOMER'// Optional field
  }

  constructor(private authService: AuthService) {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.PasswordVisible = this.isPasswordVisible === true ? "Ẩn" : "Hiện";
  }

  toggleReInputPasswordVisibility() {
    this.isReInputPasswordVisible = !this.isReInputPasswordVisible;
    this.ReInputPasswordVisible = this.isReInputPasswordVisible === true? "Ẩn" : "Hiện";
  }

  register(): void {
    this.authService.register(this.registrationRequestDto).subscribe({
      next: response => {
        console.log('Đăng ký và gán vai trò thành công:', response);
        alert('Đăng ký thành công!');
      },
      error: err => {
        console.error('Lỗi khi đăng ký hoặc gán vai trò:', err);
        alert('Đăng ký thất bại!');
      }
    });
  }
}

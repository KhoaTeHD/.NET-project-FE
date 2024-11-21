import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { TokenStorageService } from '../../../core/services/auth/token-storage.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  isPasswordVisible: boolean = false;
  PasswordVisible = "Hiện";
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.PasswordVisible = this.isPasswordVisible === true? "Ẩn" : "Hiện";
  }

  signIn(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        console.log('Đăng nhập thành công:', response);
        this.tokenStorageService.saveToken(response.result.token);
        alert('Đăng nhập thành công!');
      },
      error: err => {
        console.error('Đăng nhập thất bại:', err);
        alert('Đăng nhập thất bại!');
      }
    });
  }
}

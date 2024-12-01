import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { TokenStorageService } from '../../../core/services/auth/token-storage.service';
import { MessageService } from 'primeng/api'; // Import MessageService
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, ToastModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  providers: [MessageService],
})
export class SignInComponent {
  isPasswordVisible: boolean = false;
  PasswordVisible = "Hiện";
  isLoading: boolean = false;
  loginF: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, 
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{1,}$/)])
  });

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService, 
    private router: Router,
    private messageService: MessageService
  ) { }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.PasswordVisible = this.isPasswordVisible === true ? "Ẩn" : "Hiện";
  }

  preventPaste(event: ClipboardEvent): void {
    event.preventDefault(); // Ngăn không cho dán nội dung
  }

  signIn(): void {
    this.isLoading = true;
    this.authService.login(this.loginF.value.email.trim(), this.loginF.value.password.trim()).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.tokenStorageService.saveToken(response.result.token);
        this.tokenStorageService.saveUser(response.result.user);
        this.messageService.add({
          severity: 'success',
          summary: 'Đăng nhập thành công!',
        });
        // Đợi 1 giây rồi điều hướng đến trang đăng nhập
        setTimeout(() => {
          this.router.navigate(['/']); // Điều hướng sau 1 giây
        }, 1000); // 1000ms = 1 giây
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Đăng nhập thất bại!',
          detail: "Email hoặc mật khẩu không đúng!"
        });
      }
    });
  }
}

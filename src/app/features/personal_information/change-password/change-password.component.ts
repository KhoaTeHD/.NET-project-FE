import { Component } from '@angular/core';
import { SidebarPersonalInfoComponent } from '../../../shared/components/sidebar-personal-info/sidebar-personal-info.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [SidebarPersonalInfoComponent, HeaderComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  isPasswordVisible: boolean = false;
  PasswordVisible = "Hiện";
  isNewPasswordVisible: boolean = false;
  NewPasswordVisible = "Hiện";
  isReInputNewPasswordVisible: boolean = false;
  ReInputNewPasswordVisible = "Hiện";

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
    this.ReInputNewPasswordVisible = this.isReInputNewPasswordVisible === true? "Ẩn" : "Hiện";
  }
}

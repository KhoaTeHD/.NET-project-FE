import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  isPasswordVisible: boolean = false;
  PasswordVisible = "Hiện";
  isReInputPasswordVisible: boolean = false;
  ReInputPasswordVisible = "Hiện";

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.PasswordVisible = this.isPasswordVisible === true ? "Ẩn" : "Hiện";
  }

  toggleReInputPasswordVisibility() {
    this.isReInputPasswordVisible = !this.isReInputPasswordVisible;
    this.ReInputPasswordVisible = this.isReInputPasswordVisible === true? "Ẩn" : "Hiện";
  }
}

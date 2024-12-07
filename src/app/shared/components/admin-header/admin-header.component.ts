import { Component } from '@angular/core';
import { TokenStorageService } from '../../../core/services/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  logout(): void {
    this.tokenStorageService.clearToken();
    this.tokenStorageService.deleteUser();
    this.router.navigate(['/sign-in']);
  }
}

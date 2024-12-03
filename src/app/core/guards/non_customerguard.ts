import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../services/auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NonCustomerGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

  canActivate(): boolean {
    const token = this.tokenStorageService.getToken();

    if (!token) {
        return true;
    }

    // Nếu không có quyền, chuyển hướng đến trang login
    this.router.navigate(['/']);
    return false;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../services/auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

  canActivate(): boolean {
    const token = this.tokenStorageService.getToken();

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userRole = payload.role;

      if (userRole === 'CUSTOMER') {
        return true;
      }
    }

    // Nếu không có quyền, chuyển hướng đến trang login
    this.router.navigate(['/sign-in']);
    return false;
  }
}

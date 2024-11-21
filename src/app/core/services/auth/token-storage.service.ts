import { Injectable } from '@angular/core';
//npm install ngx-cookie-service
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private tokenKey = 'token';

  constructor(private cookieService: CookieService) {}

  // Lưu token vào cookie
  saveToken(token: string, expiresInDays: number = 1): void {
    this.cookieService.set(this.tokenKey, token, expiresInDays, '/', '', true, 'Strict');
  }

  // Lấy token từ cookie
  getToken(): string | null {
    return this.cookieService.get(this.tokenKey) || null;
  }

  // Xóa token khỏi cookie
  clearToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
  }
}

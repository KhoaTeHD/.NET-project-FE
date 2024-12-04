import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../../../models/auth/user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ShareUserDtoService {
  private userSubject = new BehaviorSubject<UserDto | null>(null);
  
  user$ = this.userSubject.asObservable(); // Observable để các component đăng ký lắng nghe

  constructor() { }

  // Phương thức để cập nhật userDto
  setUser(user: UserDto): void {
    this.userSubject.next(user);
  }

  // Phương thức để lấy userDto
  getUser(): UserDto | null {
    return this.userSubject.value;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { RegistrationRequestDto } from '../../models/auth/registration-request-dto.model';
import { LoginResponseDto } from '../../models/auth/login-response-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7244/api/AuthAPI';

  constructor(private http: HttpClient) { }

  // Đăng ký
  // Một Observable chứa phản hồi từ API. Angular sử dụng Observable để xử lý các yêu cầu HTTP bất đồng bộ.
  register(registrationRequestDto: RegistrationRequestDto): Observable<any> {
    console.log('Dữ liệu gửi:', registrationRequestDto);
    // Chuyển đổi birthDate sang ISO-8601
    registrationRequestDto.birthDate = new Date(registrationRequestDto.birthDateTemp).toISOString();
    registrationRequestDto.phoneNumber = registrationRequestDto.phoneNumber.toString();
    return this.http.post(`${this.baseUrl}/register`, registrationRequestDto).pipe(
      switchMap(() => this.assignRole(registrationRequestDto)) // Gán vai trò sau khi đăng ký thành công
    );
  }

  // Đăng nhập
  login(email: string, password: string): Observable<any> {
    // Tạo đối tượng chứa dữ liệu đăng nhập
    const loginData = {
      email: email,
      password: password
    };

    // Gửi yêu cầu POST đến endpoint /login với loginData
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }


  // assignRole
  assignRole(registrationRequestDto: RegistrationRequestDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/AssignRole`, registrationRequestDto);
  }
}

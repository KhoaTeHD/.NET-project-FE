import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { RegistrationRequestDto } from '../../models/auth/registration-request-dto.model';
import { UserDto } from '../../models/auth/user-dto.model';
import { ApiResponse } from '../../models/auth/api-resonse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7244/api/AuthAPI';

  constructor(private http: HttpClient) { }

  // Đăng ký
  // Một Observable chứa phản hồi từ API. Angular sử dụng Observable để xử lý các yêu cầu HTTP bất đồng bộ.
  register(registrationRequestDto: RegistrationRequestDto): Observable<any> {
    // Chuyển đổi birthDate sang ISO-8601
    registrationRequestDto.birthDate = new Date(registrationRequestDto.birthDate).toISOString();
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

  // get
  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.baseUrl}`);
  }

  // assignRole
  assignRole(registrationRequestDto: RegistrationRequestDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/AssignRole`, registrationRequestDto);
  }

  // Kiểm tra phone và email
  checkUnique(field: string, value: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/checkUnique?field=${field}&value=${value}`);
  }

  checkDuplicateForUpdate(userId: string, field: string, value: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/checkDuplicateForUpdate`, { params: { userId, field, value } });
  }

  updateUser(user: UserDto): Observable<ApiResponse<UserDto>> {
    const url = `${this.baseUrl}/${user.id}`;
    user.birthDate = new Date(user.birthDate).toISOString(); // Chuyển đổi birthDate
    console.log('Payload being sent to API:', user); // Log toàn bộ payload
    return this.http.put<ApiResponse<UserDto>>(url, user).pipe(
      catchError((err) => {
        console.error('Error in updateUser:', err); // Log lỗi chi tiết
        return throwError(() => err);
      })
    );
  }
  
}

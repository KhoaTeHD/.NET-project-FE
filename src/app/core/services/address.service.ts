import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressDto } from '../models/address.model';
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private baseUrl = 'https://localhost:7777/api/Address'; // Base URL của API

  constructor(private http: HttpClient) { }

  // Lấy danh sách tất cả các Address (GET /api/Address)
  getAllAddresss(): Observable<ApiResponse<AddressDto[]>> {
    return this.http.get<ApiResponse<AddressDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một Address theo ID (GET /api/Address/{id})
  getAddressById(id: number): Observable<ApiResponse<AddressDto>> {
    return this.http.get<ApiResponse<AddressDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một Address (POST /api/Address)
  createAddress(address: AddressDto): Observable<ApiResponse<AddressDto>> {
    return this.http.post<ApiResponse<AddressDto>>(`${this.baseUrl}`, address);
  }

  // Cập nhật thông tin Address (PUT /api/Address)
  updateAddress(address: AddressDto): Observable<ApiResponse<AddressDto>> {
    return this.http.put<ApiResponse<AddressDto>>(`${this.baseUrl}`, address);
  }

  // Xóa một Address theo ID (DELETE /api/Address/{id})
  deleteAddress(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  // Lấy danh sách Address theo customerId (GET /api/Address/customer/{customerId})
  getAddressesByCustomerId(customerId: string): Observable<ApiResponse<AddressDto[]>> {
    return this.http.get<ApiResponse<AddressDto[]>>(`${this.baseUrl}/customer/${customerId}`);
  }

  setDefaultAddress(addressId: number, customerId: string): Observable<ApiResponse<void>> {
    const url = `${this.baseUrl}/set-default/${addressId}`;
    console.log('Calling API URL:', url);  // Đảm bảo URL là đúng
    return this.http.put<ApiResponse<void>>(`${this.baseUrl}/set-default/${addressId}/${customerId}`, null);
  }
}

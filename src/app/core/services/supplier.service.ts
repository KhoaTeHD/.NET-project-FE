import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface
import { SupplierDto } from '../models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private baseUrl = 'https://localhost:7777/api/Supplier'; // Base URL của API

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các Supplier (GET /api/Supplier)
  getAllSuppliers(): Observable<ApiResponse<SupplierDto[]>> {
    return this.http.get<ApiResponse<SupplierDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một Supplier theo ID (GET /api/Supplier/{id})
  getSupplierById(id: number): Observable<ApiResponse<SupplierDto>> {
    return this.http.get<ApiResponse<SupplierDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một Supplier (POST /api/Supplier)
  createSupplier(supplier: SupplierDto): Observable<ApiResponse<SupplierDto>> {
    return this.http.post<ApiResponse<SupplierDto>>(`${this.baseUrl}`, supplier);
  }

  // Cập nhật thông tin Supplier (PUT /api/Supplier)
  updateSupplier(supplier: SupplierDto): Observable<ApiResponse<SupplierDto>> {
    return this.http.put<ApiResponse<SupplierDto>>(`${this.baseUrl}`, supplier);
  }

  // Xóa một Supplier theo ID (DELETE /api/Supplier/{id})
  deleteSupplier(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}

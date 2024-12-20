import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandDto } from '../models/brand.model';
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private baseUrl = 'https://localhost:7777/api/Brand'; // Base URL của API

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các Brand (GET /api/Brand)
  getAllBrands(): Observable<ApiResponse<BrandDto[]>> {
    return this.http.get<ApiResponse<BrandDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một Brand theo ID (GET /api/Brand/{id})
  getBrandById(id: number): Observable<ApiResponse<BrandDto>> {
    return this.http.get<ApiResponse<BrandDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một Brand (POST /api/Brand)
  createBrand(brand: BrandDto): Observable<ApiResponse<BrandDto>> {
    return this.http.post<ApiResponse<BrandDto>>(`${this.baseUrl}`, brand, {headers: {'Content-Type': 'application/json'}});
  }

  // Cập nhật thông tin Brand (PUT /api/Brand)
  updateBrand(brand: BrandDto): Observable<ApiResponse<BrandDto>> {
    return this.http.put<ApiResponse<BrandDto>>(`${this.baseUrl}`, brand, {headers: {'Content-Type': 'application/json'}});
  }

  // Xóa một Brand theo ID (DELETE /api/Brand/{id})
  deleteBrand(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}

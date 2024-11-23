import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SizeDto } from '../models/size.model';
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  private baseUrl = 'https://localhost:7777/api/Size'; // Base URL của API

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các Size (GET /api/Size)
  getAllSizes(): Observable<ApiResponse<SizeDto[]>> {
    return this.http.get<ApiResponse<SizeDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một Size theo ID (GET /api/Size/{id})
  getSizeById(id: number): Observable<ApiResponse<SizeDto>> {
    return this.http.get<ApiResponse<SizeDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một Size (POST /api/Size)
  createSize(size: SizeDto): Observable<ApiResponse<SizeDto>> {
    return this.http.post<ApiResponse<SizeDto>>(`${this.baseUrl}`, size);
  }

  // Cập nhật thông tin Size (PUT /api/Size)
  updateSize(size: SizeDto): Observable<ApiResponse<SizeDto>> {
    return this.http.put<ApiResponse<SizeDto>>(`${this.baseUrl}`, size);
  }

  // Xóa một Size theo ID (DELETE /api/Size/{id})
  deleteSize(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}

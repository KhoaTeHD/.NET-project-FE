import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColorDto } from '../models/color.model';
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private baseUrl = 'https://localhost:7777/api/Color'; // Base URL của API

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các Color (GET /api/Color)
  getAllColors(): Observable<ApiResponse<ColorDto[]>> {
    return this.http.get<ApiResponse<ColorDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một Color theo ID (GET /api/Color/{id})
  getColorById(id: number): Observable<ApiResponse<ColorDto>> {
    return this.http.get<ApiResponse<ColorDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một Color (POST /api/Color)
  createColor(color: ColorDto): Observable<ApiResponse<ColorDto>> {
    return this.http.post<ApiResponse<ColorDto>>(`${this.baseUrl}`, color);
  }

  // Cập nhật thông tin Color (PUT /api/Color)
  updateColor(color: ColorDto): Observable<ApiResponse<ColorDto>> {
    return this.http.put<ApiResponse<ColorDto>>(`${this.baseUrl}`, color);
  }

  // Xóa một Color theo ID (DELETE /api/Color/{id})
  deleteColor(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}

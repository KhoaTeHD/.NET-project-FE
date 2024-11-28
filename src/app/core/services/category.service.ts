import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { CategoryDto } from '../models/category.model';
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'https://localhost:7777/api/Category'; // Base URL của API

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các Category (GET /api/Category)
  getAllCategorys(): Observable<ApiResponse<CategoryDto[]>> {
    return this.http.get<ApiResponse<CategoryDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một Category theo ID (GET /api/Category/{id})
  getCategoryById(id: number): Observable<ApiResponse<CategoryDto>> {
    return this.http.get<ApiResponse<CategoryDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một Category (POST /api/Category)
  createCategory(category: CategoryDto): Observable<ApiResponse<CategoryDto>> {
    return this.http.post<ApiResponse<CategoryDto>>(
      `${this.baseUrl}`,
      category
    );
  }

  // Cập nhật thông tin Category (PUT /api/Category)
  updateCategory(category: CategoryDto): Observable<ApiResponse<CategoryDto>> {
    return this.http.put<ApiResponse<CategoryDto>>(`${this.baseUrl}`, category);
  }

  // Xóa một Category theo ID (DELETE /api/Category/{id})
  deleteCategory(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  /**--------------------------------------H------------------------------------------- */
  async getCategorys(): Promise<CategoryDto[] | undefined> {
    try {
      const data = await firstValueFrom(this.getAllCategorys());
      if (data.isSuccess && Array.isArray(data.result)) {
        return data.result;
      }
    } catch (error) {
      console.error('Error fetching categorys', error);
    }
    return undefined; // Add a return statement at the end of the function
  }
}

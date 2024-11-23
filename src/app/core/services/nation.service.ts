import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NationDto } from '../models/nation.model';
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class NationService {
  private baseUrl = 'https://localhost:7777/api/Nation'; // Base URL của API

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các Nation (GET /api/Nation)
  getAllNations(): Observable<ApiResponse<NationDto[]>> {
    return this.http.get<ApiResponse<NationDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một Nation theo ID (GET /api/Nation/{id})
  getNationById(id: number): Observable<ApiResponse<NationDto>> {
    return this.http.get<ApiResponse<NationDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một Nation (POST /api/Nation)
  createNation(nation: NationDto): Observable<ApiResponse<NationDto>> {
    return this.http.post<ApiResponse<NationDto>>(`${this.baseUrl}`, nation);
  }

  // Cập nhật thông tin Nation (PUT /api/Nation)
  updateNation(nation: NationDto): Observable<ApiResponse<NationDto>> {
    return this.http.put<ApiResponse<NationDto>>(`${this.baseUrl}`, nation);
  }

  // Xóa một Nation theo ID (DELETE /api/Nation/{id})
  deleteNation(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}

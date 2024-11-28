import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoodsReceiptDto } from '../models/goodsReceipt.model';
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptService {
  private baseUrl = 'https://localhost:7777/api/GoodsReceipt'; // Base URL của API

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các GoodsReceipt (GET /api/GoodsReceipt)
  getAllGoodsReceipts(): Observable<ApiResponse<GoodsReceiptDto[]>> {
    return this.http.get<ApiResponse<GoodsReceiptDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một GoodsReceipt theo ID (GET /api/GoodsReceipt/{id})
  getGoodsReceiptById(id: number): Observable<ApiResponse<GoodsReceiptDto>> {
    return this.http.get<ApiResponse<GoodsReceiptDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một GoodsReceipt (POST /api/GoodsReceipt)
  createGoodsReceipt(goodsReceipt: GoodsReceiptDto): Observable<ApiResponse<GoodsReceiptDto>> {
    return this.http.post<ApiResponse<GoodsReceiptDto>>(`${this.baseUrl}`, goodsReceipt);
  }

  // Cập nhật thông tin GoodsReceipt (PUT /api/GoodsReceipt)
  updateGoodsReceipt(goodsReceipt: GoodsReceiptDto): Observable<ApiResponse<GoodsReceiptDto>> {
    return this.http.put<ApiResponse<GoodsReceiptDto>>(`${this.baseUrl}`, goodsReceipt);
  }

  // Xóa một GoodsReceipt theo ID (DELETE /api/GoodsReceipt/{id})
  deleteGoodsReceipt(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}

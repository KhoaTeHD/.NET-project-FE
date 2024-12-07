import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductVariationDto } from '../models/productVariation.model'; // Đường dẫn tới ProductVariationDto interface
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class ProductVariationService {
  private baseUrl = 'https://localhost:7777/api/ProductVariation'; // Base URL của API ProductVariation

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các ProductVariation (GET /api/ProductVariation)
  getAllProductVariations(): Observable<ApiResponse<ProductVariationDto[]>> {
    return this.http.get<ApiResponse<ProductVariationDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một ProductVariation theo ID (GET /api/ProductVariation/{id})
  getProductVariationById(id: number): Observable<ApiResponse<ProductVariationDto>> {
    return this.http.get<ApiResponse<ProductVariationDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một ProductVariation (POST /api/ProductVariation)
  createProductVariation(variation: ProductVariationDto): Observable<ApiResponse<ProductVariationDto>> {
    return this.http.post<ApiResponse<ProductVariationDto>>(`${this.baseUrl}`, variation);
  }

  // Cập nhật thông tin ProductVariation (PUT /api/ProductVariation)
  updateProductVariation(variation: ProductVariationDto): Observable<ApiResponse<ProductVariationDto>> {
    return this.http.put<ApiResponse<ProductVariationDto>>(`${this.baseUrl}`, variation);
  }

  // Xóa một ProductVariation theo ID (DELETE /api/ProductVariation/{id})
  deleteProductVariation(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  addProductQuantity(id: number, quantity: number): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.baseUrl}/addQuantity/${id}/${quantity}`, null);
  }

  subProductQuantity(id: number, quantity: number): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.baseUrl}/subQuantity/${id}/${quantity}`, null);
  }
}

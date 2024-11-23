import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDto } from '../models/product.model'; // Đường dẫn tới ProductDto interface
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://localhost:7777/api/Product'; // Base URL của API Product

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các Product (GET /api/Product)
  getAllProducts(): Observable<ApiResponse<ProductDto[]>> {
    return this.http.get<ApiResponse<ProductDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một Product theo ID (GET /api/Product/{id})
  getProductById(id: number): Observable<ApiResponse<ProductDto>> {
    return this.http.get<ApiResponse<ProductDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một Product (POST /api/Product/create)
  createProduct(product: ProductDto): Observable<ApiResponse<ProductDto>> {
    return this.http.post<ApiResponse<ProductDto>>(`${this.baseUrl}/create`, product);
  }

  // Thêm mới Product kèm theo variation (POST /api/Product/create-with-variation)
  createProductWithVariation(product: ProductDto): Observable<ApiResponse<ProductDto>> {
    return this.http.post<ApiResponse<ProductDto>>(`${this.baseUrl}/create-with-variation`, product);
  }

  // Cập nhật thông tin Product (PUT /api/Product)
  updateProduct(product: ProductDto): Observable<ApiResponse<ProductDto>> {
    return this.http.put<ApiResponse<ProductDto>>(`${this.baseUrl}`, product);
  }

  // Xóa một Product theo ID (DELETE /api/Product/{id})
  deleteProduct(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDto } from '../models/order.model';
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'https://localhost:7777/api/Order'; // Base URL của API

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các Order (GET /api/Order)
  getAllOrders(): Observable<ApiResponse<OrderDto[]>> {
    return this.http.get<ApiResponse<OrderDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một Order theo ID (GET /api/Order/{id})
  getOrderById(id: number): Observable<ApiResponse<OrderDto>> {
    return this.http.get<ApiResponse<OrderDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một Order (POST /api/Order)
  createOrder(order: OrderDto): Observable<ApiResponse<OrderDto>> {
    return this.http.post<ApiResponse<OrderDto>>(`${this.baseUrl}`, order);
  }

  // Cập nhật thông tin Order (PUT /api/Order)
  updateOrder(order: OrderDto): Observable<ApiResponse<OrderDto>> {
    return this.http.put<ApiResponse<OrderDto>>(`${this.baseUrl}`, order);
  }

  // Xóa một Order theo ID (DELETE /api/Order/{id})
  deleteOrder(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}

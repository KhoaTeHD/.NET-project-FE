import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartDto, CartDtoExtendStatus } from '../models/cart.model'; // Đường dẫn tới CartDto interface
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'https://localhost:7777/api/CartItem'; // Base URL của API

/**
 * 
 * Khúc này để chuyển data từ cart sang payment 
 * 
 */
  private checkedItems: any[] = [];

  setCheckedItems(items: any[]) {
    this.checkedItems = items;
  }

  getCheckedItems(): any[] {
    return this.checkedItems;
  }

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các Cart (GET /api/Cart)
  getAllCarts(): Observable<ApiResponse<CartDto[]>> {
    return this.http.get<ApiResponse<CartDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một Cart theo ID (GET /api/Cart/{id})
  getCartById(id: number): Observable<ApiResponse<CartDto>> {
    return this.http.get<ApiResponse<CartDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một Cart (POST /api/Cart)
  createCart(cart: CartDto): Observable<ApiResponse<CartDto>> {
    return this.http.post<ApiResponse<CartDto>>(`${this.baseUrl}`, cart);
  }

  // Cập nhật thông tin Cart (PUT /api/Cart)
  updateCart(cart: CartDto): Observable<ApiResponse<CartDto>> {
    return this.http.put<ApiResponse<CartDto>>(`${this.baseUrl}`, cart);
  }

  // Xóa một Cart theo ID (DELETE /api/Cart/{id})
  deleteCart(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  // Xóa một Cart theo CartDto (DELETE /api/Cart)
  deleteCartByCartDto(itemToDelete: any): Observable<any> {
    const url = `https://localhost:7777/api/CartItem`;
    return this.http.delete(url, { body: itemToDelete });
  }

  // Lấy thông tin một Cart theo ID (GET /api/Cart/{id})
  getCartItemsByCusId(id: string): Observable<ApiResponse<CartDto[]>> {
    return this.http.get<ApiResponse<CartDto[]>>(`${this.baseUrl}/${id}`);
  }
}

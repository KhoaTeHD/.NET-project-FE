import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CouponDto } from '../models/coupon.model';
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private baseUrl = 'https://localhost:7777/api/Coupon'; // Base URL của API

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các Coupon (GET /api/Coupon)
  getAllCoupons(): Observable<ApiResponse<CouponDto[]>> {
    return this.http.get<ApiResponse<CouponDto[]>>(`${this.baseUrl}`);
  }

  // Lấy thông tin một Coupon theo ID (GET /api/Coupon/{id})
  getCouponById(id: number): Observable<ApiResponse<CouponDto>> {
    return this.http.get<ApiResponse<CouponDto>>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới một Coupon (POST /api/Coupon)
  createCoupon(coupon: CouponDto): Observable<ApiResponse<CouponDto>> {
    return this.http.post<ApiResponse<CouponDto>>(`${this.baseUrl}`, coupon);
  }

  // Cập nhật thông tin Coupon (PUT /api/Coupon)
  updateCoupon(coupon: CouponDto): Observable<ApiResponse<CouponDto>> {
    return this.http.put<ApiResponse<CouponDto>>(`${this.baseUrl}`, coupon);
  }

  // Xóa một Coupon theo ID (DELETE /api/Coupon/{id})
  deleteCoupon(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}

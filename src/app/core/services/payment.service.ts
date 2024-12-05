import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })

export class PaymentService{
  constructor(private http: HttpClient) {}

  async getExchangeRate(): Promise<number> {
    const apiKey = '2d4f3cd5f5fa5f8e9c5fe0ca'; // Thay bằng API Key của bạn
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/VND`;

    try {
      const response: any = await this.http.get(apiUrl).toPromise();
      if (response && response.conversion_rate) {
        return response.conversion_rate; // Trả về tỷ giá USD từ VND
      } else {
        throw new Error('Không thể lấy tỷ giá từ API');
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      return 23000; // Trả về tỷ giá mặc định nếu API thất bại
    }
  }
}

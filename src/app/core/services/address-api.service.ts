import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressApiService {

  constructor(private http: HttpClient) { }

  // Lấy danh sách Tỉnh Thành
  getProvinces(): Observable<any> {
    return this.http.get<any>('https://esgoo.net/api-tinhthanh/1/0.htm');
  }

  // Lấy danh sách Quận Huyện theo Tỉnh Thành
  getDistricts(provinceId: number): Observable<any> {
    return this.http.get<any>(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
  }

  // Lấy danh sách Phường Xã theo Quận Huyện
  getWards(districtId: number): Observable<any> {
    return this.http.get<any>(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
  }
}

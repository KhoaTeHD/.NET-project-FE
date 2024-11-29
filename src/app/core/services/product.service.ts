import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable, of, tap } from 'rxjs';
import { ProductDto } from '../models/product.model'; // Đường dẫn tới ProductDto interface
import { ApiResponse } from '../models/auth/api-resonse.model'; // Đường dẫn tới ApiResponse interface

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://localhost:7777/api/Product'; // Base URL của API Product
  private productCache: { [page: number]: ProductDto[] } = {}; //cái này để cache dữ liệu tăng hjệu suất
  constructor(private http: HttpClient) {}

  getAllProducts_cache(page: number): Observable<ApiResponse<ProductDto[]>> {
    if (this.productCache[page]) {
      return of({
        isSuccess: true,
        message: '',
        result: this.productCache[page],
      });
    } else {
      return this.http
        .get<ApiResponse<ProductDto[]>>(`${this.baseUrl}?page=${page}`)
        .pipe(
          tap((response) => {
            if (response.result) {
              this.productCache[page] = response.result;
            }
          })
        );
    }
  }

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
    return this.http.post<ApiResponse<ProductDto>>(
      `${this.baseUrl}/create`,
      product
    );
  }

  // Thêm mới Product kèm theo variation (POST /api/Product/create-with-variation)
  // createProductWithVariation(product: ProductDto): Observable<ApiResponse<ProductDto>> {
  //   return this.http.post<ApiResponse<ProductDto>>(`${this.baseUrl}/create-with-variation`, product);
  // }

  // Cập nhật thông tin Product (PUT /api/Product)
  updateProduct(product: ProductDto): Observable<ApiResponse<ProductDto>> {
    return this.http.put<ApiResponse<ProductDto>>(`${this.baseUrl}`, product);
  }

  // Xóa một Product theo ID (DELETE /api/Product/{id})
  deleteProduct(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  // Hàm trả về danh sách Product dựa vào cat_Id
  // getProductsByCategoryId(
  //   cat_Id: number
  // ): Observable<ApiResponse<ProductDto[]>> {
  //   return this.http.get<ApiResponse<ProductDto[]>>(
  //     `${this.baseUrl}/products-by-category/${cat_Id}`
  //   );
  // }

  /**------------------Hoàng viết thêm để xử lý lọc sản phẩm---------------- */
  // private productsSubject = new BehaviorSubject<ProductDto[]>([]);
  // products$ = this.productsSubject.asObservable();

  // async getProducts(): Promise<ProductDto[] | undefined> {
  //   try {
  //     const data = await firstValueFrom(this.getAllProducts());
  //     if (data.isSuccess && Array.isArray(data.result)) {
  //       this.productsSubject.next(data.result); // Gán giá trị trả về của hàm getAllProducts vào productsSubject
  //       return data.result;
  //     }
  //   } catch (error) {
  //     console.error('Error fetching products', error);
  //   }
  //   return undefined; // Add a return statement at the end of the function
  // }
  // // Hàm lấy danh sách sản phẩm theo giá giảm dần
  // async getProductsDescPrice(): Promise<ProductDto[] | undefined> {
  //   try {
  //     const data = await firstValueFrom(this.getAllProducts());
  //     if (data.isSuccess && Array.isArray(data.result)) {
  //       const sortedProducts = data.result.sort((a, b) => {
  //         const priceA = a.productVariations?.[0]?.price || 0;
  //         const priceB = b.productVariations?.[0]?.price || 0;
  //         return priceB - priceA;
  //       });
  //       this.productsSubject.next(sortedProducts);
  //       return sortedProducts;
  //     }
  //   } catch (error) {
  //     console.error('Error fetching products', error);
  //   }
  //   return undefined;
  // }

  // async getProductsByColor(
  //   colorIds: number[]
  // ): Promise<ProductDto[] | undefined> {
  //   try {
  //     const data = await firstValueFrom(this.getAllProducts());
  //     if (data.isSuccess && Array.isArray(data.result)) {
  //       const filteredProducts = data.result.filter((product) =>
  //         product.productVariations?.some((variation) =>
  //           colorIds.includes(variation.col_Id)
  //         )
  //       );
  //       this.productsSubject.next(filteredProducts);
  //       return filteredProducts;
  //     }
  //   } catch (error) {
  //     console.error('Error fetching products by color', error);
  //   }
  //   return undefined;
  // }

  // async getFilteredProductsByColor(
  //   products: ProductDto[],
  //   colorIds: number[]
  // ): Promise<ProductDto[] | undefined> {
  //   try {
  //     const filteredProducts = products.filter((product) =>
  //       product.productVariations?.some((variation) =>
  //         colorIds.includes(variation.col_Id)
  //       )
  //     );
  //     this.productsSubject.next(filteredProducts);
  //     return filteredProducts;
  //   } catch (error) {
  //     console.error('Error filtering products by color', error);
  //   }
  //   return undefined;
  // }

  // async getProductsByCategory(
  //   catId: number
  // ): Promise<ProductDto[] | undefined> {
  //   try {
  //     const data = await firstValueFrom(this.getProductsByCategoryId(catId));
  //     if (data.isSuccess && Array.isArray(data.result)) {
  //       this.productsSubject.next(data.result); // Gán giá trị trả về của hàm getAllProducts vào productsSubject
  //       return data.result;
  //     }
  //   } catch (error) {
  //     console.error('Error fetching products by category', error);
  //   }
  //   return undefined; // Add a return statement at the end of the function
  // }
  // // Hàm kiểm tra giá trị keys và trả về danh sách sản phẩm tương ứng
  // async filterProductsByKeys(keys: any): Promise<ProductDto[] | undefined> {
  //   if (
  //     keys.category === -1 &&
  //     keys.color.length === 0 &&
  //     keys.price.length === 0 &&
  //     keys.brands.length === 0 &&
  //     keys.sizes.length === 0 &&
  //     keys.sort === 0
  //   ) {
  //     // Trả về tất cả sản phẩm nếu các giá trị keys bằng null hoặc mảng rỗng
  //     console.log('Keys are invalid or empty, fetching all products');
  //     await this.getProducts();
  //   } else if (keys.category != -1) {
  //     console.log('Fetching products by category:', keys.category);
  //     const productsByCategory = await this.getProductsByCategory(
  //       keys.category
  //     );

  //     if (keys.color.length > 0) {
  //       if (productsByCategory) {
  //         return await this.getFilteredProductsByColor(
  //           productsByCategory,
  //           keys.color
  //         );
  //       }
  //     }

  //     return await this.getProductsByCategory(keys.category);
  //   } else if (keys.sort === 1) {
  //     console.log('Fetching products by sort:', keys.sort);
  //     return await this.getProductsDescPrice();
  //   } else if (keys.color.length > 0) {
  //     console.log('Fetching products by color:', keys.color);
  //     return await this.getProductsByColor(keys.color);
  //   }

  //   console.log('Fetching all products');
  //   return await this.getProducts();
  // }

  // private productsSubject = new BehaviorSubject<ProductDto[]>([]);
  // products$ = this.productsSubject.asObservable();

  // fetchAllProducts(): void {
  //   this.http
  //     .get<ApiResponse<ProductDto[]>>(this.baseUrl)
  //     .subscribe((response) => {
  //       if (response.result) {
  //         this.productsSubject.next(response.result);
  //       }
  //     });
  // }
}

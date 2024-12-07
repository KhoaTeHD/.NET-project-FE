import { Component, OnInit, output, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RelatedProductsComponent } from './related-products/related-products.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AfterViewInit } from '@angular/core';
import { Item, Item_v2 } from '../../../data_test/item/item-interface';
import { ITEMS, ITEMS_V2 } from '../../../data_test/item/item-data';
//import { CartService } from '../../../data_test/cart/cart-service';
import { SIZES } from '../../../data_test/size/size-data';
import { Size } from '../../../data_test/size/size-interface';
import { COLORS } from '../../../data_test/color/color-data';
import { Color } from '../../../data_test/color/color-interface';
import { ItemVariation } from '../../../data_test/item/item-interface';
import { Nation } from '../../../data_test/nation/nation-interface';
import { NATIONS } from '../../../data_test/nation/nation-data';
import { Brand } from '../../../data_test/brand/brand-interface';
import { BRANDS } from '../../../data_test/brand/brand-data';

import { ApiResponse } from '../../../core/models/auth/api-resonse.model';
import { ProductService } from '../../../core/services/product.service';
import { ProductDto } from '../../../core/models/product.model';
import { ProductVariationDto } from '../../../core/models/productVariation.model';

import { CartService } from '../../../core/services/cart.service';
import { CartDto, CartDtoExtendStatus } from '../../../core/models/cart.model';
import { CloudinaryService } from '../../../core/upload_images/upload_image';
import { VirtualTryOnService } from '../../../core/services/virtual-try-on.service';

import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { TokenStorageService } from '../../../core/services/auth/token-storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [
    ImageSliderComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RelatedProductsComponent,
    ToastModule,
  ],
  providers: [MessageService],
  standalone: true,
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  product: ProductDto | null = null; // Dữ liệu sản phẩm
  loading: boolean = true; // Trạng thái tải
  error: string | null = null; // Thông báo lỗi

  productId: string | null = null;
  products: any;
  selectedColorId: number | null = null;
  selectedSizeId: number | null = null;
  colorOptions: { id: number; value: string; disabled: boolean }[] = [];

  items: Item[] = ITEMS;
  items_v2: Item_v2[] = ITEMS_V2;
  sizes: Size[] = SIZES;
  colors: Color[] = COLORS;
  nations: Nation[] = NATIONS;
  brands: Brand[] = BRANDS;
  cartItem: CartDto | null = null;
  //product: ProductDto | undefined;
  variationList: { id: number; value: string }[] = [];
  uploadedImage: string | ArrayBuffer | null = null;
  selectedImage: string | null = null;
  responseImageFromCloudinary: string | null = null;
  outputImage: string | null = null;

  isLoading: boolean = false;

  isLoadingStart: boolean = false;
  isLoadingRender: boolean = false;
  isLoadingCancle: boolean = false;
  isLoadingError: boolean = false;

  isExit: boolean = false;

  timerValue = 0;
  private timerInterval: any;

  cartItems: CartDtoExtendStatus[] = []; // Khởi tạo

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private productService: ProductService,
    private cartService: CartService,
    protected router: Router,
    private cloudinaryService: CloudinaryService,
    private virtualTryOnService: VirtualTryOnService,
    private renderer: Renderer2,
    private tokenStorageService: TokenStorageService
  ) {}

  /**Xu ly item v2 */
  ngOnInit() {
    // Lấy `id` từ URL
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id')); // Chuyển đổi tham số sang số
      if (id) {
        // this.productService.getProductById(id).subscribe((response) => {
        //   this.product = response.result || null;
        //   console.log(this.product);
        // });
        this.fetchProduct(id); // Gọi API để lấy dữ liệu
      } else {
        this.error = 'Không tìm thấy sản phẩm!';
        this.loading = false;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const userId = this.tokenStorageService.getUser()?.id;
    if (userId) {
      this.cartService.getCartItemsByCusId(userId).subscribe((response) => {
        this.cartItems = response.result || [];
      });
    }
  }

  private fetchProduct(id: number): void {
    this.productService.getProductByIdWithStatusTrue(id).subscribe({
      next: (response) => {
        this.product = response.result || null; // Cập nhật dữ liệu sản phẩm
        console.log(this.product);
        this.variationList = this.getProductVariationList(this.product);
        console.log(this.variationList);
        this.colorOptions = this.getDistinctColNames(this.product);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Không thể tải thông tin sản phẩm!';
        this.loading = false;
      },
    });
  }

  getVariationBySize(siz_Id: number | null): ItemVariation | undefined {
    if (this.product && this.product.productVariations) {
      //console.log(this.product.productVariations);
      const variation = this.product.productVariations.find(
        (variation: ProductVariationDto) => variation.siz_Id === siz_Id
      ) as ItemVariation;
      //console.log(variation);
      return variation;
    }
    return undefined;
  }

  getVariationBySizeAndColor(): ProductVariationDto | undefined {
    if (this.product && this.product.productVariations) {
      if (this.selectedSizeId && this.selectedColorId) {
        const variation = this.product.productVariations.find(
          (variation: ProductVariationDto) => {
            return (
              variation.col_Id === this.selectedColorId &&
              variation.siz_Id === this.selectedSizeId
            );
          }
        );
        //console.log("Get variation by size " + this.selectedSizeId + " and color " + this.selectedColorId, variation);
        return variation;
      }
    }
    return undefined;
  }

  getProductVariationList(product: any): { id: number; value: string }[] {
    const variationList: { id: number; value: string }[] = [];
    const uniqueValues: string[] = [];
    if (product && product.productVariations) {
      product.productVariations.forEach((variation: any, index: number) => {
        if (!uniqueValues.includes(variation.pic)) {
          variationList.push({ id: index, value: variation.pic });
          uniqueValues.push(variation.pic);
        }
      });
    }
    return variationList;
  }

  //hàm lấy ra mấy cái id size và color có trong biến thể sản phẩm
  getSizeColList(product: any): { siz_Id: number; col_Id: number }[] {
    const variationList: { siz_Id: number; col_Id: number }[] = [];
    if (product && product.productVariations) {
      product.productVariations.forEach((variation: any) => {
        variationList.push({
          siz_Id: variation.siz_Id,
          col_Id: variation.col_Id,
        });
      });
    }
    //console.log(variationList);
    return variationList;
  }

  //hàm lấy ra list object id - value của size có trong biến thể sản phẩm
  getDistinctSizeNames(product: any): { id: number; value: string }[] {
    const sizeIds = this.getDistinctSizeIds(product);
    const sizeNames = sizeIds.map((sizeId) => {
      const sizeName = this.getSizeName(sizeId);
      return { id: sizeId, value: sizeName };
    });
    sizeNames.sort((a, b) => a.id - b.id);
    //console.log(sizeNames);
    return sizeNames;
  }

  getDistinctColNames(
    product: any
  ): { id: number; value: string; disabled: boolean }[] {
    const colIds = this.getDistinctColIds(product);
    const colNames = colIds.map((colId) => {
      const colName = this.getColName(colId);
      return { id: colId, value: colName, disabled: true };
    });
    //console.log(colNames);
    return colNames;
  }

  onSizeChange(event: Event) {
    this.selectedSizeId = +(event.target as HTMLInputElement).value;
    this.selectedColorId = null;
    const sizeColList = this.getSizeColList(this.product);
    const correspondingColors = sizeColList
      .filter((sizeCol) => sizeCol.siz_Id === this.selectedSizeId)
      .map((sizeCol) => sizeCol.col_Id);

    this.colorOptions = this.getDistinctColNames(this.product).map(
      (colorOption) => {
        colorOption.disabled = !correspondingColors.includes(colorOption.id);
        return colorOption;
      }
    );

    //console.log('Corresponding Colors for selected size:', correspondingColors);
  }

  onColorChange(event: Event) {
    this.selectedColorId = +(event.target as HTMLInputElement).value;
    const sizeColList = this.getSizeColList(this.product);
    const correspondingSizes = sizeColList.filter(
      (sizeCol) => sizeCol.col_Id === this.selectedColorId
    );
    //console.log('Corresponding Sizes for selected color:', correspondingSizes);
  }

  getProductVariation(
    product: any,
    sizeId: number | null,
    colorId: number | null
  ): any {
    if (sizeId !== null && colorId !== null) {
      const variation = product.productVariations.find(
        (variation: ItemVariation) =>
          variation.siz_Id === sizeId && variation.col_Id === colorId
      );
      //console.log({ ...product, productVariations: [variation] });
      return { ...product, productVariations: [variation] };
    } else {
      //console.log('SizeId or colorId is null');
      return null;
    }
  }

  getColName(colId: number): string {
    const color = this.colors.find((color) => color.id === colId);
    return color ? color.name : '';
  }

  //hàm lấy ra mấy cái id size có trong biến thể sản phẩm
  getDistinctSizeIds(product: any): number[] {
    const sizeIds: number[] = [];
    const sizeColList = this.getSizeColList(product);
    sizeColList.forEach((sizeCol) => {
      if (!sizeIds.includes(sizeCol.siz_Id)) {
        sizeIds.push(sizeCol.siz_Id);
      }
    });
    //console.log(sizeIds);
    return sizeIds;
  }

  //hàm lấy ra mấy cái id color có trong biến thể sản phẩm
  getDistinctColIds(product: any): number[] {
    const colIds: number[] = [];
    const sizeColList = this.getSizeColList(product);
    sizeColList.forEach((sizeCol) => {
      if (!colIds.includes(sizeCol.col_Id)) {
        colIds.push(sizeCol.col_Id);
      }
    });
    //console.log(colIds);
    return colIds;
  }

  getSizeName(sizeId: number): string {
    const size = this.sizes.find((size) => size.id === sizeId);
    return size ? size.name : '';
  }

  getAllSizeNames(): string[] {
    return this.sizes.map((size) => size.name);
  }

  ngAfterViewInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // handleCartBtnClicked_v2(
  //   product: any,
  //   sizeId: number | null,
  //   colorId: number | null
  // ): any {
  //   const userId = this.getCookieValue('user');

  //   if (!userId) {
  //     const confirmation = window.confirm(
  //       'Vui lòng đăng nhập để tiếp tục mua hàng!'
  //     );
  //     if (confirmation) {
  //       window.location.href = 'http://localhost:4200/sign-in';
  //     } else {
  //       return;
  //     }
  //   }

  //   // Get the product variation based on size and color
  //   const variation = this.getProductVariation(product, sizeId, colorId);
  //   console.log(variation);
  //   // console.log(
  //   //   'Số lượng sản phẩm đang có: ',
  //   //   variation.productVariations[0].quantity
  //   // );

  //   this.cartService.getCartItemsByCusId(userId).subscribe((response) => {
  //     this.cartItems = response.result || [];
  //     console.log(this.cartItems[0].quantity); //này là số lượng sp trong cart nè
  //     console.log(
  //       'Số lượng sản phẩm đang bán: ',
  //       variation.productVariations[0].quantity
  //     );
  //     if (this.cartItems[0].quantity) {
  //       const quantityInCart = this.cartItems[0].quantity + 1;
  //       if (quantityInCart >= variation.productVariations[0].quantity) {
  //         console.log(quantityInCart);
  //         this.messageService.add({
  //           severity: 'warn',
  //           summary: 'Không thành công',
  //           detail:
  //             'Chỉ được thêm tối đa ' +
  //             variation.productVariations[0].quantity +
  //             ' sản phẩm',
  //         });
  //         return;
  //       }
  //     }
  //   });

  //   if (
  //     !variation ||
  //     !variation.productVariations ||
  //     variation.productVariations.length === 0
  //   ) {
  //     console.error('Invalid product variation');
  //     return;
  //   }

  //   const productVariation = variation.productVariations[0];

  //   const ProductDto: ProductDto = {
  //     id: variation.id,
  //     cat_Id: variation.cat_Id,
  //   };

  //   productVariation.product = product;
  //   console.log(variation);

  //   const cartDto: CartDto = {
  //     item_Id: productVariation.id,
  //     cus_Id: userId,
  //     price: productVariation.price,
  //     quantity: 1,
  //   };
  //   console.log(cartDto);

  //   // Call cartService to create cart
  //   this.cartService.createCart(cartDto).subscribe({
  //     next: (response) => {
  //       console.log('Cart created successfully:', response);
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Thành công',
  //         detail: 'Bạn vừa thêm ' + variation.name + ' vào giỏ hàng!',
  //       });
  //     },
  //     error: (error) => {
  //       console.error('Error creating cart:', error);
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Thất bại',
  //         detail:
  //           'Đã có lỗi xảy ra khi thêm ' + variation.name + ' vào giỏ hàng!',
  //       });
  //     },
  //   });

  //   // Return the product variation
  //   return this.getProductVariation(product, sizeId, colorId);
  // }

  async handleCartBtnClicked_v2(
    product: any,
    sizeId: number | null,
    colorId: number | null
  ): Promise<any> {
    const userId = this.getCookieValue('user');

    if (!userId) {
      const confirmation = window.confirm(
        'Vui lòng đăng nhập để tiếp tục mua hàng!'
      );
      if (confirmation) {
        window.location.href = 'http://localhost:4200/sign-in';
      } else {
        return;
      }
    }

    // Get the product variation based on size and color
    const variation = this.getProductVariation(product, sizeId, colorId);

    if (
      !variation ||
      !variation.productVariations ||
      variation.productVariations.length === 0
    ) {
      console.error('Invalid product variation');
      return;
    }

    const productVariation = variation.productVariations[0];

    try {
      const response = await this.cartService
        .getCartItemsByCusId(userId)
        .toPromise();
      this.cartItems = response?.result || [];

      // Tính tổng số lượng sản phẩm trong giỏ hàng
      const quantityInCart = this.cartItems.reduce(
        (sum, item) => sum + (item.quantity ?? 0), // Sử dụng nullish coalescing để tránh undefined
        0
      );

      if (quantityInCart + 1 > productVariation.quantity) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Không thành công',
          detail:
            'Chỉ được thêm tối đa ' + productVariation.quantity + ' sản phẩm',
        });
        return; // Ngắt hàm tại đây nếu vượt quá giới hạn
      }

      const cartDto: CartDto = {
        item_Id: productVariation.id,
        cus_Id: userId,
        price: productVariation.price,
        quantity: 1, // Đảm bảo quantity không undefined
      };

      // Call cartService to create cart
      const createResponse = await this.cartService
        .createCart(cartDto)
        .toPromise();
      console.log('Cart created successfully:', createResponse);
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Bạn vừa thêm ' + variation.name + ' vào giỏ hàng!',
      });
    } catch (error) {
      console.error('Error creating cart:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Thất bại',
        detail:
          'Đã có lỗi xảy ra khi thêm ' + variation.name + ' vào giỏ hàng!',
      });
    }
  }

  // Function to get cookie value by name
  private getCookieValue(name: string): string {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        const cookieValue = cookie.substring(cookieName.length, cookie.length);
        try {
          const parsedValue = JSON.parse(cookieValue);
          return parsedValue.id || '';
        } catch (e) {
          console.error('Error parsing cookie value:', e);
          return '';
        }
      }
    }
    return '';
  }

  //hàm này cho nút mua ngay
  handleCartBtnClicked_v3(
    product: any,
    sizeId: number | null,
    colorId: number | null
  ): any {
    const userId = this.getCookieValue('user');

    if (!userId) {
      const confirmation = window.confirm(
        'Vui lòng đăng nhập để tiếp tục mua hàng!'
      );
      if (confirmation) {
        window.location.href = 'http://localhost:4200/sign-in';
      } else {
        return;
      }
    }

    // Get the product variation based on size and color
    const variation = this.getProductVariation(product, sizeId, colorId);
    console.log(variation);

    // Ensure variation and productVariations are valid
    if (
      !variation ||
      !variation.productVariations ||
      variation.productVariations.length === 0
    ) {
      console.error('Invalid product variation');
      return;
    }

    const productVariation = variation.productVariations[0];

    const ProductDto: ProductDto = {
      id: variation.id,
      cat_Id: variation.cat_Id,
    };

    productVariation.product = product;
    console.log(variation);

    //Tạo một form để nhập số lượng
    let quantity = window.prompt('Nhập số lượng cần mua:', '1');
    let validQuantity = false;

    while (!validQuantity) {
      const input = window.prompt('Nhập số lượng cần mua:', '1');
      if (input !== null) {
        const parsedQuantity = parseInt(input, 10);
        if (
          !isNaN(parsedQuantity) &&
          parsedQuantity >= 1 &&
          parsedQuantity <= productVariation.quantity
        ) {
          quantity = parsedQuantity.toString();

          const cartDto: CartDto = {
            item_Id: productVariation.id,
            cus_Id: userId,
            price: productVariation.price,
            quantity: quantity ? parseInt(quantity) : 1,
            productVariation: productVariation,
          };
          console.log(cartDto);

          this.cartService.setCheckedItems([cartDto]);
          this.router.navigate(['/payment']);

          validQuantity = true;
        } else {
          window.alert(
            `Vui lòng nhập số lượng hợp lệ từ 1 đến ${productVariation.quantity}`
          );
        }
      } else {
        return;
      }
    }
    // Return the product variation
    return this.getProductVariation(product, sizeId, colorId);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImageToCloud(): void {
    if (this.uploadedImage) {
      this.isLoading = true;
      const file = this.uploadedImage as unknown as File;
      console.log('Uploading image to cloud:', file);
      const userId = this.getCookieValue('user');
      const folder = 'user_selfie';
      const publicId = `user_selfie_${userId}_${Date.now()}`;

      new Promise<void>((resolve, reject) => {
        this.cloudinaryService
          .uploadImage(file, folder, publicId)
          .then((result) => {
            this.responseImageFromCloudinary = result.secure_url;
            resolve();
            console.log(
              'URL ảnh sau khi upload:',
              this.responseImageFromCloudinary
            );
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công!',
              detail: 'Ảnh của bạn đã được tải lên!',
            });
          })
          .catch((error) => {
            console.error('Lỗi khi lưu ảnh:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại!',
              detail: 'Lỗi xảy ra khi lưu ảnh!',
            });
            reject(error);
            this.isLoading = false;
          });
      });
    } else {
      console.error('No image selected for upload.');
    }
  }

  onImageSelect(imageUrl: string): void {
    this.selectedImage = imageUrl;
    console.log('Selected image:', imageUrl);
  }

  downloadImage() {
    const a = document.createElement('a'); // Tạo thẻ <a>
    a.href = this.outputImage!; // Đường dẫn file tải xuống
    a.download = 'photo.jpg'; // Tên file tải xuống
    a.target = '_blank'; // Mở file trong tab mới
    document.body.appendChild(a); // Thêm thẻ <a> vào DOM
    a.click(); // Tự động click để tải file
    document.body.removeChild(a); // Xóa thẻ <a> sau khi tải xong
  }

  handleTryOnClothes(): void {
    this.startTimer();
    console.log('Ảnh tải lên:', this.responseImageFromCloudinary);
    console.log('Ảnh chọn:', this.selectedImage);

    const modelImage = this.responseImageFromCloudinary;
    const garmentImage = this.selectedImage;
    const category = 'tops';

    this.isLoadingStart = true;

    this.virtualTryOnService
      .runVirtualTryOn(modelImage!, garmentImage!, category)
      .then((response) => {
        this.clearTimer();
        if (response.error === null) {
          this.startTimer();
          this.isLoadingRender = true;
          return this.pollStatus(response.id); // Gọi hàm kiểm tra trạng thái
        } else {
          this.isLoadingError = true;
          this.isLoadingStart = false;
          this.isLoadingRender = false;
          console.error('Request failed, canceling:', response.id);
          return this.virtualTryOnService.cancelRequest(response.id);
        }
      })
      .then((statusResponse) => {
        this.clearTimer();
        if (statusResponse && statusResponse.status === 'completed') {
          this.isLoadingError = false;
          console.log('Output Image:', statusResponse.output);
          this.outputImage = statusResponse.output;
        } else {
          this.isLoadingRender = false;
          this.isLoadingError = true;
          console.log('Final status response:', statusResponse);
        }
      })
      .catch((error) => {
        this.clearTimer();
        console.error('Error:', error);
        this.isLoadingError = true;
      });
  }

  /**
   * Hàm kiểm tra trạng thái với polling
   */
  private pollStatus(requestId: string): Promise<any> {
    const delay = 2000; // Kiểm tra sau mỗi 2 giây

    return new Promise((resolve, reject) => {
      const checkStatus = () => {
        this.virtualTryOnService
          .getStatus(requestId)
          .then((statusResponse) => {
            console.log('Status Response:', statusResponse);

            if (statusResponse.status === 'completed') {
              resolve(statusResponse); // Kết thúc khi trạng thái là "completed"
            } else if (statusResponse.status === 'error') {
              reject(new Error('Error occurred while processing.'));
            } else if (statusResponse.status === 'failed') {
              reject(new Error('Request failed.'));
              console.error('Request failed, canceling:', requestId);
              this.virtualTryOnService.cancelRequest(requestId);
            } else {
              // Tiếp tục kiểm tra
              setTimeout(checkStatus, delay);
            }
          })
          .catch((error) => {
            console.error('Error in polling status:', error);
            reject(error);
          });
      };

      checkStatus(); // Bắt đầu kiểm tra
    });
  }

  // checkAndCloseModal() {
  //   if (this.uploadedImage) {
  //     // Hiển thị popup
  //     alert('Bạn có chắc chắn muốn đóng mà không lưu ảnh đã tải lên?');
  //   } else {
  //     // Đóng modal
  //     this.resetData();
  //     const modal = document.getElementById('exampleModalFullscreen');
  //     if (modal) {
  //       const bootstrapModal = bootstrap.Modal.getInstance(modal);
  //       if (bootstrapModal) {
  //         bootstrapModal.hide();
  //       }
  //     }
  //   }
  // }

  resetData(): void {
    this.uploadedImage = null;
    this.selectedImage = null;
    this.responseImageFromCloudinary = null;
    this.outputImage = null;
    this.isExit = false;
    this.isLoadingError = false;
    this.isLoadingRender = false;
    this.isLoadingStart = false;
  }

  checkStatusExit(): void {
    if (this.uploadedImage !== null) {
      Swal.fire({
        title: 'Bạn có chắc chắn thoát?',
        text: 'Những gì bạn chọn sẽ biến mất và bạn sẽ phải thao tác lại từ đầu!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có, tôi chắc chắn!',
        cancelButtonText: 'Không!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.isExit = true;
          this.resetData();
          const exitButton = document.getElementById(
            'exitButton'
          ) as HTMLButtonElement;
          if (exitButton) {
            exitButton.click();
          }
        }
      });
    } else {
      this.isExit = true;
    }
  }

  startTimer() {
    this.timerValue = 0;
    this.timerInterval = setInterval(() => {
      this.timerValue = parseFloat((this.timerValue + 0.1).toFixed(1));
    }, 100);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}

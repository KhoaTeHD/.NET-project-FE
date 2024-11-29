import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import {
  ProductVariationDto,
  ProductVariationDto_v2,
} from '../../../core/models/productVariation.model';

import { CartService } from '../../../core/services/cart.service';
import { CartDto } from '../../../core/models/cart.model';

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

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private productService: ProductService,
    private cartService: CartService
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

  }

  private fetchProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
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

  getVariationBySizeAndColor(
  ): ProductVariationDto_v2 | undefined {
    if (this.product && this.product.productVariations) {
      if(this.selectedSizeId && this.selectedColorId){
        const variation = this.product.productVariations.find(
          (variation: ProductVariationDto_v2) => {
            return variation.col_Id === this.selectedColorId && variation.siz_Id === this.selectedSizeId;
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

  handleCartBtnClicked_v2(
    product: any,
    sizeId: number | null,
    colorId: number | null
  ): any {
    const variation = this.getProductVariation(product, sizeId, colorId);
    const productVariation = variation.productVariations[0];
    const ProductDto: ProductDto = {
      id: variation.id,
      cat_Id: variation.cat_Id,

    };
    productVariation.product = product;
    //console.log(variation);
    const cartDto: CartDto = {
      item_Id: variation.id,
      cus_Id: 'thhionaj97',
      price: variation.productVariations[0].price,
      quantity: 1,
      productVariation: productVariation,
    };

    this.cartService.createCart(cartDto).subscribe(
      (response) => {
        //console.log('Cart created successfully:', response);
      },
      (error) => {
        console.error('Error creating cart:', error);
      }
    );

    return this.getProductVariation(product, sizeId, colorId);
  }
}

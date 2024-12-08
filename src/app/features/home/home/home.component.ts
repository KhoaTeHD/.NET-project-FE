import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { Item } from '../../../data_test/item/item-interface';
import { ITEMS } from '../../../data_test/item/item-data';
import { Item_v2 } from '../../../data_test/item/item-interface';
import { ITEMS_V2 } from '../../../data_test/item/item-data';
import { BRANDS } from '../../../data_test/brand/brand-data';
import { ProductDto } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { ProductVariationDto } from '../../../core/models/productVariation.model';
import { Router, RouterModule } from '@angular/router';
import { BrandDto } from '../../../core/models/brand.model';

interface Slide {
  imageUrl: string;
  caption: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('slideContainer') slideContainer!: ElementRef;

  items: Item[] = ITEMS;
  items_v2: Item_v2[] = ITEMS_V2;

  slides: Slide[] = [
    {
      imageUrl:
        'https://res.cloudinary.com/dt46dvdeu/image/upload/v1733079450/demowebHKH/kwhlcssqrwxtjkutko0r.jpg',
      caption: 'Bộ sưu tập Thiên Lý Ơi',
      description: 'Thiên lý ơi em có thể ở lại đây không?',
    },
    {
      imageUrl:
        'https://res.cloudinary.com/dt46dvdeu/image/upload/v1733082712/demowebHKH/bnfolwrsqkakhd3ve1ci.jpg',
      caption: 'Bộ sưu tập Xoá Tên Anh Đi',
      description: 'Ok nah One Two Three',
    },
    {
      imageUrl:
        'https://res.cloudinary.com/dt46dvdeu/image/upload/v1733082719/demowebHKH/qt187dgbnw4acqpb7c11.jpg',
      caption: 'Winter Warmers',
      description: 'Stay cozy with our winter collection',
    },
  ];
  uniqueBrandItems: Item[] = [];
  uniqueBrandItems_v2: { brand: BrandDto; product: ProductDto }[] = [];
  vipItems: Item[] = [];
  vipItems_v2: Item_v2[] = [];
  currentSlide = 0;
  brands = BRANDS;
  products: ProductDto[] = [];
  vipProducts: { product: ProductDto; variation: ProductVariationDto }[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.startSlideshow();
    this.uniqueBrandItems = this.getUniqueBrandsItems();

    this.vipItems = this.getVipItems();
    this.vipItems_v2 = this.getVipItems_v2();

    this.productService.getAllProductsWithStatusTrue().subscribe((response) => {
      this.products = response.result || [];
      this.vipProducts = this.getVipProducts();
      this.uniqueBrandItems_v2 = this.getUniqueBrandsItems_v2();
      console.log(this.uniqueBrandItems_v2);
      console.log(this.products);
    });


  }


  startSlideshow(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlidePosition();
  }

  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlidePosition();
  }

  updateSlidePosition(): void {
    const slideWidth = this.slideContainer.nativeElement.offsetWidth;
    this.slideContainer.nativeElement.style.transform = `translateX(-${
      this.currentSlide * slideWidth
    }px)`;
  }

  getUniqueBrandsItems(): Item[] {
    const uniqueBrandsMap = new Map<string, Item>();

    for (const item of this.items) {
      if (!uniqueBrandsMap.has(item.brand)) {
        uniqueBrandsMap.set(item.brand, item);
      }
    }

    return Array.from(uniqueBrandsMap.values());
  }

  getUniqueBrandsItems_v2(): { brand: BrandDto; product: ProductDto }[] {
    if (this.products.length === 0) {
      return [];
    }
  
    const brandMap = new Map<number, ProductDto>();
  
    this.products.forEach(product => {
      const brandId = product.brand?.id;
      if (brandId !== undefined && !brandMap.has(brandId)) {
        brandMap.set(brandId, product);
      }
    });
  
    const uniqueBrandsWithProduct = Array.from(brandMap.entries()).map(([brandId, product]) => {
      if (product.brand) {
        return {
          brand: product.brand,
          product: product
        };
      }
      return null;
    }).filter(item => item !== null) as { brand: BrandDto; product: ProductDto }[];
  
    console.log(uniqueBrandsWithProduct);
    return uniqueBrandsWithProduct;
  }

  getVipItems(): Item[] {
    const itemsWithDiscount = this.items.map((item) => {
      const discountPercentage = 100 - (item.pricesale * 100) / item.price;
      return { item, discountPercentage };
    });
    itemsWithDiscount.sort(
      (a, b) => b.discountPercentage - a.discountPercentage
    );
    const topDiscountedItems = itemsWithDiscount
      .slice(0, 4)
      .map((entry) => entry.item);
    return topDiscountedItems;
  }

  getVipItems_v2(): Item_v2[] {
    if (this.items_v2.length === 0) {
      return [];
    }

    const sortedItems = this.items_v2.sort((a, b) => b.id - a.id);
    return sortedItems.slice(0, Math.min(4, sortedItems.length));
  }

  getVipProducts(): { product: ProductDto; variation: ProductVariationDto }[] {
    if (this.products.length === 0) {
      return [];
    }
  
    const variationsWithProduct = this.products.flatMap(product =>
      product.productVariations ? product.productVariations.map(variation => ({
        product,
        variation,
      })) : []
    );
  
    const sortedVariations = variationsWithProduct
      .sort((a, b) => (b.variation.discount || 0) - (a.variation.discount || 0));
  
    const uniqueTopVariations: { product: ProductDto; variation: ProductVariationDto }[] = [];
    const seenProductIds = new Set<number>();
  
    for (const item of sortedVariations) {
      if (item.product.id !== undefined && !seenProductIds.has(item.product.id)) {
        uniqueTopVariations.push(item);
        seenProductIds.add(item.product.id);
        if (uniqueTopVariations.length === 4) {
          break;
        }
      }
    }
  
    console.log(uniqueTopVariations);
    return uniqueTopVariations;
  }
}

import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryDto } from '../../../core/models/category.model';
import { BrandDto } from '../../../core/models/brand.model';
import { ColorDto } from '../../../core/models/color.model';
import { SizeDto } from '../../../core/models/size.model';
import { SliderModule } from 'primeng/slider';
import { ProductService } from '../../../core/services/product.service';
import { ProductDto } from '../../../core/models/product.model';

interface Filters {
  [key: string]: any;
  cat_Id: any;
  bra_Id: any;
  col_Id: any;
  siz_Id: any;
  price: any;
  nat_Id: any;
  sup_Id: any;
}

@Component({
  selector: 'app-sidebar-shop',
  standalone: true,
  imports: [FormsModule, CommonModule, SliderModule],
  templateUrl: './sidebar-shop.component.html',
  styleUrls: ['./sidebar-shop.component.css'],
})
export class SidebarShopComponent implements OnInit {
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  categories: CategoryDto[] = [];
  brands: BrandDto[] = [];
  colors: ColorDto[] = [];
  sizes: SizeDto[] = [];
  nations: any[] = [];
  suppliers: any[] = [];
  filters: Filters = {
    cat_Id: null,
    bra_Id: null,
    col_Id: null,
    siz_Id: null,
    price: null,
    nat_Id: null,
    sup_Id: null,
  };
  minPrice: number | undefined;
  maxPrice: number | undefined;
  priceRange: number[] = [0, 0];
  productVariations: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response) => {
      const products = response.result || [];
      this.categories = this.getCategoriesFromObjects(products);
      this.brands = this.getBrandsFromObjects(products);
      this.colors = this.getColorFromObjects(products);
      this.sizes = this.getSizesFromObjects(products);
      this.setPriceRange();
    });
  }

  getCategoriesFromObjects(objects: any[]): CategoryDto[] {
    const categories: CategoryDto[] = [];
    const map = new Map();
    for (const object of objects) {
      if (object.category && !map.has(object.category.id)) {
        map.set(object.category.id, true);
        categories.push(object.category);
      }
    }
    return categories;
  }

  getBrandsFromObjects(objects: any[]): BrandDto[] {
    const brands: BrandDto[] = [];
    const map = new Map();
    for (const object of objects) {
      if (object.brand && !map.has(object.brand.id)) {
        map.set(object.brand.id, true);
        brands.push(object.brand);
      }
    }
    return brands;
  }

  getColorFromObjects(objects: any[]): ColorDto[] {
    const colors: ColorDto[] = [];
    const map = new Map();
    for (const object of objects) {
      for (const productVariation of object.productVariations) {
        if (productVariation.color && !map.has(productVariation.color.id)) {
          map.set(productVariation.color.id, true);
          colors.push(productVariation.color);
        }
      }
    }
    return colors.filter((color) => color !== undefined);
  }

  getSizesFromObjects(objects: any[]): SizeDto[] {
    const sizes: SizeDto[] = [];
    const map = new Map();
    for (const object of objects) {
      for (const productVariation of object.productVariations) {
        if (productVariation.size && !map.has(productVariation.size.id)) {
          map.set(productVariation.size.id, true);
          sizes.push(productVariation.size);
        }
      }
    }
    return sizes;
  }

  setPriceRange(): void {
    if (this.productVariations.length > 0) {
      const prices = this.productVariations.map((variation) => variation.price);
      this.minPrice = Math.min(...prices);
      this.maxPrice = Math.max(...prices);
      this.priceRange = [this.minPrice, this.maxPrice];
    }
  }

  extractUnique<T>(items: T[], key: keyof T): T[] {
    const uniqueItems = [];
    const map = new Map();
    for (const item of items) {
      if (!map.has(item[key])) {
        map.set(item[key], true);
        uniqueItems.push(item);
      }
    }
    return uniqueItems;
  }

  onFilterChange(filterKey: string, value: any, checked: boolean): void {
    if (checked) {
      this.filters[filterKey] = value;
    } else {
      this.filters[filterKey] = null;
    }
    this.onSearch();
  }

  onSearch(): void {
    this.search.emit(this.filters);
  }
}

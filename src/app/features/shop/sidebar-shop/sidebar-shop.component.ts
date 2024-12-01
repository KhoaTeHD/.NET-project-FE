import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  CategoryDto,
  CategoryDto_v2,
} from '../../../core/models/category.model';
import { BrandDto, BrandDto_v2 } from '../../../core/models/brand.model';
import { ColorDto, ColorDto_v2 } from '../../../core/models/color.model';
import { SizeDto, SizeDto_v2 } from '../../../core/models/size.model';
import { SliderModule } from 'primeng/slider';
import { ProductService } from '../../../core/services/product.service';
import { ProductDto } from '../../../core/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';

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
  @Output() filtersChanged = new EventEmitter<Filters>();

  categories: CategoryDto_v2[] = [];
  brands: BrandDto_v2[] = [];
  colors: ColorDto_v2[] = [];
  sizes: SizeDto_v2[] = [];
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
  minPrice: number = 0;
  maxPrice: number = 0;
  priceRange: number[] = [0, 0];
  productVariations: any[] = [];
  products: ProductDto[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.initializeFiltersFromParams(params);
    });
    this.productService.getAllProducts().subscribe((response) => {
      const products = response.result || [];
      this.categories = this.getCategoriesFromObjects(products);
      this.brands = this.getBrandsFromObjects(products);
      this.colors = this.getColorFromObjects(products);
      this.sizes = this.getSizesFromObjects(products);
      this.products = products;
      this.setPriceRange();
      this.initializeFiltersFromParams(this.route.snapshot.queryParams);
    });
  }

  initializeFiltersFromParams(params: any): void {
    this.filters.cat_Id = params['cat_Id']
      ? params['cat_Id'].split(',').map(Number)
      : [];
    this.filters.bra_Id = params['bra_Id']
      ? params['bra_Id'].split(',').map(Number)
      : [];
    this.filters.col_Id = params['col_Id']
      ? params['col_Id'].split(',').map(Number)
      : [];
    this.filters.siz_Id = params['siz_Id']
      ? params['siz_Id'].split(',').map(Number)
      : [];
    this.priceRange = params['price']
      ? params['price'].split(',').map(Number)
      : [this.minPrice, this.maxPrice];

    // Update checked state for categories
    this.categories.forEach((category) => {
      category.checked = this.filters.cat_Id.includes(category.id);
    });

    // Update checked state for brands
    this.brands.forEach((brand) => {
      brand.checked = this.filters.bra_Id.includes(brand.id);
    });

    // Update checked state for colors
    this.colors.forEach((color) => {
      color.checked = this.filters.col_Id.includes(color.id);
    });

    // Update checked state for sizes
    this.sizes.forEach((size) => {
      size.checked = this.filters.siz_Id.includes(size.id);
    });

    this.onSearch();
  }

  onFilterChange(): void {
    const queryParams: any = {};

    if (this.filters.cat_Id.length > 0) {
      queryParams['cat_Id'] = this.filters.cat_Id.join(',');
    } else {
      queryParams['cat_Id'] = null; // Remove cat_Id from URL when no categories are selected
    }

    if (this.filters.bra_Id.length > 0) {
      queryParams['bra_Id'] = this.filters.bra_Id.join(',');
    } else {
      queryParams['bra_Id'] = null;
    }

    if (this.filters.col_Id.length > 0) {
      queryParams['col_Id'] = this.filters.col_Id.join(',');
    } else {
      queryParams['col_Id'] = null;
    }

    if (this.filters.siz_Id.length > 0) {
      queryParams['siz_Id'] = this.filters.siz_Id.join(',');
    } else {
      queryParams['siz_Id'] = null;
    }

    if (this.priceRange && this.priceRange.length === 2) {
      queryParams['price'] = this.priceRange.join(',');
    } else {
      queryParams['price'] = null; // Remove price from URL when not set
    }

    if (
      queryParams['cat_Id'] ||
      queryParams['price'] ||
      queryParams['bra_Id'] ||
      queryParams['col_Id'] ||
      queryParams['siz_Id']
    ) {
      queryParams['search'] = null;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
    this.filtersChanged.emit(this.filters); // Emit the filters
    this.onSearch();
  }
  onSearch(): void {
    //console.log('Search initiated with filters:', this.filters);
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
    if (this.products.length > 0) {
      const prices = this.products.map((product) => {
        const productVariations = product.productVariations || [];
        return productVariations.map((pv) => pv.price);
      });
      const allPrices = prices.flat();
      this.minPrice = Math.min(
        ...allPrices.filter((price) => price !== undefined)
      );
      this.maxPrice = Math.max(
        ...allPrices.filter((price) => price !== undefined)
      );
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

  onCategoryChange(category: CategoryDto_v2): void {
    if (category.checked) {
      this.filters.cat_Id.push(category.id);
    } else {
      const index = this.filters.cat_Id.indexOf(category.id);
      if (index !== -1) {
        this.filters.cat_Id.splice(index, 1);
      }
    }
    this.onFilterChange();
  }

  onBrandChange(brand: BrandDto_v2): void {
    if (brand.checked) {
      this.filters.bra_Id.push(brand.id);
    } else {
      const index = this.filters.bra_Id.indexOf(brand.id);
      if (index !== -1) {
        this.filters.bra_Id.splice(index, 1);
      }
    }
    this.onFilterChange();
  }

  onColorChange(color: ColorDto_v2): void {
    if (color.checked) {
      this.filters.col_Id.push(color.id);
    } else {
      const index = this.filters.col_Id.indexOf(color.id);
      if (index !== -1) {
        this.filters.col_Id.splice(index, 1);
      }
    }
    this.onFilterChange();
  }

  onSizeChange(size: SizeDto_v2): void {
    if (size.checked) {
      this.filters.siz_Id.push(size.id);
    } else {
      const index = this.filters.siz_Id.indexOf(size.id);
      if (index !== -1) {
        this.filters.siz_Id.splice(index, 1);
      }
    }
    this.onFilterChange();
  }
}

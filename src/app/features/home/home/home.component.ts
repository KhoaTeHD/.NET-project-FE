import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { Item } from '../../../data_test/item/item-interface';
import { ITEMS } from '../../../data_test/item/item-data';
import { Item_v2 } from '../../../data_test/item/item-interface';
import { ITEMS_V2 } from '../../../data_test/item/item-data';
import { BRANDS } from '../../../data_test/brand/brand-data';

interface Slide {
  imageUrl: string;
  caption: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
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
        'https://res.cloudinary.com/dt46dvdeu/image/upload/v1726994909/demowebHKH/ghtjgtu1danwrgf6d7jm.jpg',
      caption: 'Bộ sưu tập Thiên Lý Ơi',
      description: 'Thiên lý ơi em có thể ở lại đây không?',
    },
    {
      imageUrl:
        'https://res.cloudinary.com/dt46dvdeu/image/upload/v1726994908/demowebHKH/pgadtftl9gclpa3a23tr.jpg',
      caption: 'Bộ sưu tập Xoá Tên Anh Đi',
      description: 'Ok nah One Two Three',
    },
    {
      imageUrl:
        'https://res.cloudinary.com/dt46dvdeu/image/upload/v1726994908/demowebHKH/ov4a7hvioeje0jhqhiag.jpg',
      caption: 'Winter Warmers',
      description: 'Stay cozy with our winter collection',
    },
  ];
  uniqueBrandItems: Item[] = [];
  uniqueBrandItems_v2: Map<string, Item_v2> | undefined;
  vipItems: Item[] = [];
  vipItems_v2: Item_v2[] = [];
  currentSlide = 0;
  brands = BRANDS;

  constructor() {}

  ngOnInit(): void {
    this.startSlideshow();
    this.uniqueBrandItems = this.getUniqueBrandsItems();
    this.uniqueBrandItems_v2 = this.getUniqueBrandsItems_v2();
    this.vipItems = this.getVipItems();
    this.vipItems_v2 = this.getVipItems_v2();
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

  getUniqueBrandsItems_v2(): Map<string, Item_v2> {
    const uniqueBrandsMap = new Map<string, Item_v2>();

    for (const item of this.items_v2) {
      const brand = this.brands.find((brand) => brand.id === item.bra_Id);
      if (brand && !uniqueBrandsMap.has(brand.name)) {
        uniqueBrandsMap.set(brand.name, item);
      }
    }

    return uniqueBrandsMap;
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
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { Item } from '../../../data_test/item/item-interface';
import { ITEMS } from '../../../data_test/item/item-data';

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
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {
  @ViewChild('slideContainer') slideContainer!: ElementRef;

  items: Item[] = ITEMS;
  
  slides: Slide[] = [
    {
      imageUrl: "https://res.cloudinary.com/dt46dvdeu/image/upload/v1726994909/demowebHKH/ghtjgtu1danwrgf6d7jm.jpg",
      caption: "Bộ sưu tập Thiên Lý Ơi",
      description: "Thiên lý ơi em có thể ở lại đây không?"
    },
    {
      imageUrl: "https://res.cloudinary.com/dt46dvdeu/image/upload/v1726994908/demowebHKH/pgadtftl9gclpa3a23tr.jpg",
      caption: "Bộ sưu tập Xoá Tên Anh Đi",
      description: "Ok nah One Two Three"
    },
    {
      imageUrl: "https://res.cloudinary.com/dt46dvdeu/image/upload/v1726994908/demowebHKH/ov4a7hvioeje0jhqhiag.jpg",
      caption: "Winter Warmers",
      description: "Stay cozy with our winter collection"
    }
  ];
  uniqueBrandItems: Item[] = []; 
  vipItems: Item[] = []; 
  currentSlide = 0;

  constructor() {}

  ngOnInit(): void {
    this.startSlideshow();
    this.uniqueBrandItems = this.getUniqueBrandsItems();
    this.vipItems = this.getVipItems();
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
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlidePosition();
  }

  updateSlidePosition(): void {
    const slideWidth = this.slideContainer.nativeElement.offsetWidth;
    this.slideContainer.nativeElement.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
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

  getVipItems(): Item[] {
    const itemsWithDiscount = this.items.map(item => {
      const discountPercentage = 100 - (item.pricesale * 100 / item.price);
      return { item, discountPercentage };
    });
    itemsWithDiscount.sort((a, b) => b.discountPercentage - a.discountPercentage);
    const topDiscountedItems = itemsWithDiscount.slice(0, 4).map(entry => entry.item);
    return topDiscountedItems;
  }
  

}

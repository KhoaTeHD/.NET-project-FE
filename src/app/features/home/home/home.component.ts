import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

interface Product {
  name: string;
  price: number;
  imageUrl: string;
}

interface Category {
  name: string;
  imageUrl: string;
}

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
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @ViewChild('slideContainer') slideContainer!: ElementRef;

  featuredProducts: Product[] = [
    {
      name: "Áo thun Y2",
      price: 97000,
      imageUrl: "../../../../assets/images/yor-spy-x-family.avif"
    },
    {
      name: "Áo khoác Z",
      price: 97000,
      imageUrl: "../../../../assets/images/yor-spy-x-family.avif"
    },
    {
      name: "Quần LV",
      price: 97000,
      imageUrl: "../../../../assets/images/yor-spy-x-family.avif"
    },
    {
      name: "Giày XX",
      price: 97000,
      imageUrl: "../../../../assets/images/yor-spy-x-family.avif"
    }
  ];

  categories: Category[] = [
    { 
      name: "Áo thun",
      imageUrl: "../../../../assets/images/yor-spy-x-family.avif"
    },
    {
      name: "Áo khoác",
      imageUrl: "../../../../assets/images/yor-spy-x-family.avif"
    },
    {
      name: "Quần",
      imageUrl: "../../../../assets/images/yor-spy-x-family.avif"
    },
    {
      name: "Phụ kiện",
      imageUrl: "../../../../assets/images/yor-spy-x-family.avif"
    }
  ];

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

  currentSlide = 0;

  constructor() {}

  ngOnInit(): void {
    this.startSlideshow();
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
}
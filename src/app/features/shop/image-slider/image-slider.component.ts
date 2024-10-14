import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ImageSliderComponent {
  currentImageIndex: number = 0;
  images: string[] = [
    '../../../../assets/images/vn-11134207-7r98o-lxtcujiemg9nbe.webp',
    'https://placehold.co/500x500/orange/white',
    'https://placehold.co/500x500/blue/white',
    'https://placehold.co/500x500/red/white',
    'https://placehold.co/500x500/green/white'
  ];

  constructor() {}

  get currentImage() {
    return this.images[this.currentImageIndex];
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }
}

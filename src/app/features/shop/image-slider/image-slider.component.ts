import { Component, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  standalone: true,
  imports:[CommonModule],
})
export class ImageSliderComponent {
  currentImage: string = '../../../../assets/images/yor-spy-x-family.avif';

  images: string[] = [
    '../../../../assets/images/yor-spy-x-family.avif',
    '../../../../assets/images/j97.jpg',
    'https://via.placeholder.com/800x400/7f7fff',
    'https://via.placeholder.com/800x400/7fff7f',
    'https://via.placeholder.com/800x400/ffff7f'
  ];

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  changeImage(image: string) {
    this.currentImage = image;
    const imgElement = this.el.nativeElement.querySelector('#currentImage');
    this.renderer.setAttribute(imgElement, 'src', image);
  }
}

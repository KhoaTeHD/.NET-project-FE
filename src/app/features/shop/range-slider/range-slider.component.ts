import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-range-slider',
  standalone: true,
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css']
})

export class RangeSliderComponent {
  // Đặt các giá trị mặc định cho min và max
  @Input() minValue: number = 0;
  @Input() maxValue: number = 100;
  
  demo: { min: number; max: number } = {
    min: this.minValue,
    max: this.maxValue
  };
}

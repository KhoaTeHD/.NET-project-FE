import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Item {
  name: String;
  price: number;
  pricesale: number;
}

@Component({
  selector: 'app-item-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-shop.component.html',
  styleUrl: './item-shop.component.css'
})

export class ItemShopComponent {
  items: Item[] = [
    {
      name: "Quấn thun Lavi",
      price: 120000,
      pricesale: 10
    },
    {
      name: "Áo Tanjiro Cosplay",
      price: 300000,
      pricesale: 12
    },
    {
      name: "Áo Hokage",
      price: 120000,
      pricesale: 15
    },
    {
      name: "Balo J97",
      price: 120000,
      pricesale: 20
    },
    {
      name: "Áo khoác Mitsuri",
      price: 120000,
      pricesale: 20
    }
  ]
}

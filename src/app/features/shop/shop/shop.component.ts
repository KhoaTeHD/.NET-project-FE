import { Component } from '@angular/core';
import { SidebarShopComponent } from '../sidebar-shop/sidebar-shop.component';
import { ItemShopComponent } from '../item-shop/item-shop.component';
import { SpecialItemShopComponent } from '../special-item-shop/special-item-shop.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [SidebarShopComponent, ItemShopComponent, SpecialItemShopComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

}

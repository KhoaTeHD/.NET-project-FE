import { Component } from '@angular/core';
import { SidebarShopComponent } from '../sidebar-shop/sidebar-shop.component';
import { ItemShopComponent } from '../item-shop/item-shop.component';
import { SpecialItemShopComponent } from '../special-item-shop/special-item-shop.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { FilterPriceComponent } from '../filter-price/filter-price.component';

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
  selector: 'app-shop',
  standalone: true,
  imports: [
    SidebarShopComponent,
    ItemShopComponent,
    SpecialItemShopComponent,
    HeaderComponent,
    FooterComponent,
    FilterPriceComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  filters!: Filters;
  onFiltersChanged(filters: Filters): void {
    //console.log(filters);
    this.filters = filters;
  }
}

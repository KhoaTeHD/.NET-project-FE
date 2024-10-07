import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { RevenueComponent } from './features/admin/dashboard/revenue/revenue.component';
import { ManageCategoryComponent } from './features/admin/manage-category/manage-category.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { AdminComponent } from './features/admin/admin.component';
import { ShopComponent } from './features/shop/shop/shop.component';
import { ProductDetailsComponent } from './features/shop/product-details/product-details.component';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent
    },
    {
        path: 'shop', 
        component: ShopComponent,
    },
    {
        path: 'shop/details', 
        component: ProductDetailsComponent,
    },
    {
        path: 'cart', 
        component: CartComponent,
    },
    {
        path: 'admin', 
        component: AdminComponent, 
        children: [
            {path: 'd', component: DashboardComponent},
            {path: 'category', component: ManageCategoryComponent},
        ],
    },
];

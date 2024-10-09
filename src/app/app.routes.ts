import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { RevenueComponent } from './features/admin/dashboard/revenue/revenue.component';
import { ManageCategoryComponent } from './features/admin/manage-category/manage-category.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { AdminComponent } from './features/admin/admin.component';
import { ShopComponent } from './features/shop/shop/shop.component';
import { ManageBrandComponent } from './features/admin/manage-brand/manage-brand.component';
import { ManageOrderComponent } from './features/admin/manage-order/manage-order.component';
import { ManageSizeComponent } from './features/admin/manage-size/manage-size.component';
import { ManageUserComponent } from './features/admin/manage-user/manage-user.component';
import { ManageSupplierComponent } from './features/admin/manage-supplier/manage-supplier.component';
import { ManageColorComponent } from './features/admin/manage-color/manage-color.component';
import { ManageCountryComponent } from './features/admin/manage-country/manage-country.component';
import { ManageProductComponent } from './features/admin/manage-product/manage-product.component';
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
        path: 'shop/product/details/:id', 
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
            {path: 'dashboard', component: DashboardComponent},
            {path: 'category', component: ManageCategoryComponent},
            {path: 'revenue', component: RevenueComponent},
            {path: 'brand', component: ManageBrandComponent},
            {path: 'order', component: ManageOrderComponent},
            {path: 'size', component: ManageSizeComponent},
            {path: 'user', component: ManageUserComponent},
            {path: 'supplier', component: ManageSupplierComponent},
            {path: 'color', component: ManageColorComponent},
            {path: 'country', component: ManageCountryComponent},
            {path: 'product', component: ManageProductComponent}
        ],
    },
];

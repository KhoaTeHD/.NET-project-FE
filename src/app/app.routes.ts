import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { RevenueComponent } from './features/admin/dashboard/revenue/revenue.component';
import { ManageCategoryComponent } from './features/admin/manage-category/manage-category.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ShopComponent } from './features/shop/shop/shop.component';


export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent
    },
    {
        path: 'shop', 
        component: ShopComponent
    },
    {
        path: 'admin', 
        children: [
            {path: '', component: DashboardComponent},
            {path: 'category', component: ManageCategoryComponent},
        ],
    },
];

import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { RevenueComponent } from './features/admin/dashboard/revenue/revenue.component';
import { ManageCategoryComponent } from './features/admin/manage-category/manage-category.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
<<<<<<< HEAD
import { ShopComponent } from './features/shop/shop/shop.component';

=======
import { AdminComponent } from './features/admin/admin.component';
import { ShopComponent } from './features/shop/shop/shop.component';
>>>>>>> a8e621e2e782c4203316d415c773aacd44363117

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
<<<<<<< HEAD
        path: 'admin', 
=======
        path: 'admin',
        component: AdminComponent, 
>>>>>>> a8e621e2e782c4203316d415c773aacd44363117
        children: [
            {path: 'd', component: DashboardComponent},
            {path: 'category', component: ManageCategoryComponent},
        ],
    },
];

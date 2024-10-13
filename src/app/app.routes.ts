import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { RevenueComponent } from './features/admin/dashboard/revenue/revenue.component';
import { ManageCategoryComponent } from './features/admin/manage-category/manage-category.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { AdminComponent } from './features/admin/admin.component';
import { ShopComponent } from './features/shop/shop/shop.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { RecordComponent } from './features/personal_information/record/record.component';
import { ChangePasswordComponent } from './features/personal_information/change-password/change-password.component';
import { AddressBookComponent } from './features/personal_information/address-book/address-book.component';
import { MyOrdersComponent } from './features/personal_information/my-orders/my-orders.component';

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
        component: AdminComponent, 
        children: [
            {path: 'd', component: DashboardComponent},
            {path: 'category', component: ManageCategoryComponent},
        ],
    },
    {
        path: 'sign-in', 
        component: SignInComponent
    },
    {
        path: 'sign-up', 
        component: SignUpComponent
    },
    {
        path: 'record', 
        component: RecordComponent
    },
    {
        path: 'change-password', 
        component: ChangePasswordComponent
    },
    {
        path: 'address-book', 
        component: AddressBookComponent
    },
    {
        path: 'my-orders', 
        component: MyOrdersComponent
    },
];

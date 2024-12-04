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
import { ManageGoodsReceiptComponent } from './features/admin/manage-goods-receipt/manage-goods-receipt.component';
import { PaymentComponent } from './features/payment/payment.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ManageCouponComponent } from './features/admin/manage-coupon/manage-coupon.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { PaymentAccessGuard } from './guards/payment-access.guard';
import { CustomerGuard } from './core/guards/customer.guard';
import { NonCustomerGuard } from './core/guards/non_customerguard';

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
            {path: 'product', component: ManageProductComponent},
            {path: 'goods-receipt', component: ManageGoodsReceiptComponent},
            {path: 'coupon', component: ManageCouponComponent},
            {path: '**', component: DashboardComponent}
        ],
        canActivate: [AuthGuard] // Chỉ Admin mới được truy cập
    },
    {
        path: 'sign-in', 
        component: SignInComponent,
        canActivate: [NonCustomerGuard]
    },
    {
        path: 'sign-up', 
        component: SignUpComponent,
        canActivate: [NonCustomerGuard]
    },
    {
        path: 'record', 
        component: RecordComponent,
        canActivate: [CustomerGuard]
    },
    {
        path: 'change-password', 
        component: ChangePasswordComponent,
        canActivate: [CustomerGuard]
    },
    {
        path: 'address-book', 
        component: AddressBookComponent,
        canActivate: [CustomerGuard]
    },
    {
        path: 'my-orders', 
        component: MyOrdersComponent,
        canActivate: [CustomerGuard]
    },
    {
        path: 'payment', 
        component: PaymentComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [PaymentAccessGuard]
    },
];

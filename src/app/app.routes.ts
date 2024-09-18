import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { RevenueComponent } from './features/dashboard/revenue/revenue.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'admin', component: RevenueComponent},
];

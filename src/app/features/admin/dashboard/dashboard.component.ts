import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { ManageCategoryComponent } from "../manage-category/manage-category.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminHeaderComponent, SidebarComponent, ManageCategoryComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

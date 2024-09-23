import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../../shared/components/admin-header/admin-header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ManageCategoryComponent } from "./manage-category/manage-category.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminHeaderComponent, SidebarComponent, ManageCategoryComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}

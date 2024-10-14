import { Component } from '@angular/core';
import { SidebarPersonalInfoComponent } from '../../../shared/components/sidebar-personal-info/sidebar-personal-info.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [SidebarPersonalInfoComponent, HeaderComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

}

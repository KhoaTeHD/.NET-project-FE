import { Component } from '@angular/core';
import { SidebarPersonalInfoComponent } from '../../../shared/components/sidebar-personal-info/sidebar-personal-info.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [SidebarPersonalInfoComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

}

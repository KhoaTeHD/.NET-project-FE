import { Component } from '@angular/core';
import { SidebarPersonalInfoComponent } from '../../../shared/components/sidebar-personal-info/sidebar-personal-info.component';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [SidebarPersonalInfoComponent],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent {

}

import { Component } from '@angular/core';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderComponent } from '../dialog/order/order.component';

@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [AdminFooterComponent],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.css'
})
export class ManageOrderComponent {
  dataSource:any;
  responseMessage:any;

  constructor(
    private dialog: MatDialog,
    private router:Router) { }


  handleViewDetailAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '100%'; // Set the max width of the dialog
    dialogConfig.data = {
      action: 'Add'
    };
    const dialogRef = this.dialog.open(OrderComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }
}

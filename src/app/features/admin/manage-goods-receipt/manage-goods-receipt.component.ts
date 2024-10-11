import { Component } from '@angular/core';
import { AdminFooterComponent } from "../../../shared/components/admin-footer/admin-footer.component";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GoodsReceiptComponent } from '../dialog/goods-receipt/goods-receipt.component';

@Component({
  selector: 'app-manage-goods-receipt',
  standalone: true,
  imports: [AdminFooterComponent],
  templateUrl: './manage-goods-receipt.component.html',
  styleUrl: './manage-goods-receipt.component.css'
})
export class ManageGoodsReceiptComponent {
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
    const dialogRef = this.dialog.open(GoodsReceiptComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }
}

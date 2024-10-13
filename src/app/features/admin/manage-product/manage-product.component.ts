import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductComponent } from '../dialog/product/product.component';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent {
  dataSource:any;
  responseMessage:any;
  products = [
    {
      Pro_ID: 1,
      Pro_name: 'Áo thun nam',
      Pro_status: true,
      variations: [
        { ProV_ID: 101, Col_ID: 'Đỏ', Siz_ID: 'M', ProV_Price: 200000, ProV_Quantity: 10, ProV_Discount: 10, ProV_Status: true },
        { ProV_ID: 102, Col_ID: 'Xanh', Siz_ID: 'L', ProV_Price: 210000, ProV_Quantity: 5, ProV_Discount: 5, ProV_Status: true }
      ]
    },
    {
      Pro_ID: 2,
      Pro_name: 'Quần jean nữ',
      Pro_status: false,
      variations: [
        { ProV_ID: 201, Col_ID: 'Xanh', Siz_ID: 'S', ProV_Price: 350000, ProV_Quantity: 20, ProV_Discount: 15, ProV_Status: false },
        { ProV_ID: 202, Col_ID: 'Đen', Siz_ID: 'M', ProV_Price: 360000, ProV_Quantity: 10, ProV_Discount: 10, ProV_Status: true }
      ]
    }
  ];

  constructor(
    private dialog: MatDialog,
    private router:Router) { }


  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }

  handleEditAction(values:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data:values
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }
}

import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SupplierComponent } from '../dialog/supplier/supplier.component';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-manage-supplier',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule],
  templateUrl: './manage-supplier.component.html',
  styleUrl: './manage-supplier.component.css'
})
export class ManageSupplierComponent {
  dataSource:any;
  responseMessage:any;
  suppliers = [
    { Supplier_ID: 1, SupplierName: 'Nhà cung cấp A', Address: 'Hà Nội', PhoneNumber: '0123456789', Status: 1 },
    { Supplier_ID: 2, SupplierName: 'Nhà cung cấp B', Address: 'TP.HCM', PhoneNumber: '0987654321', Status: 1 },
    { Supplier_ID: 3, SupplierName: 'Nhà cung cấp C', Address: 'Đà Nẵng', PhoneNumber: '0123467890', Status: 1 },
    { Supplier_ID: 4, SupplierName: 'Nhà cung cấp D', Address: 'Cần Thơ', PhoneNumber: '0987654322', Status: 0 },
    { Supplier_ID: 5, SupplierName: 'Nhà cung cấp E', Address: 'Hải Phòng', PhoneNumber: '0123456788', Status: 1 }
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
    const dialogRef = this.dialog.open(SupplierComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(SupplierComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }
}

import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColorComponent } from '../dialog/color/color.component';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-manage-color',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule],
  templateUrl: './manage-color.component.html',
  styleUrl: './manage-color.component.css'
})
export class ManageColorComponent {
  dataSource:any;
  responseMessage:any;
  colors = [
    { Col_ID: 1, Col_Name: 'Đỏ', Col_Status: 1 },
    { Col_ID: 2, Col_Name: 'Xanh', Col_Status: 1 },
    { Col_ID: 3, Col_Name: 'Vàng', Col_Status: 1 },
    { Col_ID: 4, Col_Name: 'Tím', Col_Status: 1 },
    { Col_ID: 5, Col_Name: 'Đen', Col_Status: 1 },
    { Col_ID: 6, Col_Name: 'Trắng', Col_Status: 1 },
    { Col_ID: 7, Col_Name: 'Cam', Col_Status: 1 },
    { Col_ID: 8, Col_Name: 'Hồng', Col_Status: 1 },
    { Col_ID: 9, Col_Name: 'Xám', Col_Status: 1 },
    { Col_ID: 10, Col_Name: 'Nâu', Col_Status: 1 }
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
    const dialogRef = this.dialog.open(ColorComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(ColorComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }
}

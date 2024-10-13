import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SizeComponent } from '../dialog/size/size.component';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-manage-size',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule],
  templateUrl: './manage-size.component.html',
  styleUrl: './manage-size.component.css'
})
export class ManageSizeComponent {
  dataSource:any;
  responseMessage:any;
  sizes = [
    { Siz_ID: 1, Siz_Name: 'S', Siz_Desc: 'Size nhỏ', Siz_Status: 1 },
    { Siz_ID: 2, Siz_Name: 'M', Siz_Desc: 'Size trung bình', Siz_Status: 1 },
    { Siz_ID: 3, Siz_Name: 'L', Siz_Desc: 'Size lớn', Siz_Status: 1 },
    { Siz_ID: 4, Siz_Name: 'XL', Siz_Desc: 'Size rất lớn', Siz_Status: 1 },
    { Siz_ID: 5, Siz_Name: 'XXL', Siz_Desc: 'Size cực lớn', Siz_Status: 0 }
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
    const dialogRef = this.dialog.open(SizeComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(SizeComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }
}

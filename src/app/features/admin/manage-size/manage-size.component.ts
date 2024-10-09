import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SizeComponent } from '../dialog/size/size.component';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';

@Component({
  selector: 'app-manage-size',
  standalone: true,
  imports: [AdminFooterComponent],
  templateUrl: './manage-size.component.html',
  styleUrl: './manage-size.component.css'
})
export class ManageSizeComponent {
  displayedColumns:string[] = ['name', 'edit'];
  dataSource:any;
  responseMessage:any;

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

import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColorComponent } from '../dialog/color/color.component';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';

@Component({
  selector: 'app-manage-color',
  standalone: true,
  imports: [AdminFooterComponent],
  templateUrl: './manage-color.component.html',
  styleUrl: './manage-color.component.css'
})
export class ManageColorComponent {
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

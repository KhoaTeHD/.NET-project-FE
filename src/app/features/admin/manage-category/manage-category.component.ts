import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryComponent } from '../dialog/category/category.component';
import { Router } from '@angular/router';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';

@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [AdminFooterComponent],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent {
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
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }
}

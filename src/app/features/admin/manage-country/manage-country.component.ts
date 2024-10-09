import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CountryComponent } from '../dialog/country/country.component';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';

@Component({
  selector: 'app-manage-country',
  standalone: true,
  imports: [AdminFooterComponent],
  templateUrl: './manage-country.component.html',
  styleUrl: './manage-country.component.css'
})
export class ManageCountryComponent {
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
    const dialogRef = this.dialog.open(CountryComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(CountryComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }
}

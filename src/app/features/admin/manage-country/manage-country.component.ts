import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CountryComponent } from '../dialog/country/country.component';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-manage-country',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule],
  templateUrl: './manage-country.component.html',
  styleUrl: './manage-country.component.css'
})
export class ManageCountryComponent {
  dataSource:any;
  responseMessage:any;
  nations = [
    { Nat_ID: 1, Nat_Name: 'Việt Nam', Nat_Status: 1 },
    { Nat_ID: 2, Nat_Name: 'Hoa Kỳ', Nat_Status: 1 },
    { Nat_ID: 3, Nat_Name: 'Nhật Bản', Nat_Status: 1 },
    { Nat_ID: 4, Nat_Name: 'Hàn Quốc', Nat_Status: 1 },
    { Nat_ID: 5, Nat_Name: 'Pháp', Nat_Status: 0 }
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

  getSeverity(status: number) {
    switch (status) {
        case 1:
            return 'success';
        case 0:
            return 'danger';
        default:
            return undefined;
    }
  }
}

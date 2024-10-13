import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrandComponent } from '../dialog/brand/brand.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-brand',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule],
  templateUrl: './manage-brand.component.html',
  styleUrl: './manage-brand.component.css'
})
export class ManageBrandComponent{
  dataSource:any;
  responseMessage:any;
  brands = [
    { Bra_ID: 1, Bra_Name: 'Vinamilk', Bra_Status: 1 },
    { Bra_ID: 2, Bra_Name: 'Th True Milk', Bra_Status: 1 },
    { Bra_ID: 3, Bra_Name: 'Nestlé', Bra_Status: 1 },
    { Bra_ID: 4, Bra_Name: 'Coca-Cola Vietnam', Bra_Status: 1 },
    { Bra_ID: 5, Bra_Name: 'PepsiCo', Bra_Status: 0 },
    { Bra_ID: 6, Bra_Name: "Biti's", Bra_Status: 1 },
    { Bra_ID: 7, Bra_Name: 'Trung Nguyên', Bra_Status: 1 },
    { Bra_ID: 8, Bra_Name: 'Kinh Đô', Bra_Status: 1 },
    { Bra_ID: 9, Bra_Name: 'Vissan', Bra_Status: 1 },
    { Bra_ID: 10, Bra_Name: 'Masan', Bra_Status: 1 }
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
    const dialogRef = this.dialog.open(BrandComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(BrandComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }
  
  statusFormatter(value: number) {
    console.log("Status Formatter called with value:", value); 
    if (value == 0) {
      return '<span class="text-success">Hoạt động</span>';
    } else {
      return '<span class="text-danger">Không hoạt động</span>';
    }
  }
}

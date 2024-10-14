import { Component, OnInit} from '@angular/core';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrandComponent } from '../dialog/brand/brand.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-manage-brand',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './manage-brand.component.html',
  styleUrl: './manage-brand.component.css'
})

export class ManageBrandComponent implements OnInit {
  dataSource: any;
  responseMessage: any;

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

  statuses!: SelectItem[];

  clonedBrands: { [id: number]: Brand } = {};

  ngOnInit(): void {
    this.statuses = [
      { label: 'Hoạt động', value: 1 },
      { label: 'Ngừng bán', value: 0 }
    ];
  }

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private messageService: MessageService) { }


  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(BrandComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    })
  }

  // handleEditAction(values:string){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.data = {
  //     action: 'Edit',
  //     data:values
  //   }
  //   dialogConfig.width = "850px";
  //   const dialogRef = this.dialog.open(BrandComponent, dialogConfig);
  //   this.router.events.subscribe(()=>{
  //     dialogRef.close();
  //   })
  // }

  onRowEditInit(brand: Brand) {
    this.clonedBrands[brand.Bra_ID as number] = { ...brand };
  }

  onRowEditSave(brand: Brand, index: number) {
    if (brand.Bra_Name.trim().length !== 0) {
      delete this.clonedBrands[brand.Bra_ID as number];
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thương hiệu đã được cập nhật' });
    } else {
      this.brands[index] = this.clonedBrands[brand.Bra_ID as number];
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tên không hợp lệ' });
    }
  }

  onRowEditCancel(brand: Brand, index: number) {
    this.brands[index] = this.clonedBrands[brand.Bra_ID as number];
    delete this.clonedBrands[brand.Bra_ID as number];
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
interface Brand {
  Bra_ID: number;
  Bra_Name: string;
  Bra_Status: number;
}
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryComponent } from '../dialog/category/category.component';
import { Router } from '@angular/router';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent {
  dataSource:any;
  responseMessage:any;
  categories = [
    { Cat_ID: 1, Cat_Name: 'Điện thoại', Cat_Desc: 'Các loại điện thoại di động', Cat_Status: 1 },
    { Cat_ID: 2, Cat_Name: 'Máy tính bảng', Cat_Desc: 'Máy tính bảng và phụ kiện', Cat_Status: 1 },
    { Cat_ID: 3, Cat_Name: 'Laptop', Cat_Desc: 'Máy tính xách tay và linh kiện', Cat_Status: 1 },
    { Cat_ID: 4, Cat_Name: 'Máy tính để bàn', Cat_Desc: 'Các loại máy tính để bàn', Cat_Status: 1 },
    { Cat_ID: 5, Cat_Name: 'Phụ kiện máy tính', Cat_Desc: 'Phụ kiện cho máy tính', Cat_Status: 1 },
    { Cat_ID: 6, Cat_Name: 'Máy ảnh', Cat_Desc: 'Máy ảnh kỹ thuật số và phụ kiện', Cat_Status: 1 },
    { Cat_ID: 7, Cat_Name: 'Tivi', Cat_Desc: 'Các loại tivi', Cat_Status: 1 },
    { Cat_ID: 8, Cat_Name: 'Thiết bị âm thanh', Cat_Desc: 'Loa, tai nghe và phụ kiện âm thanh', Cat_Status: 1 },
    { Cat_ID: 9, Cat_Name: 'Thiết bị gia dụng', Cat_Desc: 'Các thiết bị gia dụng', Cat_Status: 1 },
    { Cat_ID: 10, Cat_Name: 'Điều hòa', Cat_Desc: 'Máy điều hòa nhiệt độ', Cat_Status: 1 },
    { Cat_ID: 11, Cat_Name: 'Tủ lạnh', Cat_Desc: 'Các loại tủ lạnh', Cat_Status: 1 },
    { Cat_ID: 12, Cat_Name: 'Máy giặt', Cat_Desc: 'Các loại máy giặt', Cat_Status: 1 },
    { Cat_ID: 13, Cat_Name: 'Quạt điện', Cat_Desc: 'Các loại quạt điện', Cat_Status: 1 },
    { Cat_ID: 14, Cat_Name: 'Đồ dùng nhà bếp', Cat_Desc: 'Các loại đồ dùng nhà bếp', Cat_Status: 1 },
    { Cat_ID: 15, Cat_Name: 'Đèn chiếu sáng', Cat_Desc: 'Các loại đèn chiếu sáng', Cat_Status: 1 },
    { Cat_ID: 16, Cat_Name: 'Sách', Cat_Desc: 'Các loại sách', Cat_Status: 1 },
    { Cat_ID: 17, Cat_Name: 'Đồ chơi trẻ em', Cat_Desc: 'Đồ chơi cho trẻ em', Cat_Status: 1 },
    { Cat_ID: 18, Cat_Name: 'Quần áo nam', Cat_Desc: 'Các loại quần áo dành cho nam', Cat_Status: 1 },
    { Cat_ID: 19, Cat_Name: 'Quần áo nữ', Cat_Desc: 'Các loại quần áo dành cho nữ', Cat_Status: 1 },
    { Cat_ID: 20, Cat_Name: 'Giày dép', Cat_Desc: 'Giày dép các loại', Cat_Status: 1 },
    { Cat_ID: 21, Cat_Name: 'Mỹ phẩm', Cat_Desc: 'Các loại mỹ phẩm', Cat_Status: 1 },
    { Cat_ID: 22, Cat_Name: 'Nước hoa', Cat_Desc: 'Các loại nước hoa', Cat_Status: 1 },
    { Cat_ID: 23, Cat_Name: 'Trang sức', Cat_Desc: 'Các loại trang sức', Cat_Status: 1 },
    { Cat_ID: 24, Cat_Name: 'Đồ điện tử', Cat_Desc: 'Các loại đồ điện tử', Cat_Status: 1 },
    { Cat_ID: 25, Cat_Name: 'Đồ dùng thể thao', Cat_Desc: 'Các dụng cụ thể thao', Cat_Status: 1 }
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

import { Component, OnInit } from '@angular/core';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderComponent } from '../dialog/order/order.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.css'
})
export class ManageOrderComponent implements OnInit{
  dataSource:any;
  responseMessage:any;
  orders = [
    {
      orderId: '000001',
      customerId: '00001',
      discountCode: 'Mã giảm giá',
      address: '34, Phường Bồng Lai, Thị xã Quế Võ, Tỉnh Bắc Ninh',
      orderDate: new Date('2024-05-19T05:04:42'),
      discount: -20000,
      totalAmount: 7605000,
      status: 0 // 0 là chưa xác nhận, 1 là đã xác nhận
    },
    {
      orderId: '000002',
      customerId: '00002',
      discountCode: 'Mã giảm giá 2',
      address: '12, Phường Đình Bảng, Thị xã Từ Sơn, Tỉnh Bắc Ninh',
      orderDate: new Date('2024-05-20T06:00:00'),
      discount: -15000,
      totalAmount: 5000000,
      status: 1
    },
    // Thêm các dữ liệu mẫu khác
  ];

  constructor(
    private dialog: MatDialog,
    private router:Router) { }


  handleViewDetailAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '100%'; // Set the max width of the dialog
    dialogConfig.data = {
      action: 'Add'
    };
    const dialogRef = this.dialog.open(OrderComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }

  ngOnInit(): void {
    (window as any).actionEvents = {
      'click .viewOrder': function (e: any, value: any, row: any, index: any) {
        // Tham chiếu tới hàm trong Angular
        const orderComponent = new ManageOrderComponent(this.dialog, this.router);
        orderComponent.handleViewDetailAction();
      }
    };
  }
}


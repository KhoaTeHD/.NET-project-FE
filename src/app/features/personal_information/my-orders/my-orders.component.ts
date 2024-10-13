import { Component } from '@angular/core';
import { SidebarPersonalInfoComponent } from '../../../shared/components/sidebar-personal-info/sidebar-personal-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [SidebarPersonalInfoComponent, CommonModule, FormsModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orders: Order[] = [
    {
      order_id: 1,
      customer_name: "Nguyễn Văn A",
      coupon_code: "DISCOUNT10",
      order_date: "2024-10-01",
      estimated_price: 150000,
      shipping_charge: 30000,
      discount: 10000,
      order_status: "Đã giao",
      form_of_payment: "Thẻ tín dụng",
      orderDetails: [
        {
          product_pic: "///////",
          product_name: "Áo thun nam",
          product_color: "Đen",
          product_size: "M",
          quantity: 1,
          unit_price: 50000
        },
        {
          product_pic: "///////",
          product_name: "Quần jean",
          product_color: "Xanh",
          product_size: "L",
          quantity: 1,
          unit_price: 70000
        },
        {
          product_pic: "///////",
          product_name: "Giày sneaker",
          product_color: "Trắng",
          product_size: "42",
          quantity: 1,
          unit_price: 80000
        }
      ]
    },
    {
      order_id: 2,
      customer_name: "Trần Thị B",
      coupon_code: "SAVE20",
      order_date: "2024-10-05",
      estimated_price: 200000,
      shipping_charge: 25000,
      discount: 20000,
      order_status: "Đang vận chuyển",
      form_of_payment: "Tiền mặt",
      orderDetails: [
        {
          product_pic: "///////",
          product_name: "Đầm nữ",
          product_color: "Đỏ",
          product_size: "S",
          quantity: 1,
          unit_price: 120000
        },
        {
          product_pic: "///////",
          product_name: "Túi xách",
          product_color: "Đen",
          product_size: "M",
          quantity: 1,
          unit_price: 60000
        },
        {
          product_pic: "///////",
          product_name: "Kính mát",
          product_color: "Đen",
          product_size: "Không",
          quantity: 1,
          unit_price: 50000
        }
      ]
    },
    {
      order_id: 3,
      customer_name: "Lê Văn C",
      coupon_code: "FREESHIP",
      order_date: "2024-10-07",
      estimated_price: 180000,
      shipping_charge: 0,
      discount: 15000,
      order_status: "Đã giao",
      form_of_payment: "Chuyển khoản",
      orderDetails: [
        {
          product_pic: "///////",
          product_name: "Sandal",
          product_color: "Nâu",
          product_size: "39",
          quantity: 1,
          unit_price: 70000
        },
        {
          product_pic: "///////",
          product_name: "T-shirt nữ",
          product_color: "Hồng",
          product_size: "M",
          quantity: 2,
          unit_price: 45000
        },
        {
          product_pic: "///////",
          product_name: "Quần sooc",
          product_color: "Trắng",
          product_size: "L",
          quantity: 1,
          unit_price: 30000
        }
      ]
    },
    {
      order_id: 4,
      customer_name: "Nguyễn Thị D",
      coupon_code: "SUMMER30",
      order_date: "2024-10-10",
      estimated_price: 220000,
      shipping_charge: 30000,
      discount: 0,
      order_status: "Đang chờ xử lý",
      form_of_payment: "Thẻ ghi nợ",
      orderDetails: [
        {
          product_pic: "///////g",
          product_name: "Áo khoác",
          product_color: "Xám",
          product_size: "M",
          quantity: 1,
          unit_price: 120000
        },
        {
          product_pic: "///////g",
          product_name: "Giày thể thao",
          product_color: "Đen",
          product_size: "41",
          quantity: 1,
          unit_price: 95000
        },
        {
          product_pic: "///////g",
          product_name: "Váy",
          product_color: "Xanh",
          product_size: "S",
          quantity: 1,
          unit_price: 35000
        }
      ]
    },
    {
      order_id: 5,
      customer_name: "Phạm Văn E",
      coupon_code: "NEWUSER15",
      order_date: "2024-10-12",
      estimated_price: 250000,
      shipping_charge: 20000,
      discount: 15000,
      order_status: "Đã giao",
      form_of_payment: "Tiền mặt",
      orderDetails: [
        {
          product_pic: "///////g",
          product_name: "Balo",
          product_color: "Đen",
          product_size: "Không",
          quantity: 1,
          unit_price: 90000
        },
        {
          product_pic: "///////g",
          product_name: "Nón",
          product_color: "Xanh",
          product_size: "Không",
          quantity: 1,
          unit_price: 40000
        },
        {
          product_pic: "///////g",
          product_name: "Túi du lịch",
          product_color: "Nâu",
          product_size: "Không",
          quantity: 1,
          unit_price: 120000
        }
      ]
    },
    {
      order_id: 6,
      customer_name: "Trương Thị F",
      coupon_code: "BLACKFRIDAY50",
      order_date: "2024-10-15",
      estimated_price: 300000,
      shipping_charge: 50000,
      discount: 50000,
      order_status: "Đang vận chuyển",
      form_of_payment: "Chuyển khoản",
      orderDetails: [
        {
          product_pic: "///////g",
          product_name: "Sofa",
          product_color: "Xám",
          product_size: "L",
          quantity: 1,
          unit_price: 150000
        },
        {
          product_pic: "///////g",
          product_name: "Bàn trà",
          product_color: "Đen",
          product_size: "Không",
          quantity: 1,
          unit_price: 120000
        },
        {
          product_pic: "///////g",
          product_name: "Ghế",
          product_color: "Trắng",
          product_size: "Không",
          quantity: 1,
          unit_price: 30000
        }
      ]
    }
  ];
  
  total_order:number = this.orders.length;
}

interface OrderDetail {
  product_pic: string;
  product_name: string;
  product_color: string;
  product_size: string;
  quantity: number;
  unit_price: number;
}

interface Order {
  order_id: number;
  customer_name: string;
  coupon_code: string;
  order_date: string;
  estimated_price: number;
  shipping_charge: number;
  discount: number;
  order_status: string;
  form_of_payment: string;
  orderDetails: OrderDetail[]; // Thêm thuộc tính orderDetails
}

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
      customer_phone: "0912345678",
      order_address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
      coupon_code: "DISCOUNT10",
      order_date: "2024-10-01",
      estimated_price: 150000,
      shipping_charge: 30000,
      discount: 10000,
      order_status: "Đã giao",
      form_of_payment: "Thẻ tín dụng",
      orderDetails: [
        {
          product_pic: "ao_mau.png",
          product_name: "Áo thun nam",
          product_color: "Đen",
          product_size: "M",
          quantity: 1,
          unit_price: 50000
        },
        {
          product_pic: "ao_mau.png",
          product_name: "Quần jean",
          product_color: "Xanh",
          product_size: "L",
          quantity: 1,
          unit_price: 70000
        },
        {
          product_pic: "ao_mau.png",
          product_name: "Giày sneaker",
          product_color: "Trắng",
          product_size: "42",
          quantity: 1,
          unit_price: 80000
        },
        {
          product_pic: "ao_mau.png",
          product_name: "Áo thun nam",
          product_color: "Đen",
          product_size: "M",
          quantity: 1,
          unit_price: 50000
        },
        {
          product_pic: "ao_mau.png",
          product_name: "Quần jean",
          product_color: "Xanh",
          product_size: "L",
          quantity: 1,
          unit_price: 70000
        },
        {
          product_pic: "ao_mau.png",
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
      customer_phone: "0987654321",
      order_address: "456 Đường DEF, Quận 3, TP. Hồ Chí Minh",
      coupon_code: "SAVE20",
      order_date: "2024-10-05",
      estimated_price: 200000,
      shipping_charge: 25000,
      discount: 20000,
      order_status: "Đang giao hàng",
      form_of_payment: "Tiền mặt",
      orderDetails: [
        {
          product_pic: "ao_mau.png",
          product_name: "Đầm nữ",
          product_color: "Đỏ",
          product_size: "S",
          quantity: 1,
          unit_price: 120000
        },
        {
          product_pic: "ao_mau.png",
          product_name: "Túi xách",
          product_color: "Đen",
          product_size: "M",
          quantity: 1,
          unit_price: 60000
        },
        {
          product_pic: "ao_mau.png",
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
      customer_phone: "0933221100",
      order_address: "789 Đường GHI, Quận 5, TP. Hồ Chí Minh",
      coupon_code: "FREESHIP",
      order_date: "2024-10-07",
      estimated_price: 180000,
      shipping_charge: 0,
      discount: 15000,
      order_status: "Đã giao",
      form_of_payment: "Chuyển khoản",
      orderDetails: [
        {
          product_pic: "ao_mau.png",
          product_name: "Sandal",
          product_color: "Nâu",
          product_size: "39",
          quantity: 1,
          unit_price: 70000
        },
        {
          product_pic: "ao_mau.png",
          product_name: "T-shirt nữ",
          product_color: "Hồng",
          product_size: "M",
          quantity: 2,
          unit_price: 45000
        },
        {
          product_pic: "ao_mau.png",
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
      customer_phone: "0944112233",
      order_address: "101 Đường JKL, Quận 7, TP. Hồ Chí Minh",
      coupon_code: "SUMMER30",
      order_date: "2024-10-10",
      estimated_price: 220000,
      shipping_charge: 30000,
      discount: 0,
      order_status: "Đang xử lý",
      form_of_payment: "Thẻ ghi nợ",
      orderDetails: [
        {
          product_pic: "ao_mau.png",
          product_name: "Áo khoác",
          product_color: "Xám",
          product_size: "M",
          quantity: 1,
          unit_price: 120000
        },
        {
          product_pic: "ao_mau.png",
          product_name: "Giày thể thao",
          product_color: "Đen",
          product_size: "41",
          quantity: 1,
          unit_price: 95000
        },
        {
          product_pic: "ao_mau.png",
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
      customer_phone: "0900998877",
      order_address: "202 Đường MNO, Quận 9, TP. Hồ Chí Minh",
      coupon_code: "NEWUSER15",
      order_date: "2024-10-12",
      estimated_price: 250000,
      shipping_charge: 20000,
      discount: 15000,
      order_status: "Đã giao",
      form_of_payment: "Tiền mặt",
      orderDetails: [
        {
          product_pic: "ao_mau.png",
          product_name: "Balo",
          product_color: "Đen",
          product_size: "Không",
          quantity: 1,
          unit_price: 90000
        },
        {
          product_pic: "ao_mau.png",
          product_name: "Nón",
          product_color: "Xanh",
          product_size: "Không",
          quantity: 1,
          unit_price: 40000
        },
        {
          product_pic: "ao_mau.png",
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
      customer_phone: "0911002233",
      order_address: "303 Đường PQR, Quận Bình Thạnh, TP. Hồ Chí Minh",
      coupon_code: "BLACKFRIDAY50",
      order_date: "2024-10-15",
      estimated_price: 300000,
      shipping_charge: 50000,
      discount: 50000,
      order_status: "Đang giao hàng",
      form_of_payment: "Chuyển khoản",
      orderDetails: [
        {
          product_pic: "ao_mau.png",
          product_name: "Sofa",
          product_color: "Xám",
          product_size: "L",
          quantity: 1,
          unit_price: 150000
        },
        {
          product_pic: "ao_mau.png",
          product_name: "Bàn trà",
          product_color: "Đen",
          product_size: "Không",
          quantity: 1,
          unit_price: 120000
        },
        {
          product_pic: "ao_mau.png",
          product_name: "Ghế",
          product_color: "Trắng",
          product_size: "Không",
          quantity: 1,
          unit_price: 30000
        }
      ]
    }
  ];

  selectedOrder: Order = {
    order_id: 0,
    customer_name: "",
    customer_phone: "",
    order_address: "",
    coupon_code: "",
    order_date: "",
    estimated_price: 0,
    shipping_charge: 0,
    discount: 0,
    order_status: "",
    form_of_payment: "",
    orderDetails: []
  };

  openModal(order: Order) {
    this.selectedOrder = {...order};
  }

  filteredOrders = this.orders;

  // Phương thức lọc đơn hàng
  filterOrders(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Ép kiểu cho event.target
    const status = selectElement.value; // Lấy giá trị từ dropdown

    if (status === 'Tất cả') {
      this.filteredOrders = [...this.orders]; // Hiện tất cả đơn hàng
    } else {
      this.filteredOrders = this.orders.filter(order => order.order_status === status);
    }
}
  
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
  customer_phone: string;
  order_address: string;
  coupon_code: string;
  order_date: string;
  estimated_price: number;
  shipping_charge: number;
  discount: number;
  order_status: string;
  form_of_payment: string;
  orderDetails: OrderDetail[]; // Thêm thuộc tính orderDetails
}

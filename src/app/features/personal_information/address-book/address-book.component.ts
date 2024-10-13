import { Component } from '@angular/core';
import { SidebarPersonalInfoComponent } from '../../../shared/components/sidebar-personal-info/sidebar-personal-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-book',
  standalone: true,
  imports: [SidebarPersonalInfoComponent, CommonModule, FormsModule],
  templateUrl: './address-book.component.html',
  styleUrl: './address-book.component.css'
})


export class AddressBookComponent {
  address_book: Address[] = [
    {id: 1, customer_id: 1, full_name: "Võ Văn Hùng", phone: "0907604514", province: "Thành phố Hồ Chí Minh", district: "Quận 8", ward: "Phường 4", address_line: "241 Cao Lỗ", is_default: 1},
    {id: 2, customer_id: 1, full_name: "Võ Quang Đăng Khoa", phone: "0907604514", province: "Thành phố Hồ Chí Minh", district: "Quận 8", ward: "Phường 4", address_line: "241 Cao Lỗ", is_default: 0},
    {id: 3, customer_id: 1, full_name: "Nguyễn Thị Trà My", phone: "0907604514", province: "Thành phố Hồ Chí Minh", district: "Quận 8", ward: "Phường 4", address_line: "241 Cao Lỗ", is_default: 0}
  ]

  selectedAddress: Address = {
    id: 0,
    full_name: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    address_line: "",
    is_default: 0,
    customer_id: 1
  };

  setDefaultAddress(address_id: number) {
    // Đặt tất cả địa chỉ thành không phải mặc định
    this.address_book.forEach((addr) => {
      addr.is_default = 0;
    });

    // Đặt địa chỉ được chọn thành mặc định
    const selectedAddr = this.address_book.find((addr) => addr.id === address_id);
    if (selectedAddr) {
      selectedAddr.is_default = 1;
    }

    // Sắp xếp địa chỉ với địa chỉ mặc định ở đầu
    this.address_book.sort((a, b) => b.is_default - a.is_default);
  }

  openModal(address_id: number) {
    // Lấy thông tin địa chỉ từ danh sách dựa vào ID
    const address = this.address_book.find((addr: Address) => addr.id === address_id);
    if (address) {
      // Tạo bảng sao đối tượng tránh lỗi binding
      this.selectedAddress = {...address};
    }
  }
}

interface Address {
  id: number;
  full_name: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address_line: string;
  is_default: number;
  customer_id: number
}

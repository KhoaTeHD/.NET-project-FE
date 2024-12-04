import { Component } from '@angular/core';
import { SidebarPersonalInfoComponent } from '../../../shared/components/sidebar-personal-info/sidebar-personal-info.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { AddressDto } from '../../../core/models/address.model';
import { firstValueFrom } from 'rxjs';
import { TokenStorageService } from '../../../core/services/auth/token-storage.service';
import { UserDto } from '../../../core/models/auth/user-dto.model';
import { AddressApiService } from '../../../core/services/address-api.service';
import { AddressService } from '../../../core/services/address.service';
import { MessageService } from 'primeng/api'; // Import MessageService
import { ToastModule } from 'primeng/toast';
// npm install sweetalert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address-book',
  standalone: true,
  imports: [SidebarPersonalInfoComponent, CommonModule, FormsModule, HeaderComponent, ReactiveFormsModule, ToastModule],
  templateUrl: './address-book.component.html',
  styleUrl: './address-book.component.css',
  providers: [MessageService],
})


export class AddressBookComponent {
  address_book: AddressDto[] = []
  user: UserDto | null = null;
  isLoading: boolean = false;

  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  selectedAddress: AddressDto = {
    address_ID: 0,
    customer_ID: "",
    addressLine: "",
    province: "",
    ward: "",
    district: "",
    phone: "",
    name: "",
    isDefault: false
  };

  newAddress: AddressDto = {
    address_ID: 0,
    customer_ID: "",
    addressLine: "",
    province: "",
    ward: "",
    district: "",
    phone: "",
    name: "",
    isDefault: false
  }

  insert_address_F: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    province: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    ward: new FormControl('', [Validators.required]),
    addressLine: new FormControl('', [Validators.required]),
    isDefault: new FormControl(false),
  });

  update_address_F: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    province: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    ward: new FormControl('', [Validators.required]),
    addressLine: new FormControl('', [Validators.required]),
    isDefault: new FormControl(false),
  });

  constructor(
    private addressService: AddressService,
    private tokenService: TokenStorageService,
    private addressApiService: AddressApiService,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    this.user = this.tokenService.getUser();
    this.loadAddress();
    await this.loadProvinces();
  }

  async setDefaultAddress(address_id: number) {
    const result = await Swal.fire({
      title: 'Thiết lặp mặc định?',
      text: 'Bạn có chắn chắn muốn lập địa chỉ này làm địa chỉ mặc định?',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Chấp nhận',
    });

    if (result.isConfirmed) {
      try {
        this.addressService.setDefaultAddress(address_id, this.tokenService.getUser()?.id).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công!',
              detail: 'Đặt địa chỉ mặc định thành công!',
            });
            setTimeout(() => {
              this.resetComponent();
            }, 500);
          },
          error: (err) => {
            console.error('Error when updating user:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại!',
              detail: 'Đặt địa chỉ mặc định thất bại!',
            });
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async openUpdateModal(address_id: number) {
    // Lấy thông tin địa chỉ từ danh sách dựa vào ID
    const address = this.address_book.find((addr: AddressDto) => addr.address_ID === address_id);
    if (address) {
      // Tạo bảng sao đối tượng tránh lỗi binding
      this.selectedAddress = { ...address };
      const province = this.selectedAddress.province || '';
      const provinceId = province.split('#')[0];
      const data1: any = await firstValueFrom(this.addressApiService.getDistricts(Number(provinceId)));
      if (data1.error === 0) {
        this.districts = data1.data;
      }

      const district = this.selectedAddress.district || '';
      const districtId = district.split('#')[0];
      const data2: any = await firstValueFrom(this.addressApiService.getWards(Number(districtId)));
      if (data2.error === 0) {
        this.wards = data2.data;
      }

      console.log(this.wards);
      this.update_address_F.patchValue({
        name: this.selectedAddress.name,
        phone: this.selectedAddress.phone,
        province: this.selectedAddress.province,
        district: this.selectedAddress.district,
        ward: this.selectedAddress.ward,
        addressLine: this.selectedAddress.addressLine,
        isDefault: this.selectedAddress.isDefault,
      });
    }
  }

  async loadAddress(): Promise<void> {
    try {
      // Sử dụng firstValueFrom để lấy dữ liệu từ observable
      const data = await firstValueFrom(this.addressService.getAddressesByCustomerId(this.user!.id));
      if (data.isSuccess && Array.isArray(data.result)) {
        this.address_book = data.result;
        this.address_book.sort((a, b) => {
          // Chuyển đổi boolean sang số: true -> 1, false -> 0
          return Number(b.isDefault) - Number(a.isDefault);
        });
      }
    } catch (error) {
      console.error('Error fetching brands', error);
    }
  }

  // Lấy danh sách Tỉnh Thành
  async loadProvinces(): Promise<void> {
    try {
      const data: any = await firstValueFrom(this.addressApiService.getProvinces());  // Thay thế toPromise bằng firstValueFrom
      if (data.error === 0) {
        this.provinces = data.data;
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách Tỉnh Thành:', error);
    }
  }

  async onProvinceChange(): Promise<void> {
    this.districts = [];
    this.wards = [];
    if (this.insert_address_F.get('province')?.value !== "") {
      try {
        const data: any = await firstValueFrom(this.addressApiService.getDistricts(this.insert_address_F.get('province')?.value.split('#')[0]));  // Thay thế toPromise bằng firstValueFrom
        if (data.error === 0) {
          this.districts = data.data;
        }
        this.insert_address_F.patchValue({
          district: '',
          ward: ''
        });
      } catch (error) {
        console.error('Lỗi khi tải quận huyện:', error);
      }
    }
  }

  async onDistrictChange(): Promise<void> {
    this.wards = [];
    if (this.insert_address_F.get('district')?.value !== 0) {
      try {
        const data: any = await firstValueFrom(this.addressApiService.getWards(this.insert_address_F.get('district')?.value.split('#')[0]));  // Thay thế toPromise bằng firstValueFrom
        if (data.error === 0) {
          this.wards = data.data;
        }
        this.insert_address_F.patchValue({
          ward: ''
        });
      } catch (error) {
        console.error('Lỗi khi tải phường xã:', error);
      }
    }
  }

  async onProvinceUpdateFChange(): Promise<void> {
    this.districts = [];
    this.wards = [];
    if (this.update_address_F.get('province')?.value !== "") {
      try {
        const data: any = await firstValueFrom(this.addressApiService.getDistricts(this.update_address_F.get('province')?.value.split('#')[0]));  // Thay thế toPromise bằng firstValueFrom
        if (data.error === 0) {
          this.districts = data.data;
        }
        this.update_address_F.patchValue({
          district: '',
          ward: ''
        });
      } catch (error) {
        console.error('Lỗi khi tải quận huyện:', error);
      }
    }
  }

  async onDistrictUpdateFChange(): Promise<void> {
    this.wards = [];
    if (this.update_address_F.get('district')?.value !== 0) {
      try {
        const data: any = await firstValueFrom(this.addressApiService.getWards(this.update_address_F.get('district')?.value.split('#')[0]));  // Thay thế toPromise bằng firstValueFrom
        if (data.error === 0) {
          this.wards = data.data;
        }
        this.update_address_F.patchValue({
          ward: ''
        });
      } catch (error) {
        console.error('Lỗi khi tải phường xã:', error);
      }
    }
  }

  async insertAdress(): Promise<void> {
    const result = await Swal.fire({
      title: 'Thêm địa chỉ?',
      text: 'Bạn có chắn chắn muốn thêm địa chỉ này?',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Chấp nhận',
    });

    if (result.isConfirmed && this.insert_address_F.valid) {
      try {
        this.isLoading = true; // Bật chờ loading
        // Cập nhật registrationRequestDto từ giá trị của form
        this.newAddress = {
          ...this.newAddress, // Giữ nguyên các giá trị không thay đổi
          ...this.insert_address_F.value, // Cập nhật các giá trị từ form vào DTO
        };

        // Thêm customer_ID vào newAddress
        this.newAddress.customer_ID = this.tokenService.getUser()?.id || '';

        // Gọi API để cập nhật thông tin người dùng
        this.addressService.createAddress(this.newAddress).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công!',
              detail: 'Thêm địa chỉ thành công!',
            });
            setTimeout(() => {
              this.resetComponent();
            }, 500);
          },
          error: (err) => {
            console.error('Error when updating user:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại!',
              detail: 'Thêm địa chỉ thất bại!',
            });
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async updateAdress(): Promise<void> {
    const result = await Swal.fire({
      title: 'Cập nhật địa chỉ?',
      text: 'Bạn có chắn chắn muốn cập nhật địa chỉ này?',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Chấp nhận',
    });

    if (result.isConfirmed && this.update_address_F.valid) {
      try {
        this.isLoading = true; // Bật chờ loading
        // Cập nhật registrationRequestDto từ giá trị của form
        this.selectedAddress = {
          ...this.selectedAddress, // Giữ nguyên các giá trị không thay đổi
          ...this.update_address_F.value, // Cập nhật các giá trị từ form vào DTO
        };

        // Thêm customer_ID vào newAddress
        this.selectedAddress.customer_ID = this.tokenService.getUser()?.id || '';

        // Gọi API để cập nhật thông tin người dùng
        this.addressService.updateAddress(this.selectedAddress).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công!',
              detail: 'Cập nhật địa chỉ thành công!',
            });
            setTimeout(() => {
              this.resetComponent();
            }, 500);
          },
          error: (err) => {
            console.error('Error when updating user:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại!',
              detail: 'Cập nhật địa chỉ thất bại!',
            });
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }


  resetComponent() {
    window.location.reload();
  }

  delete(address_id: number) {
    Swal.fire({
      title: 'Xóa địa chỉ?',
      text: 'Bạn có chắn chắn muốn xóa địa chỉ này?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Chấp nhận',
    }).then((result) => {
      if (result.isConfirmed) {
        this.addressService.deleteAddress(address_id).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công!',
              detail: 'Xóa địa chỉ thành công!',
            });
            setTimeout(() => {
              this.resetComponent();
            }, 500);
          },
          error: (err) => {
            console.error('Error when delete address:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại!',
              detail: 'Xóa địa chỉ thất bại!',
            });
          },
        });
      }
    });
  }
}

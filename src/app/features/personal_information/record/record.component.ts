import { Component } from '@angular/core';
import { SidebarPersonalInfoComponent } from '../../../shared/components/sidebar-personal-info/sidebar-personal-info.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { UserDto } from '../../../core/models/auth/user-dto.model';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenStorageService } from '../../../core/services/auth/token-storage.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { catchError, map, of } from 'rxjs';
import { MessageService } from 'primeng/api'; // Import MessageService
import { ToastModule } from 'primeng/toast';
// npm install sweetalert2
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CloudinaryService } from '../../../core/upload_images/upload_image';
import { ShareUserDtoService } from '../../../core/services/shared/data/share_userDto.service';


@Component({
  selector: 'app-record',
  standalone: true,
  imports: [SidebarPersonalInfoComponent, HeaderComponent, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css',
  providers: [MessageService],
})

export class RecordComponent {
  userDto: UserDto | null = null;
  today: string = '';
  avatarUrl: string | ArrayBuffer | null = null;
  isLoading: boolean = false;
  selectedFile: File | null = null;

  record_F: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    birthDate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private messageService: MessageService,
    private cloudinaryService: CloudinaryService,
    private shareUserDtoService: ShareUserDtoService
  ) { }

  ngOnInit() {
    // Lấy ngày hiện tại dưới dạng chuỗi 'YYYY-MM-DD'
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0]; // Chuỗi định dạng phù hợp với input[type="date"]

    this.userDto = this.tokenStorageService.getUser();

    this.avatarUrl = this.userDto!.avatarUrl;

    // Gán giá trị cho form dựa trên userDto
    if (this.userDto) {
      this.record_F.patchValue({
        name: this.userDto.name,
        email: this.userDto.email,
        phoneNumber: this.userDto.phoneNumber,
        birthDate: this.userDto.birthDate.toString().split('T')[0],
        gender: this.userDto.gender
      });
    }

    // Thêm Async Validator sau khi FormGroup đã được tạo
    // ! đảm bảo gần userDto không bị null và có thể truy cập thuộc tính, bỏ qua lỗi khi biên dịch
    this.record_F.controls['phoneNumber'].addAsyncValidators(
      checkDuplicate(this.authService, this.userDto!.id, 'phoneNumber', this.userDto!.phoneNumber)
    );

    this.record_F.controls['email'].addAsyncValidators(
      checkDuplicate(this.authService, this.userDto!.id, 'email', this.userDto!.email)
    );
  }

  async updateUser(): Promise<void> {
    const result = await Swal.fire({
      title: 'Cập nhật thông tin?',
      text: 'Bạn có chắn chắn muốn lưu thay đổi?',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Lưu thay đổi',
    });

    if (result.isConfirmed && this.record_F.valid) {
      try {
        this.isLoading = true; // Bắt đầu upload ảnh
        // Cập nhật registrationRequestDto từ giá trị của form
        this.userDto = {
          ...this.userDto, // Giữ nguyên các giá trị không thay đổi
          ...this.record_F.value, // Cập nhật các giá trị từ form vào DTO
        };

        // Lưu ảnh trước khi cập nhật thông tin
        if (this.selectedFile) {
          await this.saveAvatar(); // Chờ upload ảnh hoàn tất
        }

        // Gọi API để cập nhật thông tin người dùng
        this.authService.updateUser(this.userDto!).subscribe({
          next: (response) => {
            this.isLoading = false; // Kết thúc upload ảnh
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công!',
              detail: 'Cập nhật thông tin thành công!',
            });

            // Kiểm tra nếu email thay đổi thì yêu cầu đăng nhập lại
            if (response.result && response.result.user.email != this.tokenStorageService.getUser()!.email) {
              Swal.fire({
                title: 'Đăng xuất?',
                text: 'Bạn cần đăng nhập lại với email mới!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Đăng xuất',
                cancelButtonText: 'Hủy',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.logout();
                  this.router.navigate(['/sign-in']);
                } else {
                  this.logout();
                  this.router.navigate(['/']);
                }
              });
            } else {
              this.tokenStorageService.clearToken();
              this.tokenStorageService.saveUser(response.result!.user);
              this.tokenStorageService.saveToken(response.result!.token);
              this.userDto = this.tokenStorageService.getUser();
              this.avatarUrl = this.userDto!.avatarUrl;
              this.sendUserData(); // Gửi thông tin userDto qua service
            }
          },
          error: (err) => {
            console.error('Error when updating user:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại!',
              detail: 'Cập nhật thông tin thất bại!',
            });
          },
        });
      } catch (error) {
        console.error('Lỗi khi lưu ảnh hoặc cập nhật thông tin:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Thất bại!',
          detail: 'Có lỗi xảy ra khi lưu ảnh hoặc cập nhật thông tin!',
        });
      }
    }
  }


  logout(): void {
    this.tokenStorageService.clearToken();
    this.tokenStorageService.deleteUser();
  }

  async onFileSelected(event: Event): Promise<void> {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      // Kiểm tra định dạng file
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Thất bại!',
          detail: 'Chỉ chấp nhận file có định dạng JPEG hoặc PNG!',
        });
        return;
      }

      try {
        // Đọc file và gán URL để hiển thị trước
        this.avatarUrl = await this.readFileAsDataURL(file);

        // Ghi nhận file được chọn
        this.selectedFile = file;
      } catch (error) {
        console.error('Lỗi khi đọc file:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Thất bại!',
          detail: 'Lỗi đọc file!',
        });
      }
    }
  }

  private readFileAsDataURL(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result); // Trả về kết quả khi đọc xong
      reader.onerror = (error) => reject(error);   // Xử lý lỗi nếu có

      reader.readAsDataURL(file); // Bắt đầu đọc file
    });
  }

  saveAvatar(): Promise<void> {
    return new Promise((resolve, reject) => {
      const folder = 'user_avatar'; // Thư mục Cloudinary
      const publicId = `avatar_${this.userDto!.id}_${Date.now()}`; // Tên định danh duy nhất

      this.cloudinaryService
        .uploadImage(this.selectedFile!, folder, publicId)
        .then((result) => {
          // Cập nhật URL ảnh sau khi upload
          this.userDto!.avatarUrl = this.cloudinaryService.getOptimizedImageUrl(result.public_id, {
            width: 500,
            height: 500,
          });
          resolve(); // Báo hiệu hoàn tất
        })
        .catch((error) => {
          console.error('Lỗi khi lưu ảnh:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Thất bại!',
            detail: 'Lỗi xảy ra khi lưu ảnh!',
          });
          reject(error); // Báo hiệu lỗi
        });
    });
  }

  sendUserData(): void {
    // Cập nhật userDto vào service
    this.shareUserDtoService.setUser(this.userDto!);
  }
}

export function checkDuplicate(
  authService: AuthService,
  userId: string,
  field: string,
  originalValue: string // Thêm giá trị ban đầu
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null); // Nếu không có giá trị mới thì bỏ qua kiểm tra
    }

    if (control.value === originalValue) {
      return of(null); // Nếu giá trị không thay đổi, bỏ qua kiểm tra
    }

    // Gọi API kiểm tra giá trị trùng lặp
    return authService.checkDuplicateForUpdate(userId, field, control.value).pipe(
      map(isDuplicate => (isDuplicate ? { unique: true } : null)), // Nếu trùng, báo lỗi
      catchError(err => {
        console.error('Error when checking duplicate:', err); // Log lỗi rõ ràng hơn
        return of(null); // Nếu API lỗi, bỏ qua lỗi và không chặn form
      })
    );
  };
}



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

  record_F: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    birthDate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    // Lấy ngày hiện tại dưới dạng chuỗi 'YYYY-MM-DD'
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0]; // Chuỗi định dạng phù hợp với input[type="date"]

    this.userDto = this.tokenStorageService.getUser();
    console.log(this.userDto);

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
    this.record_F.controls['phoneNumber'].addAsyncValidators(
      checkDuplicate(this.authService, this.userDto!.id, 'phoneNumber', this.userDto!.phoneNumber)
    );

    this.record_F.controls['email'].addAsyncValidators(
      checkDuplicate(this.authService, this.userDto!.id, 'email', this.userDto!.email)
    );
  }

  updateUser(): void {
    if (this.record_F.valid) {
      // Cập nhật registrationRequestDto từ giá trị của form
      this.userDto = {
        ...this.userDto, // Giữ nguyên các giá trị không thay đổi
        ...this.record_F.value // Cập nhật các giá trị từ form vào DTO
      };

      this.authService.updateUser(this.userDto!).subscribe({
        next: response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công!',
            detail: 'Cập nhật thông tin thành công!'
          });
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Thất bại!',
            detail: 'Cập nhật thông tin thất bại!'
          });
        }
      });
    }
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



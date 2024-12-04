import { Component, OnInit } from '@angular/core';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProductService } from '../../../core/services/product.service';
import { ProductVariationService } from '../../../core/services/productVariation.service';
import { firstValueFrom } from 'rxjs';
import { ProductDto } from '../../../core/models/product.model';
import { ProductVariationDto } from '../../../core/models/productVariation.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { SizeService } from '../../../core/services/size.service';
import { ColorService } from '../../../core/services/color.service';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, ButtonModule, DialogModule, FormsModule, ToastModule, ConfirmDialogModule, DropdownModule, InputNumberModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {
  products: ProductDto[] = [];
  colors: any[] = [];
  sizes: any[] = [];
  visibleDialogProduct: boolean = false;
  visibleDialogVariation: boolean = false;
  dialogTitle: string = '';
  product: ProductDto = {};
  variation: ProductVariationDto = {};

  // process product images
  avatarUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  productForm: FormGroup;

  ngOnInit(): void {
    this.loadProducts();
    this.loadSizes();
    this.loadColors();
  }

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private productService: ProductService,
    private productVariationService: ProductVariationService,
    private sizeService: SizeService,
    private colorService: ColorService) {
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        cat_Id: [null, Validators.required],
        nat_Id: [null, Validators.required],
        bra_Id: [null, Validators.required],
        sup_Id: [null, Validators.required],
        status: [true]
      });
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

  showDialogProduct(action: string, product: ProductDto) {
    this.dialogTitle = action === 'Add' ? 'Thêm' : 'Chỉnh sửa';
    this.product = { ...product };
    if(action === 'Add') {this.product.id = undefined; this.product.status = true;}
    this.visibleDialogProduct = true;
  }

  showDialogVariation(action: string, variation: ProductVariationDto) {
    this.dialogTitle = action === 'Add' ? 'Thêm' : 'Chỉnh sửa';
    this.variation = { ...variation };
    console.log(this.variation);
    this.visibleDialogVariation = true;
  }

  deleteProduct(product: ProductDto) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa sản phẩm ' + product.name + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.id as number).subscribe({
          next: () => {
            this.products = this.products.filter((val) => val.id !== product.id);
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa sản phẩm', life: 3000 });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
          }
        });
      }
    });
  }

  deleteVariation(variation: ProductVariationDto) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc xóa biến thể ' + variation.id + ' không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productVariationService.deleteProductVariation(variation.id as number).subscribe({
          next: () => {
            this.product.productVariations = this.product.productVariations?.filter((val) => val.id !== variation.id);
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa biến thể', life: 3000 });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
          }
        });
      }
    });
  }

  async loadSizes(): Promise<void> {
    try {
      const data = await firstValueFrom(this.sizeService.getAllSizes());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.sizes = data.result;
      }
    } catch (error) {
      console.error('Error fetching sizes', error);
    }
  }

  async loadColors(): Promise<void> {
    try {
      const data = await firstValueFrom(this.colorService.getAllColors());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.colors = data.result;
      }
    } catch (error) {
      console.error('Error fetching colors', error);
    }
  }

  async loadProducts(): Promise<void> {
    try {
      const data = await firstValueFrom(this.productService.getAllProducts());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.products = data.result;
      }
    } catch (error) {
      console.error('Error fetching products', error);
    }
  }

  createNewProduct(): void {
    this.productService.createProduct(this.product).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Sản phẩm đã được tạo' });
        this.loadProducts(); // Reload products after creation
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
    this.visibleDialogProduct = false;
  }

  editProduct(): void {
    this.productService.updateProduct(this.product).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Sản phẩm đã được cập nhật' });
        this.loadProducts(); // Reload products after update
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
    this.visibleDialogProduct = false;
  }

  createNewVariation(): void {
    console.log(this.variation);
    this.productVariationService.createProductVariation(this.variation).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Biến thể đã được tạo' });
        this.loadProducts(); // Reload products after creation
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
    this.visibleDialogVariation = false;
  }

  editVariation(): void {
    this.productVariationService.updateProductVariation(this.variation).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Biến thể đã được cập nhật' });
        this.loadProducts(); // Reload products after update
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' });
      }
    });
    this.visibleDialogVariation = false;
  }

  
}
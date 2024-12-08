import { Component, OnInit } from '@angular/core';
import { AdminFooterComponent } from '../../../shared/components/admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { SupplierService } from '../../../core/services/supplier.service';
import { NationService } from '../../../core/services/nation.service';
import { BrandService } from '../../../core/services/brand.service';
import { CategoryService } from '../../../core/services/category.service';
import { CloudinaryService } from '../../../core/upload_images/upload_image';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [AdminFooterComponent, CommonModule, TableModule, TagModule, ButtonModule, DialogModule, FormsModule, ToastModule, ConfirmDialogModule, DropdownModule, InputNumberModule, ReactiveFormsModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {
  products: ProductDto[] = [];
  colors: any[] = [];
  sizes: any[] = [];
  categories: any[] = [];
  nations: any[] = [];
  brands: any[] = [];
  suppliers: any[] = [];
  visibleDialogProduct: boolean = false;
  visibleDialogVariation: boolean = false;
  dialogTitle: string = '';
  product: ProductDto = {};
  variation: ProductVariationDto = {};

  // process product images
  imgUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  productForm: FormGroup;
  variationForm: FormGroup;

  ngOnInit(): void {
    this.loadProducts();
    this.loadSizes();
    this.loadColors();
    this.loadCategories();
    this.loadNations();
    this.loadBrands();
    this.loadSuppliers();
  }

  constructor(
    private cloudService: CloudinaryService,
    private supplierService: SupplierService,
    private nationService: NationService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private productService: ProductService,
    private productVariationService: ProductVariationService,
    private sizeService: SizeService,
    private colorService: ColorService) {
      this.productForm = this.createProductForm();
      this.variationForm = this.createVariationForm();
    }

  private initializeForms(): void {
    this.productForm.reset();
    this.variationForm.reset();
  }

  private createProductForm(): FormGroup {
    return this.fb.group({
      id: [{ value: 0, disabled: true }],
      name: ['', Validators.required],
      cat_Id: [null, Validators.required],
      nat_Id: [null, Validators.required],
      bra_Id: [null, Validators.required],
      sup_Id: [null, Validators.required],
      status: [true]
    });
  }

  private createVariationForm(): FormGroup {
    return this.fb.group({
      id: [{ value: 0}],
      pro_Id: [{ value: 0, disabled: true }],
      col_Id: [null, Validators.required],
      siz_Id: [null, Validators.required],
      discount: [0, Validators.min(0)],
      price: [null, Validators.required],
      importPrice: [null, Validators.required],
      quantity: [{ value: 0, disabled: true }],
      status: [true],
      pic: [''], // Thêm trường pic
      desc: ['', Validators.required]
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
        this.imgUrl = await this.readFileAsDataURL(file);

        // Ghi nhận file được chọn
        this.selectedFile = file;
      } catch (error) {
        //console.error('Lỗi khi đọc file:', error);
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
    if (action === 'Add') {
      this.productForm.reset({ status: true }); // Reset và set trạng thái mặc định

    } else {
      this.productForm.patchValue(product); // Gán giá trị vào form
    }
    this.visibleDialogProduct = true;
  }

  showDialogVariation(action: string, variation: ProductVariationDto) {
    this.dialogTitle = (action === 'Add' ? 'Thêm' : 'Chỉnh sửa');
    if (action === 'Add') {
      this.createVariationForm(); // Reset form
      this.variationForm.get('pro_Id')?.patchValue(variation.pro_Id); // Gán giá trị pro_Id vào form
      this.variationForm.get('col_Id')?.patchValue(variation.col_Id); // Gán giá trị col_Id vào form
      this.variationForm.get('siz_Id')?.patchValue(variation.siz_Id); // Gán giá trị siz_Id vào form
      
      this.imgUrl = null;
    } else {
      this.variationForm.patchValue(variation); // Gán giá trị vào form
      this.imgUrl = variation.pic ?? null; // Hiển thị ảnh đã có
     
      console.log(this.variationForm.value);
    }
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

  async loadCategories(): Promise<void> {
    try {
      const data = await firstValueFrom(this.categoryService.getAllCategorys());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.categories = data.result;
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }

  async loadNations(): Promise<void> {
    try {
      const data = await firstValueFrom(this.nationService.getAllNations());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.nations = data.result;
      }
    } catch (error) {
      console.error('Error fetching nations', error);
    }
  }

  async loadBrands(): Promise<void> {
    try {
      // Sử dụng firstValueFrom để lấy dữ liệu từ observable
      const data = await firstValueFrom(this.brandService.getAllBrands());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.brands = data.result;
      }
    } catch (error) {
      console.error('Error fetching brands', error);
    }
  }

  async loadSuppliers(): Promise<void> {
    try {
      // Sử dụng firstValueFrom để lấy dữ liệu từ observable
      const data = await firstValueFrom(this.supplierService.getAllSuppliers());
      if (data.isSuccess && Array.isArray(data.result)) {
        this.suppliers = data.result;
      }
    } catch (error) {
      console.error('Error fetching suppliers', error);
    }
  }

  createNewProduct(): void {
    if(this.productForm.invalid) return;

    const productData = this.productForm.getRawValue();
    this.productService.createProduct(productData).subscribe({
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
    if(this.productForm.invalid) return;
    const productData = this.productForm.getRawValue();

    this.productService.updateProduct(productData).subscribe({
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

  async createNewVariation(): Promise<void> {
    if (this.variationForm.invalid) return;
    const variationData = this.variationForm.getRawValue(); // Lấy dữ liệu từ form

    await this.saveImage();
    variationData.pic = this.imgUrl as string; // Gán URL ảnh vào dữ liệu biến thể

    this.productVariationService.createProductVariation(variationData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Biến thể đã được tạo' });
        this.loadProducts(); // Reload products after creation
        this.visibleDialogVariation = false;
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' })
    }); 
    this.visibleDialogVariation = false;
  }

  async editVariation(): Promise<void> {
    if (this.variationForm.invalid) return;
    const variationData = this.variationForm.getRawValue(); // Lấy dữ liệu từ form

    if(this.selectedFile !== null) { 
      await this.saveImage();
      variationData.pic = this.imgUrl as string; // Gán URL ảnh vào dữ liệu biến thể
    }

    this.productVariationService.updateProductVariation(variationData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Biến thể đã được cập nhật' });
        this.loadProducts(); // Reload products after update
        this.visibleDialogVariation = false;
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xảy ra!' })
    });
    this.visibleDialogVariation = false;
  }

  saveImage(): Promise<void> {
    return new Promise((resolve, reject) => {
      const folder = 'user_avatar'; // Thư mục Cloudinary
      const publicId = `product_${this.variationForm.value.id}_${Date.now()}`; // Tên định danh duy nhất
      console.log(this.variationForm.value);

      this.cloudService
        .uploadImage(this.selectedFile!, folder, publicId)
        .then((result) => {
          // Cập nhật URL ảnh sau khi upload
          this.imgUrl = this.cloudService.getOptimizedImageUrl(result.public_id, {});
          this.selectedFile = null; // Reset file đã chọn
          resolve(); // Báo hiệu hoàn tất
        })
        .catch((error) => {
          //console.error('Lỗi khi lưu ảnh:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Thất bại!',
            detail: 'Lỗi xảy ra khi lưu ảnh!',
          });
          reject(error); // Báo hiệu lỗi
        });
    });
  }
}
import { ProductVariationDto } from "./productVariation.model";
import { BrandDto } from "./brand.model";
import { CategoryDto } from "./category.model";
import { NationDto } from "./nation.model";
import { SupplierDto } from "./supplier.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PlaceholderItem extends ProductDto {
  isPlaceholder: boolean;
}

export interface ProductDto {
  id?: number;
  cat_Id?: number;
  category?: CategoryDto;
  nat_Id?: number;
  nation?: NationDto;
  bra_Id?: number;
  brand?: BrandDto;
  sup_Id?: number;
  supplier?: SupplierDto;
  name?: string;
  status?: boolean;
  productVariations?: ProductVariationDto[];
}

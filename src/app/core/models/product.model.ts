import { ProductVariationDto } from "./productVariation.model";

export interface PlaceholderItem extends ProductDto {
  isPlaceholder: boolean;
}

export interface ProductDto {
  id?: number;
  cat_Id?: number;
  nat_Id?: number;
  bra_Id?: number;
  sup_Id?: number;
  name?: string;
  status?: boolean;
  productVariations?: ProductVariationDto[];
}

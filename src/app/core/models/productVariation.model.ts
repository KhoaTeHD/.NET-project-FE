import { ProductDto } from './product.model';
import { ColorDto } from './color.model';
import { SizeDto } from './size.model';

export interface ProductVariationDto {
  id?: number;
  pro_Id?: number;
  col_Id?: number;
  siz_Id?: number;
  price?: number;
  importPrice?: number;
  pic?: string;
  quantity?: number;
  desc?: string;
  discount?: number;
  status?: boolean;
  product?: ProductDto;
}

export interface ProductVariationDto_v2 extends ProductVariationDto {
  color?: ColorDto;
  size?: SizeDto;
}

import { ProductVariationDto } from './productVariation.model';

export interface CartDto {
  item_Id?: number;
  cus_Id?: string;
  price?: number;
  quantity?: number;
  productVariation?: ProductVariationDto;
}

export interface CartDtoExtendStatus extends CartDto {
  status?: boolean;
  totalPrice?: number;
}

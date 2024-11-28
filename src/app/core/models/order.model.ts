import { ProductVariationDto } from "./productVariation.model";

export interface OrderDto {
  order_ID?: number;
  customer_ID?: number;
  coupon_Code?: number;
  address?: string;
  datetime?: Date;
  discount_amount?: number;
  total?: number;
  orderStatus?: string;
  detailOrders?: DetailOrderDto[];
}

export interface DetailOrderDto {
  order_ID?: number;
  product_ID?: number;
  quantity?: number;
  unit_Price?: number;
  productVariation?: ProductVariationDto;
}

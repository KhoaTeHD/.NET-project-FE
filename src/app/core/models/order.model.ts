export interface OrderDto {
  order_Id?: number;
  customer_Id?: string;
  coupon_Code?: number;
  address?: string;
  datetime?: Date;
  discount_Amount?: number;
  total?: number;
  orderStatus?: string;
  DetailOrders?: DetailOrderDto[];
}

export interface DetailOrderDto {
  order_Id?: number;
  product_Id?: number;
  quantity?: number;
  unit_Price?: number;
}

export interface CouponDto {
  coupon_Code?: number;
  start_Date?: Date;
  expiration_Date?: Date;
  coupon_Name?: string;
  discount?: number;
  unit?: string;
  status?: boolean;
}

export interface CouponDto {
  coupon_Code?: number;
  startDate?: Date;
  expirationDate?: Date;
  couponName?: string;
  discount?: number;
  unit?: string;
  status?: boolean;
}

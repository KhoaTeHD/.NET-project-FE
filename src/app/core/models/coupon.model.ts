export interface CouponDto {
  coupon_Code?: string;
  startDate?: Date;
  expirationDate?: Date;
  couponName?: string;
  discount?: number;
  unit?: string;
  status?: boolean;
}

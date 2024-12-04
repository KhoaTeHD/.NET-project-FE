import { ProductVariationDto } from "./productVariation.model";
import { SupplierDto } from "./supplier.model";

export interface GoodsReceiptDto {
  goo_ID?: number;
  supplier_ID?: number;
  datetime?: Date;
  total?: number;
  detailGoodsReceipts?: DetailGoodsReceiptDto[];
  supplier?: SupplierDto;
}

export interface DetailGoodsReceiptDto {
  goo_ID?: number;
  product_ID?: number;
  quantity?: number;
  unit_Price?: number;
  productVariation?: ProductVariationDto;
}

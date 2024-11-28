export interface GoodsReceiptDto {
  goo_ID?: number;
  supplier_ID?: number;
  datetime?: Date;
  total?: number;
  detailGoodsReceipts?: DetailGoodsReceiptDto[];
}

export interface DetailGoodsReceiptDto {
  goo_ID?: number;
  product_ID?: number;
  quantity?: number;
  unit_Price?: number;
}

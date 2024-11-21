export interface GoodsReceiptDto {
  goo_Id?: number;
  supplier_Id?: number;
  datetime?: Date;
  total?: number;
  detailGoodsReceipts?: DetailGoodsReceiptDto[];
}

export interface DetailGoodsReceiptDto {
  goo_Id?: number;
  product_Id?: number;
  quantity?: number;
  unit_Price?: number;
}

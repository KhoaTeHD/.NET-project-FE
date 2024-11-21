export interface PlaceholderItem extends ProductDto {
  isPlaceholder: boolean;
}

export interface ItemVariationDto {
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
}

export interface ProductDto {
  id?: number;
  cat_Id?: number;
  nat_Id?: number;
  bra_Id?: number;
  sup_Id?: number;
  name?: string;
  status?: boolean;
  productVariations?: ItemVariationDto[];
}

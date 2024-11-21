export interface PlaceholderItem extends Item_v2 {
  isPlaceholder: boolean;
}

export interface ItemVariation {
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

export interface Item_v2 {
  id?: number;
  cat_Id?: number;
  nat_Id?: number;
  bra_Id?: number;
  sup_Id?: number;
  name?: string;
  status?: boolean;
  productVariations?: ItemVariation[];
}

export interface Item {
  id: number;
  name: string;
  price: number;
  pricesale: number;
  type: string;
  des: string;
  origin: string;
  quantity: number;
  size: Array<{ id: number; value: string }>;
  color: Array<{ id: number; value: string }>;
  image: Array<{ id: number; value: string }>;
  brand: string;
}

export interface PlaceholderItem extends Item {
  isPlaceholder: boolean;
}

export interface ItemVariation {
  id: number;
  pro_Id: number;
  col_Id: number;
  siz_Id: number;
  price: number;
  importPrice: number;
  pic: string;
  quantity: number;
  desc: string;
  discount: number;
  status: boolean;
}

export interface Item_v2 {
  id: number;
  cat_Id: number;
  nat_Id: number;
  bra_Id: number;
  sup_Id: number;
  name: string;
  status: boolean;
  productVariations: ItemVariation[];
}

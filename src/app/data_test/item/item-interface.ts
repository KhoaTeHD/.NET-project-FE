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

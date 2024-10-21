import { Item } from "../item/item-interface";

export interface Cart {
  cus_id: number;
  items?: Array<{ item: Item, price: number, quantity: number}> | null; 
  item_quantity: number;
  total_price: number;
}

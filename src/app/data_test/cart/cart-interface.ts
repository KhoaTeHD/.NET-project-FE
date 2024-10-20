export interface Cart {
  cus_id: number;
  items?: Array<{ id: number, price: number, quantity: number}> | null; 
  item_quantity: number;
  total_price: number;
}

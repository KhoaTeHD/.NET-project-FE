import { Cart_v2 } from './cart-interface';

const dataCartAPI = {
  result: [
    {
      item_Id: 1,
      cus_Id: 1,
      price: 20000,
      quantity: 2,
    },
    {
      item_Id: 2,
      cus_Id: 1,
      price: 90000,
      quantity: 20,
    },
  ],
  isSuccess: true,
  message: null,
};

export const CARTS: Cart_v2[] = dataCartAPI.result;

import { Brand } from './brand-interface';

const dataBrandAPI = {
  result: [
    {
      id: 1,
      name: 'Hades',
      status: true,
    },
    {
      id: 2,
      name: 'Dirty Coins',
      status: true,
    },
    {
      id: 3,
      name: 'Gucchi',
      status: true,
    },
    {
      id: 4,
      name: 'Dior',
      status: true,
    },
  ],
  isSuccess: true,
  message: null,
};

export const BRANDS: Brand[] = dataBrandAPI.result;

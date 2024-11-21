import { Nation } from './nation-interface';

const dataNationAPI = {
  result: [
    {
      id: 1,
      name: 'Việt Nam',
      status: true,
    },
    {
      id: 2,
      name: 'Trung Quốc',
      status: true,
    },
  ],
  isSuccess: true,
  message: null,
};

export const NATIONS: Nation[] = dataNationAPI.result;

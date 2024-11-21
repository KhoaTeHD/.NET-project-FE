import { Color } from './color-interface';

const dataColorAPI = {
  result: [
    {
      id: 1,
      name: 'Trắng',
      status: true,
    },
    {
      id: 2,
      name: 'Đen',
      status: true,
    },
    {
      id: 3,
      name: 'Nâu',
      status: true,
    },
    {
      id: 4,
      name: 'Đỏ',
      status: true,
    },
    {
      id: 5,
      name: 'Xanh rêu',
      status: true,
    },
    {
      id: 6,
      name: 'Xanh lam',
      status: true,
    },
    {
      id: 7,
      name: 'Xanh dương',
      status: true,
    },
  ],
  isSuccess: true,
  message: null,
};

export const COLORS: Color[] = dataColorAPI.result;

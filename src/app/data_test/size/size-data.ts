import { Size } from './size-interface';

const dataSizeAPI = {
  result: [
    {
      id: 1,
      name: 'S',
      desc: 'Size S, đây là size nhỏ nhất. S nghĩa là Small.',
      status: true,
    },
    {
      id: 2,
      name: 'M',
      desc: 'Size M, đây là size trung bình. M nghĩa là Medium.',
      status: true,
    },
    {
      id: 3,
      name: 'L',
      desc: 'Size L. L nghĩa là Large.',
      status: true,
    },
    {
      id: 4,
      name: 'XL',
      desc: 'Size XL, đây là size to bự. XL nghĩa là Extra Large.',
      status: true,
    },
  ],
  isSuccess: true,
  message: null,
};

export const SIZES: Size[] = dataSizeAPI.result;

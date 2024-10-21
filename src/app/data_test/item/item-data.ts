import { Item } from './item-interface';

const images = [
  'demo-img (1).jpg', 'demo-img (2).jpg', 'demo-img (3).jpg',
  'demo-img (4).jpg', 'demo-img (5).jpg', 'demo-img (6).jpg',
  'demo-img (7).jpg', 'demo-img (8).jpg', 'demo-img (9).jpg',
  'demo-img (10).jpg', 'demo-img (11).jpg', 'demo-img (12).jpg',
  'demo-img (13).jpg', 'demo-img (14).jpg', 'demo-img (15).jpg',
  'demo-img (16).jpg', 'demo-img (17).jpg', 'demo-img (18).jpg',
  'demo-img (19).jpg', 'demo-img (20).jpg', 'demo-img (21).jpg',
];
  
const getRandomImages = (imageArray: string[], count: number): Array<{ id: number; value: string }> => {
  const shuffled = imageArray.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((value, index) => ({ id: index + 1, value }));
};

export const ITEMS: Item[] = [
  {
    id: 1,
    name: 'T-Shirt Basic',
    price: 25,
    pricesale: 20,
    type: 'Clothing',
    des: 'A basic t-shirt made from 100% cotton.',
    origin: 'Vietnam',
    quantity: 50,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'Black' },
      { id: 2, value: 'White' },
      { id: 3, value: 'Gray' }
    ],
    brand: 'LUONVUITUOI',
    image: getRandomImages(images, 5),
  },
  {
    id: 2,
    name: 'Sneakers Sport',
    price: 70,
    pricesale: 60,
    type: 'Footwear',
    des: 'Comfortable sneakers for everyday use.',
    origin: 'China',
    quantity: 30,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'Red' },
      { id: 2, value: 'Blue' },
      { id: 3, value: 'Green' }
    ],
    brand: 'LUONVUITUOI',
    image: getRandomImages(images, 5),
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 45,
    pricesale: 40,
    type: 'Bags',
    des: 'A stylish backpack for your laptop.',
    origin: 'Vietnam',
    quantity: 25,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'Black' },
      { id: 2, value: 'Navy' }
    ],
    brand: 'LUONVUITUOI',
    image: getRandomImages(images, 5),
  },
  {
    id: 4,
    name: 'Wireless Headphones',
    price: 120,
    pricesale: 100,
    type: 'Electronics',
    des: 'Noise-cancelling wireless headphones.',
    origin: 'USA',
    quantity: 15,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'Black' },
      { id: 2, value: 'White' }
    ],
    brand: 'LUONVUITUOI',
    image: getRandomImages(images, 5),
  },
  {
    id: 5,
    name: 'Wool Sweater',
    price: 50,
    pricesale: 45,
    type: 'Clothing',
    des: 'A warm wool sweater for cold days.',
    origin: 'Iceland',
    quantity: 20,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'Beige' },
      { id: 2, value: 'Brown' }
    ],
    brand: 'GUCCHI',
    image: getRandomImages(images, 5),
  },
  {
    id: 6,
    name: 'Smartwatch',
    price: 250,
    pricesale: 230,
    type: 'Electronics',
    des: 'A smartwatch with various fitness features.',
    origin: 'USA',
    quantity: 10,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'Black' },
      { id: 2, value: 'Silver' }
    ],
    brand: 'GUCCHI',
    image: getRandomImages(images, 5),
  },
  {
    id: 7,
    name: 'Formal Shoes',
    price: 90,
    pricesale: 80,
    type: 'Footwear',
    des: 'Elegant formal shoes for special occasions.',
    origin: 'Italy',
    quantity: 12,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'Black' },
      { id: 2, value: 'Brown' }
    ],
    brand: 'GUCCHI',
    image: getRandomImages(images, 5),
  },
  {
    id: 8,
    name: 'Graphic T-Shirt',
    price: 30,
    pricesale: 25,
    type: 'Clothing',
    des: 'A stylish graphic t-shirt.',
    origin: 'Vietnam',
    quantity: 40,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'White' },
      { id: 2, value: 'Black' }
    ],
    brand: 'VESPA',
    image: getRandomImages(images, 5),
  },
  {
    id: 9,
    name: 'Sports Watch',
    price: 70,
    pricesale: 60,
    type: 'Electronics',
    des: 'Durable watch for sports activities.',
    origin: 'Japan',
    quantity: 18,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'Black' },
      { id: 2, value: 'Orange' }
    ],
    brand: 'VESPA',
    image: getRandomImages(images, 5),
  },
  {
    id: 10,
    name: 'Leather Jacket',
    price: 150,
    pricesale: 140,
    type: 'Clothing',
    des: 'Stylish leather jacket for men.',
    origin: 'USA',
    quantity: 8,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'Black' },
      { id: 2, value: 'Brown' }
    ],
    brand: 'VESPA',
    image: getRandomImages(images, 5),
  },
  {
    id: 11,
    name: 'Leather Jacket GH35',
    price: 1000000,
    pricesale: 900000,
    type: 'Clothing',
    des: 'Stylish leather jacket for men.',
    origin: 'USA',
    quantity: 8,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'orange' },
      { id: 2, value: 'pink' }
    ],
    brand: 'DIOR',
    image: getRandomImages(images, 5),
  },
  {
    id: 12,
    name: 'Leather Jacket KC43',
    price: 100000,
    pricesale: 400000,
    type: 'Clothing',
    des: 'Stylish leather jacket for men.',
    origin: 'USA',
    quantity: 8,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'green' },
      { id: 2, value: 'gray' }
    ],
    brand: 'VERSACE',
    image: getRandomImages(images, 5),
  },
  {
    id: 13,
    name: 'Leather Jacket KC4366 ther Jacket KC4366 Leather Jacket KC4366 Leather Jacket KC4366',
    price: 100000,
    pricesale: 40000,
    type: 'Clothing',
    des: 'Stylish leather jacket for men.',
    origin: 'USA',
    quantity: 8,
    size: [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' },
      { id: 3, value: 'L' },
      { id: 4, value: 'XL' },
      { id: 5, value: 'Over Size' }
    ],
    color: [
      { id: 1, value: 'green' },
      { id: 2, value: 'gray' }
    ],
    brand: 'MICHAEL KORS',
    image: getRandomImages(images, 5),
  },
];

import { IProduct, getDiscountedProduct } from '@/services';

export const product1: IProduct = getDiscountedProduct({
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 10,
  actualPrice: 10,
  discountPercentage: 10,
  rating: 4.69,
  stock: 94,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: '...',
  images: ['...', '...', '...'],
});

export const product2: IProduct = getDiscountedProduct({
  id: 2,
  title: 'notIPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 20,
  discountPercentage: 20,
  rating: 4.69,
  stock: 35,
  actualPrice: 20,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: '...',
  images: ['...', '...', '...'],
});


export const product3: IProduct = getDiscountedProduct({
  id: 3,
  title: 'alsoNotIPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 30,
  discountPercentage: 30,
  actualPrice: 30,
  rating: 4.69,
  stock: 20,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: '...',
  images: ['...', '...', '...'],
});

export const mock: IProduct[] = [product1, product2, product3];
import { IProduct } from './model';

export function applyDiscount(value: number, discountPercentage: number) {
  return value * (1 - discountPercentage / 100);
}

export function fixPrice(product: IProduct) {
  return applyDiscount(product.price, product.discountPercentage);
}
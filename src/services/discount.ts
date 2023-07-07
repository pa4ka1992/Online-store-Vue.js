import { IProduct } from './model';

export function applyDiscount(value: number, discountPercentage: number) {
  return value * (1 - discountPercentage / 100);
}

export function fixPrice(product: IProduct) {
  return applyDiscount(product.actualPrice, product.discountPercentage);
}

export function getDiscountedProduct(product: IProduct): IProduct {
  product.actualPrice = product.price;
  return {
    ...product,
    price: fixPrice(product) 
  }
}
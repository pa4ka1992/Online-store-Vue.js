import { Product } from "./product";

export interface Cart {
  get totalPrice(): number;
  get products(): Product[];
  addProduct(product: Product): void;
  removeProduct(product: Product): void;
  applyDiscountCode(code: string): boolean;
}
import { Product } from "./product";

export interface Cart {
  get totalPrice(): number;
  get products(): Product[];
  get productsCount(): number;
}
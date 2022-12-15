import { Product } from "./product";
import { Observable } from "@/common/observable";

export interface Cart {
  get totalPrice(): Observable<number>;
  get products(): Observable<Product[]>;
  addProduct(product: Product): void;
  removeProduct(product: Product): void;
  applyDiscountCode(code: string): boolean;
}
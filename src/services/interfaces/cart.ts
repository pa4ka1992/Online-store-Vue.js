import { IProduct } from "./product";
import { Observable } from "@/common/observable";

export interface ICart {
  get totalPrice(): Observable<number>;
  get products(): Observable<IProduct[]>;
  addProduct(product: IProduct): void;
  removeProduct(product: IProduct): void;
  applyDiscountCode(code: string): boolean;
}
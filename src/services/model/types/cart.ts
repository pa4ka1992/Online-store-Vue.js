
import { IProduct } from "../product";

export interface ICartProduct extends IProduct {
  count: number;
  get countPrice(): number;
  get fixPrice(): number;
}

export type TProductFunc = (product: ICartProduct) => void;
export type TFindFunc = (product: ICartProduct) => ICartProduct | undefined;
export type TCurrProd = ReturnType<TFindFunc>;

export type TPromo = {
  value: number
  name: string
  promo: string
}

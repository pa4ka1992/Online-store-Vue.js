import { IProduct } from "@/services/model/product";

export interface ICartProduct extends IProduct {
  count: number;
  get countPrice(): number;
  get fixPrice(): number;
}

export type TFindFunc<T> = (id: string) => T | undefined;
export type TProductFunc = (product: ICartProduct) => void;
export type TCurrProd = ReturnType<TFindFunc<ICartProduct>>;

export type TPromo = {
  id: number
  value: number
  name: string
  title: string
}

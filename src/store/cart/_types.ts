import { IProduct, fixPrice } from '@/services';

export interface ICartItem {
  product: IProduct;
  count: number;
  get countPrice(): number;
  get fixPrice(): number;
}

export type TFindFunc<T> = (id: number) => T | undefined;
export type TProductFunc = (product: IProduct['id']) => void;
export type TCurrProd = ReturnType<TFindFunc<ICartItem>>;

export type TPromo = {
  id: number;
  value: number; 
  name: string;
  title: string;
};

export class CartItem implements ICartItem {
  constructor(public product: IProduct, public count: number) {}

  get countPrice() {
    return this.count * this.product.actualPrice;
  }

  get fixPrice() {
    return this.count * fixPrice(this.product);
  }
}

import { IProduct } from '@/services';

export interface ICartItem {
  product: IProduct;
  count: number;
  get countPrice(): number;
}

export type TFindFunc<T> = (id: IProduct['id']) => T | undefined;
export type TProductFunc = (product: ICartItem) => void;
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
    return this.count * this.product.price;
  }
}

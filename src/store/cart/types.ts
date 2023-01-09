import { IProduct } from '@/services/model/product';

export interface ICartProduct extends IProduct {
  count: number;
  get countPrice(): number;
  get fixPrice(): number;
}

export type TFindFunc<T> = (id: IProduct['id']) => T | undefined;
export type TProductFunc = (product: ICartProduct) => void;
export type TCurrProd = ReturnType<TFindFunc<ICartProduct>>;

export type TPromo = {
  id: number;
  value: number;
  name: string;
  title: string;
};

export class CartProduct implements ICartProduct {
  id: number;
  title: string;
  category: string;
  brand: string;
  discountPercentage: number;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  images: string[];
  stock: number;
  count: number;
  actualPrice: number;

  constructor(incomeProduct: IProduct, incomeCount: number) {
    const { id, title, category, brand, discountPercentage, description, price, thumbnail, rating, images, stock } =
      incomeProduct;
    this.title = title;
    this.id = id;
    this.category = category;
    this.brand = brand;
    this.discountPercentage = discountPercentage;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.rating = rating;
    this.images = images;
    this.stock = stock;
    this.actualPrice = price;
    this.count = incomeCount;
  }

  get countPrice() {
    return this.count * this.price;
  }

  get fixPrice() {
    return this.countPrice * (1 - this.discountPercentage / 100);
  }
}

export interface IProduct {
  id: string;
  title: string;
  category: string;
  brand: string;
  discountPercentage: number;
  description: string;
  price: number; // Probably can be changed in future
  thumbnail: string;
  rating: number;
  images: string[];
  stock: number;
}

export interface ICartProduct extends IProduct {
  count: number;
  get countPrice(): number;
}

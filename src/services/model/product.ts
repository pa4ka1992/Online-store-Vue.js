export interface IProduct {
  id: number;
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
  actualPrice: number;
}

export const mockProduct: IProduct = {
  id: 0,
  title: '',
  category: '',
  brand: '',
  discountPercentage: 20,
  description: '',
  price: 100,
  thumbnail: '',
  rating: 5,
  images: [''],
  stock: 32,
  actualPrice: 23,
};

export function getMockValueByKey(key: keyof IProduct) {
  return mockProduct[key];
}

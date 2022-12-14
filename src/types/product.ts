export interface Product {
  title: string;
  category: string;
  brand: string;
  discountPercentage: string;
  description: string;
  price: number; // Probably can be changed in future
  thumbnail: string;
  images: string[];
  stock: number;
}

import { Product } from './product';

export type Filter = (product: Product) => boolean;
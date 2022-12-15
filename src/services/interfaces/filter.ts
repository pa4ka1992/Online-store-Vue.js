import { IProduct } from './product';

export type Filter = (product: IProduct) => boolean;
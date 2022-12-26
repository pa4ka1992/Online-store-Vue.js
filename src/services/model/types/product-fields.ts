import { IProduct } from '../product';
import { TProductKeys } from './product-keys';

export type TNumberFields = {
  [Key in TProductKeys as IProduct[Key] extends number ? Key : never]: number;
};

export type TStringFields = {
  [Key in TProductKeys as IProduct[Key] extends string ? Key : never]: string;
}; 

import { Product } from './product';

// Pass to generic option you want to filter by 

export type FilterOptions<Key extends keyof Product> = {
  filterValue: Product[Key];

  // Only options for strings
  seekValue: Product[Key] extends string ? string : undefined;

  // Only options for numbers
  upperValue: Product[Key] extends number ? number : undefined;
  lowerValue: Product[Key] extends number ? number : undefined;
}

export interface FilterItem {
  <Key extends keyof Product>(item: Product, options: FilterOptions<Key>): boolean;
}
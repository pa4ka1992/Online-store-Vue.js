import { TProductKeys } from './product-keys';
import { IProduct } from '../product';

export type TValuesCount = { count: number; total: number };

export type TValuesCountMap<Key extends TProductKeys> = Map<IProduct[Key], TValuesCount>;
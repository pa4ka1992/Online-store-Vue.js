import { TProductKeys } from './product-keys';
import { IProduct } from '../product';

export type TValuesCount<Key extends TProductKeys> = Map<IProduct[Key], { count: number, total: number }>;
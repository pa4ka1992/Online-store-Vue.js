import { SortType } from '@/services';
import { isString } from './string-guard';

export function isSortType(value: unknown): value is SortType {
  return isString(value) && (Object.values(SortType) as string[]).includes(value);
}

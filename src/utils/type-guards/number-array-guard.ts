import { isNumber } from './number-guard';

export function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.reduce((acc, value) => acc && isNumber(Number(value)), true);
}

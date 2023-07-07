import { isString } from './string-guard';

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.reduce((acc, value) => acc && isString(value), true);
}

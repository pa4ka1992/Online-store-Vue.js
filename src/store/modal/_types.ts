export interface IValidation<T> {
  fullName: T
  phone: T
  adress: T
  email: T
  card: T
  date: T
  CVV: T
}

export type TValidationField = {
  val: string;
  isValid: boolean;
  isAlert: boolean;
  readonly regex: RegExp;
  readonly placeholder: string;
  readonly header: string;
  readonly alert: string;
  modify: (this: TValidationField) => void;
  maxLength?: string;
};

export type TModifyFunc = (this: TValidationField) => void
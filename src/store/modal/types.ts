export interface IValidation<T> {
  fullName: T
  phone: T
  adress: T
  email: T
  card: T
  date: T
  CVV: T
}

export type TValidationField = Required<{
  readonly val: string
  isValid: boolean
  isAlert: boolean
  readonly regex: string
  readonly type: string
  readonly placeholder: string
  readonly header: string
  readonly alert: string
}>
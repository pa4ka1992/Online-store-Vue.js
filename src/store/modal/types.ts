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
  val: string
  isValid: boolean
  isAlert: boolean
  regex: string
  type: string
  placeholder: string
  header: string
  alert: string
}>
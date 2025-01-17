import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'

export interface Subscription {
  id?: undefined | string
  firstName: string
  lastName: string
  emailAddress: string
  country: string
  honeypot?: string
}

export interface FormProps {
  label: string
  required: boolean
  register: UseFormRegisterReturn<string>
  error: FieldError | undefined
}

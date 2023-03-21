import {FieldError, UseFormRegisterReturn} from "react-hook-form";

export interface Subscription {
    firstName: string
    lastName: string
    emailAddress: string
    country: string
}

export interface FormProps {
    label: string
    required?: boolean
    register: UseFormRegisterReturn<string>
    error: FieldError | undefined
}
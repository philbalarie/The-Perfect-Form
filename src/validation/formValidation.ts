import * as yup from 'yup'
import { kebabCase } from 'lodash'
import { COUNTRY_OPTIONS_DISPLAY } from '../App'
import { type AnyObject, type TestContext, type ValidationError } from 'yup'

// TODO: Refactor, since COUNTRY_OPTIONS_VALUE are define here and in the select component
const COUNTRY_OPTIONS_VALUE = COUNTRY_OPTIONS_DISPLAY.map((cod) => kebabCase(cod))

/**
 * Used to validate the honeypot
 * @param value
 * @param context
 */
const isUndefined = (
  value: string | undefined,
  context: TestContext<AnyObject>,
): ValidationError | true =>
  value !== '' ? context.createError({ message: 'Error while validating the form' }) : true

// TODO Add personalized message
// TODO: Send required prop of Input & Select dynamically with yup, instead of being hardcoded
export const formSchema = yup.object({
  firstName: yup.string().min(3).max(30).required(),
  lastName: yup.string().min(3).max(30).required(),
  emailAddress: yup.string().email().required(),
  country: yup.string().oneOf(COUNTRY_OPTIONS_VALUE).required(),
  honeypot: yup.string().test('isUndefined', 'Error while validating the form', isUndefined),
})

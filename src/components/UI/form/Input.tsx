import React from 'react'
import { capitalize } from 'lodash'
import { type FormProps } from '../../../types/types'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { v4 as uuidv4 } from 'uuid'
interface InputProps extends FormProps {
  type: string
}

const Input: React.FC<InputProps> = (props) => {
  // Adapt color of the input depending on the error
  const color = props.error === undefined ? 'gray' : 'red'
  const errorMessageId = uuidv4()

  return (
    <div>
      <label
        htmlFor={props.register.name}
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        {capitalize(props.label)} {props.required && <span className='text-red-500'>*</span>}
      </label>
      <div className='relative mt-2 rounded-md shadow-sm'>
        <input
          type={props.type}
          id={props.register.name}
          className={`block w-full pl-2 rounded-md border-0 py-1.5 pr-10 text-${color}-900 ring-1 ring-inset ring-${color}-300 placeholder:text-${color}-300 focus:ring-2 focus:ring-inset focus:ring-${color}-500 sm:text-sm sm:leading-6`}
          required={props.required}
          aria-invalid={!!props.error}
          aria-describedby={errorMessageId}
          {...props.register}
        />
        {props.error != null && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
          </div>
        )}
      </div>
      {props.error && (
        <p className='mt-2 text-sm text-red-600' id={errorMessageId}>
          {props.error.message}
        </p>
      )}
    </div>
  )
}

export default Input

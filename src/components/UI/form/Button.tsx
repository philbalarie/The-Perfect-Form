import React from 'react'
import LoadingIcon from '../LoadingIcon'
import { EnvelopeIcon } from '@heroicons/react/20/solid'

interface ButtonProps {
  loading: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
  const opacity = props.loading ? '300' : '600'
  const hoverOpacity = props.loading ? '200' : '500'

  return (
    <button
      disabled={props.loading}
      type='submit'
      className={`inline-flex items-center gap-x-1.5 rounded-md bg-indigo-${opacity} py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-${hoverOpacity} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-${opacity}`}
    >
      {props.loading ? <LoadingIcon /> : <EnvelopeIcon className='-ml-0.5 h-5 w-5' />}
      Subscribe
    </button>
  )
}

export default Button

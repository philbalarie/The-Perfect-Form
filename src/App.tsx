import React, { useState } from 'react'
import Input from './components/UI/form/Input'
import { EMAIL, TEXT } from './constants/formTypes'
import Select from './components/UI/form/Select'
import { useForm } from 'react-hook-form'
import SubscriptionService from './services/subscription.service'
import { v4 as uuidv4 } from 'uuid'
import { type Subscription } from './types/types'
import Toast from './components/UI/form/Toast'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import { kebabCase } from 'lodash'
import LoadingIcon from './components/UI/LoadingIcon'
import { EnvelopeIcon } from '@heroicons/react/20/solid'

const App: React.FC = () => {
  // TODO: Refactor, since COUNTRY_OPTIONS_VALUE are define here and in the select component
  const COUNTRY_OPTIONS_DISPLAY = ['Canada', 'Mexico', 'India']
  const COUNTRY_OPTIONS_VALUE = COUNTRY_OPTIONS_DISPLAY.map((cod) => kebabCase(cod))

  // TODO Add personalized message
  // TODO: Send required prop of Input & Select dynamically with yup, instead of being hardcoded
  const schema = yup.object({
    firstName: yup.string().min(3).max(30).required(),
    lastName: yup.string().min(3).max(30).required(),
    emailAddress: yup.string().email().required(),
    country: yup.string().oneOf(COUNTRY_OPTIONS_VALUE).required(),
    honeypot: yup
      .string()
      .test('isUndefined', 'Error while validating the form', (value, context) =>
        value !== '' ? context.createError({ message: 'Error while validating the form' }) : true,
      ),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Subscription>({ resolver: yupResolver(schema) })

  const [loading, setLoading] = useState<boolean>(false)

  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const onSubmit = (data: Subscription): void => {
    setLoading(true)
    const { firstName, lastName, country, emailAddress } = data

    SubscriptionService.save({
      id: uuidv4(),
      firstName,
      lastName,
      country,
      emailAddress,
    })
      .then((_) => {
        reset()
        setLoading(false)
        setShowToast(true)
        setToastMessage('Subscription successful!')
        setToastType('success')
      })
      .catch((err) => {
        setLoading(false)
        setShowToast(true)
        setToastMessage(err.message)
        setToastType('error')
      })
  }

  return (
    <div className='flex justify-center my-10 bg bg-white'>
      <Toast type={toastType} show={showToast} message={toastMessage} setShowToast={setShowToast} />
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className='space-y-8 divide-y divide-gray-200' onSubmit={handleSubmit(onSubmit)}>
        <p>{errors.honeypot?.message}</p>
        <input className='hidden' tabIndex={-1} autoComplete='off' {...register('honeypot')} />
        <div className='space-y-8 divide-y divide-gray-200'>
          <div className='pt-8'>
            <div>
              <h3 className='text-base font-semibold leading-6 text-gray-900'>
                Personal Information
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Enter your infos to subscribe to the newsletter
              </p>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className={'sm:col-span-3'}>
                <Input
                  type={TEXT}
                  label={'First name'}
                  register={register('firstName')}
                  error={errors.firstName}
                  required={true}
                />
              </div>

              <div className='sm:col-span-3'>
                <Input
                  type={TEXT}
                  label={'Last name'}
                  register={register('lastName')}
                  error={errors.lastName}
                  required={true}
                />
              </div>

              <div className='sm:col-span-4'>
                <Input
                  type={EMAIL}
                  label={'Email address'}
                  register={register('emailAddress')}
                  error={errors.emailAddress}
                  required={true}
                />
              </div>

              <div className='sm:col-span-3'>
                <Select
                  label={'Country'}
                  options={COUNTRY_OPTIONS_DISPLAY}
                  register={register('country')}
                  error={errors.country}
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>
        {/* TODO: Change opacity when disabled */}
        <div className='pt-5'>
          <div className='flex justify-end'>
            <button
              disabled={loading}
              type='submit'
              className={`inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              {loading ? (
                <LoadingIcon />
              ) : (
                <EnvelopeIcon className='-ml-0.5 h-5 w-5' aria-hidden='true' />
              )}
              Subscribe
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default App

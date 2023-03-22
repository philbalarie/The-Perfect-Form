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
import Button from './components/UI/form/Button'
import { formSchema } from './validation/formValidation'

export const COUNTRY_OPTIONS_DISPLAY = ['Canada', 'Mexico', 'India']

type ToastType = 'success' | 'error'

const App: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Subscription>({ resolver: yupResolver(formSchema) })

  const [loading, setLoading] = useState<boolean>(false)

  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')
  const [toastType, setToastType] = useState<ToastType>('success')

  const setAfterPost = (toastType: ToastType) => (toastMessage: string) => {
    setLoading(false)
    setShowToast(true)
    setToastMessage(toastMessage)
    setToastType(toastType)
  }

  const setSuccess = setAfterPost('success')
  const setError = setAfterPost('error')

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
        setSuccess('Subscription successful!')
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div className='flex justify-center my-10 bg bg-white'>
      <Toast type={toastType} show={showToast} message={toastMessage} setShowToast={setShowToast} />
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className='space-y-8 divide-y divide-gray-200' onSubmit={handleSubmit(onSubmit)}>
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
              {/* Use required from schema instead of hardcoded */}
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
        <div className='pt-5'>
          <div className='flex justify-end'>
            <Button loading={loading} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default App

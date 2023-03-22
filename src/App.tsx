import React, { useState } from 'react'
import Input from './components/UI/form/Input'
import { EMAIL, TEXT } from './constants/formTypes'
import Select from './components/UI/form/Select'
import { useForm } from 'react-hook-form'
import SubscriptionService from './services/subscription.service'
import Button from './components/UI/form/Button'
import { v4 as uuidv4 } from 'uuid'
import { type Subscription } from './types/types'
import Toast from './components/UI/form/Toast'
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup";
import { kebabCase } from 'lodash';

const App: React.FC = () => {
  // TODO: Refactor, since COUNTRY_OPTIONS_VALUE are define here and in the select component
  const COUNTRY_OPTIONS_DISPLAY = ['Canada', 'Mexico', 'India']
  const COUNTRY_OPTIONS_VALUE = COUNTRY_OPTIONS_DISPLAY.map(cod => kebabCase(cod))

  // TODO Add personalized message
  // TODO: Send required prop of Input & Select dynamically with yup, instead of being hardcoded
  const schema = yup.object({
    firstName: yup.string().min(3).max(30).required(),
    lastName: yup.string().min(3).max(30).required(),
    email: yup.string().email().required(),
    country: yup.string().oneOf(COUNTRY_OPTIONS_VALUE).required()
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
        <div className='space-y-8 divide-y divide-gray-200'>
          <div className='pt-8'>
            <div>
              <h3 className='text-base font-semibold leading-6 text-gray-900'>
                Personal Information
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Use a permanent address where you can receive mail.
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

          <div className='pt-8'>
            <div>
              <h3 className='text-base font-semibold leading-6 text-gray-900'>Notifications</h3>
              <p className='mt-1 text-sm text-gray-500'>just text</p>
            </div>
            <div className='mt-6'>
              <fieldset>
                <legend className='sr-only'>By Email</legend>
                <div className='text-sm font-semibold leading-6 text-gray-900' aria-hidden='true'>
                  By Email
                </div>
                <div className='mt-4 space-y-4'>
                  <div className='relative flex items-start'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='comments'
                        name='comments'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                    </div>
                    <div className='ml-3 text-sm leading-6'>
                      <label htmlFor='comments' className='font-medium text-gray-900'>
                        Comments
                      </label>
                      <p className='text-gray-500'>
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex items-start'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='candidates'
                        name='candidates'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                    </div>
                    <div className='ml-3 text-sm leading-6'>
                      <label htmlFor='candidates' className='font-medium text-gray-900'>
                        Candidates
                      </label>
                      <p className='text-gray-500'>
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex items-start'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='offers'
                        name='offers'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                    </div>
                    <div className='ml-3 text-sm leading-6'>
                      <label htmlFor='offers' className='font-medium text-gray-900'>
                        Offers
                      </label>
                      <p className='text-gray-500'>
                        Get notified when a candidate accepts or rejects an offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset className='mt-6'>
                <legend className='contents text-sm font-semibold leading-6 text-gray-900'>
                  Push Notifications
                </legend>
                <p className='text-sm text-gray-500'>
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className='mt-4 space-y-4'>
                  <div className='flex items-center'>
                    <input
                      id='push-everything'
                      name='push-notifications'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                    />
                    <label
                      htmlFor='push-everything'
                      className='ml-3 block text-sm font-medium leading-6 text-gray-900'
                    >
                      Everything
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input
                      id='push-email'
                      name='push-notifications'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                    />
                    <label
                      htmlFor='push-email'
                      className='ml-3 block text-sm font-medium leading-6 text-gray-900'
                    >
                      Same as email
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input
                      id='push-nothing'
                      name='push-notifications'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                    />
                    <label
                      htmlFor='push-nothing'
                      className='ml-3 block text-sm font-medium leading-6 text-gray-900'
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
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

import React from 'react';
import Input from './components/UI/form/Input';
import {EMAIL, TEXT} from "./constants/formTypes";
import Select from "./components/UI/form/Select";

function App() {
  const countryOptions = ["Canada", "Mexico", "India"]

  return (
      <div className="flex justify-center my-10 bg bg-white">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="pt-8">
              <div>
                <h3 className="text-base font-semibold leading-6 text-gray-900">Personal Information</h3>
                <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className={"sm:col-span-3"}>
                  <Input type={TEXT} label={"First name"} />
                </div>

                <div className="sm:col-span-3">
                  <Input type={TEXT} label={"Last name"} />
                </div>

                <div className="sm:col-span-4">
                  <Input type={EMAIL} label={"Email address"} />
                </div>

                <div className="sm:col-span-3">
                  <Select label={"Country"} options={countryOptions} />
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="text-base font-semibold leading-6 text-gray-900">Notifications</h3>
                <p className="mt-1 text-sm text-gray-500">
                  We'll always let you know about important changes, but you pick what else you want to hear about.
                </p>
              </div>
              <div className="mt-6">
                <fieldset>
                  <legend className="sr-only">By Email</legend>
                  <div className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                    By Email
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor="comments" className="font-medium text-gray-900">
                          Comments
                        </label>
                        <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input
                            id="candidates"
                            name="candidates"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor="candidates" className="font-medium text-gray-900">
                          Candidates
                        </label>
                        <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input
                            id="offers"
                            name="offers"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor="offers" className="font-medium text-gray-900">
                          Offers
                        </label>
                        <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="mt-6">
                  <legend className="contents text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                  <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                          id="push-everything"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="push-everything" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                        Everything
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                          id="push-email"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="push-email" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                        Same as email
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                          id="push-nothing"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                  type="button"
                  className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
  );
}

export default App;

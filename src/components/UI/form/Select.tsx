import React from "react";
import { capitalize, kebabCase } from "lodash";
import {FormProps} from "../../../types/types";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";

interface SelectProps extends FormProps {
    options: string[]

}

const Select: React.FC<SelectProps> = props => {
    const name = kebabCase(props.label)
    // Adapt color of the input depending on the error
    const color = props.error ? 'red' : 'gray'

    return (
        <>
            <label htmlFor={props.register.name} className="block text-sm font-medium leading-6 text-gray-900">
                {capitalize(props.label)}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <select
                    id={name}
                    {...props.register}
                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    className={`block w-full pl-2 rounded-md border-0 py-1.5 pr-10 text-${color}-900 ring-1 ring-inset ring-${color}-300 placeholder:text-${color}-300 focus:ring-2 focus:ring-inset focus:ring-${color}-500 sm:text-sm sm:leading-6`}
                >
                    {props.options.map(o => <option key={kebabCase(o)} value={kebabCase(o)}>{o}</option>)}
                </select>
                {props.error && <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>}
            </div>
            {props.error && <p className="mt-2 text-sm text-red-600" id="email-error">
                {props.error.message}
            </p>}
        </>
    )
}

export default Select
import React from "react";
import { capitalize, kebabCase } from "lodash";

interface SelectProps {
    options: string[]
    label: string
}

const Select: React.FC<SelectProps> = props => {
    const name = kebabCase(props.label)

    return (
        <>
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                {capitalize(props.label)}
            </label>
            <div className="mt-2">
                <select
                    id={name}
                    name={name}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                    {props.options.map(o => <option value={kebabCase(o)}>{o}</option>)}
                </select>
            </div>
        </>
    )
}

export default Select
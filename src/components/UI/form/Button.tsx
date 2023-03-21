import React from "react";
import LoadingIcon from "../LoadingIcon";
import {EnvelopeIcon} from "@heroicons/react/20/solid";

interface ButtonProps {
    loading: boolean
}

const Button: React.FC<ButtonProps> = props => {
    const opacity: number = props.loading ? 300 : 600

    return (
        <button
            disabled={props.loading}
            type="submit"
            className={`inline-flex items-center gap-x-1.5 rounded-md bg-indigo-${opacity} py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-${opacity - 100} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
            {/*TODO: Ajout loading icon au loading*/}
            {props.loading ? <LoadingIcon /> : <EnvelopeIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />}
            Subscribe
        </button>
    )
}

export default Button
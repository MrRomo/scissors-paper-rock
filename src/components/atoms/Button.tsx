import { ClassNameValue, twMerge } from "tailwind-merge"

interface ButtonProps {
    onClick: () => void
    text: string
    disabled?: boolean
    classes?: ClassNameValue
}

export const Button = ({ onClick, text, disabled, classes }: ButtonProps) => {
    const disabledClass = 'disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-gray-500 disabled:border-gray-500 disabled:hover:bg-slate-700 disabled:hover:text-gray-500 disabled:hover:border-gray-500'

    return (
        <button
            className={twMerge("bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full border-none", disabledClass, classes)}
            onClick={onClick}
            disabled={disabled}
        >{text}</button>
    )
}
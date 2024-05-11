import { ClassNameValue, twMerge } from "tailwind-merge"

interface ButtonProps {
    onClick: () => void
    text: string
    disabled?: boolean
    classes?: ClassNameValue
}

export const Button = ({ onClick, text, disabled, classes }: ButtonProps) => {
    return (
        <button
            className={twMerge("bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full border-none", classes)}
            onClick={onClick}
            disabled={disabled}
        >{text}</button>
    )
}
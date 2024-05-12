import { TableContext } from "@providers"
import { useContext, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

interface BarchartProps {
    icon: string
    color: 'red' | 'blue' | 'green'
    orientation?: 'horizontal' | 'vertical'
}

const colorBar = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
}

export const Barchart = ({ color, icon}: BarchartProps) => {
    const { agents } = useContext(TableContext)
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        const total = agents.length
        const count = agents.filter(agent => agent.icon === icon).length
        const percentage = (count / total) * 100
        setPercentage(percentage)
    }, [agents, icon])

    return (
        <div className={twMerge("flex items-center gap-2 flex-row-reverse md:flex-col w-full")}>
            <div className={twMerge(" bg-slate-700 rounded-full flex flex-row md:w-4 md:h-32 md:flex-col-reverse w-full h-4")}>
                <div className={`h-full md:hidden ${colorBar[color]} rounded-full `} style={{ width: `${percentage}%` }}></div>
                <div className={`w-full max-md:hidden ${colorBar[color]} rounded-full `} style={{ height: `${percentage}%` }}></div>
            </div>
            <span role="img" aria-label="icon">{icon}</span>
        </div>
    )

}
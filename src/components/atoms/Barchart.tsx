import { TableContext } from "@providers"
import { useContext, useEffect, useState } from "react"

interface BarchartProps {
    icon: string
    color: 'red' | 'blue' | 'green'
}

const colorBar = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
}

export const Barchart = ({ color, icon }: BarchartProps) => {
    const { agents } = useContext(TableContext)
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        const total = agents.length
        const count = agents.filter(agent => agent.icon === icon).length
        const percentage = (count / total) * 100
        setPercentage(percentage)
    }, [agents, icon])

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-4 h-32 bg-slate-700 rounded-full flex flex-col-reverse">
                <div className={`w-full ${colorBar[color]} rounded-full `} style={{ height: `${percentage}%` }}></div>
            </div>
            <span role="img" aria-label="icon">{icon}</span>
        </div>
    )

}
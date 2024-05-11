import { useEffect, useState } from "react"
import { Canva } from "../molecules/Canva"

export const Table = () => {

    const [opacity, setOpacity] = useState(true)
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setOpacity(false)
        }, 2000)
        setTimeout(() => {
            setHidden(true)
        }, 4000);
    }, [])

    const handleClick = () => {
        setHidden(true)
    }


    return (
        <div className="w-full h-[70vh] bg-slate-800 rounded-md" id="canvas-container" onClick={handleClick}>
            <Canva />
        </div>
    )
}

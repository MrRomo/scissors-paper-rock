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
        <div className="w-full h-[60vh] bg-slate-800 rounded-md" id="canvas-container" onClick={handleClick}>
            <div className={`absolute w-full h-[60vh] flex transition-opacity ${opacity ? 'opacity-100' : 'opacity-0'} ease-in-out duration-1000  ${hidden && 'hidden'} `}>
                <h2 className="mx-auto my-auto rounded-md bg-slate-700 px-16 py-4" >
                    Click and drag to draw
                </h2>
            </div>
            <Canva />
        </div>
    )
}

import { useContext } from "react"
import { TableContext } from "providers"
import NativeSlider from "components/atoms/Slider"

export const SetBar = () => {

    const { values, setValues, innerSquares, isSquare: square, setSquare } = useContext(TableContext)

    const handleWitdhChange = (e: number) => {
        setValues({ ...values, panel: { ...values.panel, width: e } })
    }
    const handleHeigthChange = (e: number) => {
        setValues({ ...values, panel: { ...values.panel, height: e } })
    }

    return (
        <div className="w-full bg-slate-800 rounded-md py-4">
            <h2 className="text-center text-white text-2xl">Cuantos Paneles Caben</h2>
            <div className="flex">

                <div className="flex flex-col px-4 gap-2 text-start">
                    <span className="font-bold">Square Info: </span>
                    <div className="flex gap-2">
                        <span >Width: {values.square.width}</span>
                        <span >Height: {values.square.height}</span>
                    </div>
                    <span className="font-bold">Inner Square Info: </span>
                    <div className="flex gap-2">
                        <span className="">Set Width: </span>
                        <NativeSlider value={values.panel.width} setValue={handleWitdhChange} />
                    </div>
                    <div className="flex gap-2">
                        <span className="">Set Height: </span>
                        <NativeSlider value={values.panel.height} setValue={handleHeigthChange} />
                    </div>
                    <div className="flex gap-2">
                        <span className="">Total Panel: {innerSquares.length}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold" > Select Figure:</h3>
                    <div className="flex gap-2">
                        <span className="">Square: </span>
                        <input type="checkbox" checked={square} onChange={() => setSquare(true)} />
                    </div>
                    <div className="flex gap-2">
                        <span className="">Triangle: </span>
                        <input type="checkbox" checked={!square} onChange={() => setSquare(false)} />
                    </div>
                </div>
            </div>
        </div >
    )
}
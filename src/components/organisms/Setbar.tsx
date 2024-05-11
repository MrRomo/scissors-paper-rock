import { Button } from "@atoms"

export const Setbar = () => {
    return (
        <div className="w-full bg-slate-800 rounded-md py-4 flex flex-col gap-4">
            <h2 className="text-white text-center text-2xl font-bold">Scissors - Paper - Rock Battle Simulator</h2>
            <div className="flex justify-center gap-4 px-4">
                <Button text="Construct" onClick={() => console.log("Construct")} />
                <Button text="Set positions" onClick={() => console.log("Set positions")} />
                <Button text="Start →" onClick={() => console.log("Start →")} />
            </div >
        </div >
    )
}
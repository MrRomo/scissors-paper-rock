import { Button } from "@atoms"
import { TableContext } from "@providers"
import { useContext } from "react"
import { twMerge } from "tailwind-merge"

export const Setbar = () => {
    const { stage, setStage, emitters, setAgents, randomizeEmmitters, startAgents, reset } = useContext(TableContext)

    const createAgents = () => {
        const agents = []
        for (let i = 0; i < startAgents; i++) {
            agents.push(emitters.rock.createAgent())
            agents.push(emitters.paper.createAgent())
            agents.push(emitters.scissors.createAgent())
        }
        setAgents([...agents])
        setStage('run')
    }


    return (
        <div className="w-full bg-slate-800 rounded-md py-4 flex flex-col gap-4">
            <div className="flex flex-col justify-center">
                <h2 className="text-white text-center text-2xl font-bold">Scissors - Paper - Rock Battle Simulator</h2>
                <p className="text-white text-center">A simple simulation of the game Scissors - Paper - Rock</p>
                {/* <p className="text-white text-center">
                    Time Spend
                    <img className='mx-auto my-1' src="https://wakatime.com/badge/user/d0b2bf72-1c5b-45b1-bcd7-79a3fcfb29ed/project/1b0d6320-6158-4035-8547-d471536bac8a.svg" alt="wakatime" />
                </p> */}
            </div>
            <div className="flex justify-center max-md:hidden gap-4 px-4">
                <Button
                    text="Set positions"
                    disabled={stage === 'run'}
                    classes={twMerge(stage === 'set' ? 'bg-green-500' : '', 'max-md:hidden')}
                    onClick={() => setStage('set')} />
                <Button text="Reset" onClick={() => reset()} />
                <Button text="Randomize positions" disabled={stage === 'run'} onClick={randomizeEmmitters} />
                <Button text="Start →" onClick={createAgents} />
                {
                    stage === 'run' ? <Button text="Pause ||" onClick={() => setStage('pause')} disabled={stage !== 'run'} /> :
                        <Button text="Continue →" onClick={() => setStage('run')} disabled={stage !== 'pause'} />
                }
            </div >
            <div className="flex justify-center gap-1 md:gap-4 px-2 md:hidden">
                <Button
                    text="Set positions"
                    disabled={stage === 'run'}
                    classes={twMerge(stage === 'set' ? 'bg-green-500' : '', 'max-md:hidden')}
                    onClick={() => setStage('set')} />
                <Button text="Reset" onClick={() => reset()} />
                <Button text="Random" disabled={stage === 'run'} onClick={randomizeEmmitters} />

                {stage === 'set' && <Button classes={twMerge()} text="Start →" onClick={createAgents} />}
                {
                    stage === 'run' ? <Button text="Pause ⏸️" onClick={() => setStage('pause')} disabled={stage !== 'run'} /> :
                        stage === 'pause' && <Button text="Continue ▶️" onClick={() => setStage('run')} />
                }
            </div >
        </div >
    )
}
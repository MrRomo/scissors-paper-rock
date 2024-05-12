import { Button } from "@atoms"
import { TableContext } from "@providers"
import { useContext } from "react"

export const Setbar = () => {
    const { stage, setStage, emitters, setAgents, randomizeEmmitters, startAgents } = useContext(TableContext)

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
            <h2 className="text-white text-center text-2xl font-bold">Scissors - Paper - Rock Battle Simulator</h2>
            <div className="flex justify-center gap-4 px-4">
                {/* <Button
                    text="Construct"
                    disabled={stage === 'run'}
                    classes={stage === 'construct' ? 'bg-green-500' : ''}
                    onClick={() => setStage("construct")}
                /> */}
                <Button
                    text="Set positions"
                    disabled={stage === 'run'}
                    classes={stage === 'set' ? 'bg-green-500' : ''}
                    onClick={() => setStage('set')} />
                <Button
                    text="Randomize positions"
                    disabled={stage === 'run'}
                    onClick={randomizeEmmitters} />
                <Button text="Start →" onClick={createAgents} />
                {
                    stage === 'run' ? <Button text="Pause ||" onClick={() => setStage('pause')} disabled={stage !== 'run'} /> :
                        <Button text="Continue →" onClick={() => setStage('run')} disabled={stage !== 'pause'} />
                }
            </div >
        </div >
    )
}
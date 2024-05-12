import { Barchart, NativeSlider } from "@atoms"
import { TableContext } from "@providers"
import { icons } from "@lib"
import { useContext } from "react"
import { twMerge } from "tailwind-merge"
import { agent } from "types"

export const Sidebar = () => {
  const { emitters, selectedAgent, setSelectedAgent, stage, setVelocity, setStartAgents, startAgents, velocity } = useContext(TableContext)

  const agentClass = `bg-slate-700 rounded-full flex items-center justify-center font-medium text-lg w-36 py-4 ${stage === 'set' && 'cursor-pointer'}`

  const handleAgent = (agent: agent) => {
    if (stage === 'set') setSelectedAgent(agent)
  }

  return (
    <div className="w-full bg-slate-800 rounded-md py-4">
      <div className={twMerge("m-4 border-4 border-gray-700 p-4 rounded-md max-md:hidden", stage === 'set' && 'border-cyan-500')}>
        <h1 className="text-center text-xl font-semibold mb-3">Set Position</h1>
        <div className="flex items-center justify-center gap-2 px-2">
          {
            Object.keys(emitters).map((key, index) => {
              const emitter = emitters[key as agent]
              return (
                <div key={index} className={twMerge(agentClass, selectedAgent === key ? 'bg-slate-900' : '')}
                  onClick={() => handleAgent(key as agent)}
                >
                  <span role="img" aria-label={key}>{icons[emitter.icon]}</span>
                </div>
              )
            })}
        </div>
      </div>
      <div className="md:m-4 md:border-4 md:border-cyan-500 p-4 rounded-md">
        <h1 className="text-center text-xl font-semibold mb-3 max-md:hidden">Game</h1>
        <div className="flex max-md:flex-col w-full items-center justify-center gap-2 px-2">
          <Barchart color="red" icon={icons['scissors']} />
          <Barchart color="green" icon={icons['rock']} />
          <Barchart color="blue" icon={icons['paper']} />
        </div>
      </div>
      <div className="flex-col justify-between w-full max-md:hidden">
        <div className={twMerge("m-4 border-4 border-gray-700 p-4 rounded-md", stage !== 'run' && 'border-cyan-500')}>
          <h1 className="text-center text-xl font-semibold mb-3">Start Agents</h1>
          <div className="flex items-center justify-center gap-2 px-2">
            <NativeSlider min={1} max={100} value={startAgents} setValue={setStartAgents} disabled={stage === 'run'} />
          </div>
        </div>
        <div className="m-4 border-4 border-cyan-500 p-4 rounded-md">
          <h1 className="text-center text-xl font-semibold mb-3">Velocity</h1>
          <div className="flex items-center justify-center gap-2 px-2">
            <NativeSlider min={0.1} max={5} value={velocity} setValue={setVelocity} step={0.01} />
          </div>
        </div>
      </div>
        <div className={twMerge("flex flex-col justify-between w-full my-4 px-4 md:hidden")}>
          <div className="flex items-center w-full gap-2 px-2">
            <h1 className="text-start text-xl font-semibold mb-3 w-2/4">Start Agents</h1>
            <NativeSlider min={1} max={100} value={startAgents} setValue={setStartAgents} disabled={stage === 'run'} />
          </div>
          <div className="flex items-center w-full gap-2 px-2">
            <h1 className="text-start text-xl w-2/4 font-semibold mb-3">Velocity</h1>
            <NativeSlider min={0.1} max={5} value={velocity} setValue={setVelocity} step={0.01} />
          </div>
        </div>
    </div >
  )
}
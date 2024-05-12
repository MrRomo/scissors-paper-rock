import { Button } from "@atoms"
import { TableContext } from "@providers"
import { useContext } from "react"
import { twMerge } from "tailwind-merge"
import { agent } from "types"

export const Sidebar = () => {
  const { reset, emitters, selectedAgent, setSelectedAgent, stage } = useContext(TableContext)
  const agentClass = `bg-slate-700 rounded-full flex items-center justify-center font-medium text-lg w-36 py-4 ${stage === 'set' && 'cursor-pointer'}`
  const handleAgent = (agent: agent) => {
    if (stage === 'set') setSelectedAgent(agent)
  }

  return (
    <div className="w-full  h-[70vh] bg-slate-800 rounded-md py-4">
      <Button classes="px-12" text="Reset" onClick={() => reset()} />
      <div className="my-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className={twMerge(agentClass, selectedAgent === 'scissors' ? 'bg-slate-900' : '')}
            onClick={() => handleAgent('scissors')}
          >
            <span role="img" aria-label="scissors">✂️</span>
            {emitters.scissors.coords.x > 0 && emitters.scissors.coords.y > 0 ? `${emitters.scissors.coords.x}, ${emitters.scissors.coords.y}` : 'Set'}
          </div>
          <div className={twMerge(agentClass, selectedAgent === 'rock' ? 'bg-slate-900' : '')}
            onClick={() => handleAgent('rock')}
          >
            <span role="img" aria-label="rock">🪨</span>
            {emitters.rock.coords.x > 0 && emitters.rock.coords.y > 0 ? `${emitters.rock.coords.x}, ${emitters.rock.coords.y}` : 'Set'}
          </div>
          <div className={twMerge(agentClass, selectedAgent === 'paper' ? 'bg-slate-900' : '')}
            onClick={() => handleAgent('paper')}
          >
            <span role="img" aria-label="paper">📜</span>
            {emitters.paper.coords.x > 0 && emitters.paper.coords.y > 0 ? `${emitters.paper.coords.x}, ${emitters.paper.coords.y}` : 'Set'}
          </div>
        </div>
      </div>
    </div >
  )
}
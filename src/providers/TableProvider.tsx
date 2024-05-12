/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from "react"
import { Emmitter, Wall } from "@lib"
import { agent, agents, coord, stage } from "types"

export const TableContext = createContext({
    walls: [] as Wall[],
    startWall: (_coord: coord) => { },
    endWall: (_coord: coord) => { },
    stage: 'construct' as stage,
    setStage: (_stage: stage) => { },
    reset: () => { },
    emitters: {} as agents,
    setEmmitter: (_agent: agent, _coords: coord) => { },
    setSelectedAgent: (_agent: agent) => { },
    selectedAgent: 'scissors' as agent
})

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
    const [walls, setWalls] = useState<Wall[]>([])
    const [selectedAgent, setSelectedAgent] = useState<agent>('scissors')
    const [emitters, setEmitters] = useState<agents>({
        scissors: new Emmitter('scissors', { x: -70, y: -70 }),
        rock: new Emmitter('rock', { x: -70, y: -70 }),
        paper: new Emmitter('paper', { x: -70, y: -70 })
    })
    const [stage, setStage] = useState<stage>('construct')

    const startWall = ({ x, y }: coord) => {
        if (stage !== 'construct') return
        const newWall = new Wall(x, y, x, y)
        walls.push(newWall)
        setWalls(walls)
    }

    const endWall = ({ x, y }: coord) => {
        if (stage !== 'construct') return
        if (walls.length === 0) return
        const lastWall = walls[walls.length - 1]
        lastWall.endX = x
        lastWall.endY = y
        setWalls([...walls])
    }

    const setEmmitter = (agent: agent, coord: coord) => {
        if (stage !== 'set') return
        emitters[agent].setCoord(coord)
        setEmitters({ ...emitters })
    }

    const reset = () => {
        setWalls([])
        setStage('construct')
    }

    return (
        <TableContext.Provider value={{
            setSelectedAgent, selectedAgent,
            emitters, setEmmitter,
            walls, startWall, reset,
            endWall, stage, setStage
        }}>
            {children}
        </TableContext.Provider>
    )
}
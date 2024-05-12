/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from "react"
import { Agent, Emmitter, Wall } from "@lib"
import { agent, typeEmitters, coord, stage, square } from "types"

export const TableContext = createContext({
    walls: [] as Wall[],
    startWall: (_coord: coord) => { },
    endWall: (_coord: coord) => { },
    stage: 'construct' as stage,
    setStage: (_stage: stage) => { },
    reset: () => { },
    emitters: {} as typeEmitters,
    setEmmitter: (_agent: agent, _coords: coord) => { },
    setSelectedAgent: (_agent: agent) => { },
    selectedAgent: 'scissors' as agent,
    agents: [] as Agent[],
    setAgents: (_agents: Agent[]) => { },
    randomizeEmmitters: () => { },
    setCanvasSize: (_size: square) => { },
    canvasSize: {} as square
})

const defaultBorderWalls = [
    new Wall(0, 0, 0, 0),
    new Wall(0, 0, 0, 0),
    new Wall(0, 0, 0, 0),
    new Wall(0, 0, 0, 0)
]

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
    const [walls, setWalls] = useState<Wall[]>(defaultBorderWalls)
    const [agents, setAgents] = useState<Agent[]>([])
    const [selectedAgent, setSelectedAgent] = useState<agent>('scissors')
    const [canvasSize, setCanvasSize] = useState<square>({ x: 0, y: 0, width: 0, height: 0})
    const [emitters, setEmitters] = useState<typeEmitters>({
        scissors: new Emmitter('scissors', { x: 0, y: 0 }),
        rock: new Emmitter('rock', { x: 0, y: 0 }),
        paper: new Emmitter('paper', { x: 0, y: 0 })
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

    const randomizeEmmitters = () => {
        Object.keys(emitters).forEach((key: string) => { // Change the type of 'key' to 'string'
            const x = canvasSize!.x + canvasSize!.width * Math.random()
            const y = canvasSize!.y + canvasSize!.height * Math.random()
            emitters[key as agent].setCoord({ x, y }) // Add a type assertion to 'key' as 'agent'
            setEmitters({ ...emitters })
        })
    }

    const reset = () => {
        setDefaultBorderWalls()
        setAgents([])
        setStage('construct')
    }
    const setDefaultBorderWalls = () => {
        const { x, y, width, height } = canvasSize
        const borderWalls = [
            new Wall(x, y, x + width, y),
            new Wall(x + width, y, x + width, y + height),
            new Wall(x + width, y + height, x, y + height),
            new Wall(x, y + height, x, y)
        ]
        setWalls(borderWalls)
    }
    useEffect(() => {
        //set default border walls
        if (canvasSize) setDefaultBorderWalls()
    }, [canvasSize])

    useEffect(() => {
        randomizeEmmitters()
    },[])

    return (
        <TableContext.Provider value={{
            setCanvasSize, canvasSize, randomizeEmmitters,
            agents, setAgents,
            setSelectedAgent, selectedAgent,
            emitters, setEmmitter,
            walls, startWall, reset,
            endWall, stage, setStage
        }}>
            {children}
        </TableContext.Provider>
    )
}
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from "react"
import { Wall } from "@lib"
import { coord } from "types"

export const TableContext = createContext({
    walls: [] as Wall[],
    startWall: (_coord: coord) => { },
    endWall: (_coord: coord) => { }
})

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
    const [walls, setWalls] = useState<Wall[]>([])

    const startWall = ({ x, y }: coord) => {
        const newWall = new Wall(x, y, x, y)
        walls.push(newWall)
        setWalls(walls)
    }

    const endWall = ({ x, y }: coord) => {
        if (walls.length === 0) return
        const lastWall = walls[walls.length - 1]
        lastWall.endX = x
        lastWall.endY = y
        setWalls([...walls])
    }

    return (
        <TableContext.Provider value={{ walls, startWall, endWall }}>
            {children}
        </TableContext.Provider>
    )
}
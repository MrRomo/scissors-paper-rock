/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from "react"
import { SquareFactor, TriangleFactor, getCoords } from "lib"

export interface square {
    x: number
    y: number
    width: number
    height: number
}

export interface valuesProps {
    square: {
        x: number
        y: number
        endX: number
        endY: number
        width: number
        height: number
    },
    panel: {
        width: number
        height: number
    }
}

export const TableContext = createContext({
    isSquare: true,
    values: {
        square: { x: 0, y: 0, endX: 0, endY: 0, width: 0, height: 0 },
        panel: { width: 0, height: 0 }
    },
    innerSquares: [] as square[],
    setSquare: (_value: boolean) => { },
    setValues: (_values: any) => { },
    setInnerSquares: (_squares: square[]) => { }
})

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSquare, setSquare] = useState(true)
    const [innerSquares, setInnerSquares] = useState<square[]>([])
    const [values, setValues] = useState({
        square: { x: 0, y: 0, endX: 0, endY: 0, width: 0, height: 0 },
        panel: { width: 50, height: 120 }
    })

    useEffect(() => {
        const squares: square[] = isSquare ? SquareFactor(values) : TriangleFactor(values)
        const { squareWidth, squareHeight } = getCoords(values)
        setInnerSquares(squares)
        setValues({ ...values, square: { ...values.square, width: squareWidth, height: squareHeight } })
    }, [values.square.endX, values.square.endY, values.panel.height, values.panel.width, isSquare])

    return (
        <TableContext.Provider value={{ isSquare, values, setSquare, setValues, innerSquares, setInnerSquares }}>
            {children}
        </TableContext.Provider>
    )
}
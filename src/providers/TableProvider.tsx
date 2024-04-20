import { createContext, useEffect, useState } from "react"

interface square {
    x: number
    y: number
    width: number
    height: number
}

export const TableContext = createContext({
    square: true,
    intersect: true,
    values: {
        square: {
            x: 0,
            y: 0,
            endX: 0,
            endY: 0,
            width: 0,
            height: 0
        },
        panel: {
            width: 0,
            height: 0
        }
    },

    innerSquares: [] as square[],
    setSquare: (value: boolean) => { },
    setIntersect: (value: boolean) => { },
    setValues: (values: { square: square, triangle: square, panel: { width: number, height: number } }) => { },
    setInnerSquares: (squares: square[]) => { }
})

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
    const [square, setSquare] = useState(true)
    const [intersect, setIntersect] = useState(true)
    const [innerSquares, setInnerSquares] = useState<square[]>([])
    const [values, setValues] = useState({
        square: {
            x: 0,
            y: 0,
            endX: 400,
            endY: 200,
            width: 0,
            height: 0
        },
        panel: {
            width: 50,
            height: 120
        }
    })

    useEffect(() => {
        const xCoord = values.square.x > values.square.endX ? values.square.endX : values.square.x
        const yCoord = values.square.y > values.square.endY ? values.square.endY : values.square.y
        const xEnd = values.square.x > values.square.endX ? values.square.x : values.square.endX
        const yEnd = values.square.y > values.square.endY ? values.square.y : values.square.endY
        const squareWidth = xEnd - xCoord
        const squareHeight = yEnd - yCoord
        const horizontalSquares = Math.floor(squareWidth / values.panel.width)
        const verticalSquares = Math.floor(squareHeight / values.panel.height)
        const squares: square[] = []

        if (square) {
            for (let i = 0; i < verticalSquares; i++) {
                for (let j = 0; j < horizontalSquares; j++) {
                    squares.push({
                        x: xCoord + (values.panel.width * j),
                        y: yCoord + (values.panel.height * i),
                        width: values.panel.width,
                        height: values.panel.height
                    })
                }
            }

            // set the inner squares down rotate
            //get square down coords
            const yCoordDown = yCoord + values.panel.height * verticalSquares
            const xCoordDown = xCoord
            const horizontalSquaresDown = Math.floor((xEnd - xCoordDown) / values.panel.height)
            const verticalSquaresDown = Math.floor((yEnd - yCoordDown) / values.panel.width)

            for (let i = 0; i < verticalSquaresDown; i++) {
                for (let j = 0; j < horizontalSquaresDown; j++) {
                    squares.push({
                        x: xCoordDown + (values.panel.height * j),
                        y: yCoordDown + (values.panel.width * i),
                        width: values.panel.height,
                        height: values.panel.width
                    })
                }
            }
            //get square right coords
            const xCoordRight = xCoord + values.panel.width * horizontalSquares
            const yCoordRight = yCoord
            const horizontalSquaresRight = Math.floor((xEnd - xCoordRight) / values.panel.height)
            const verticalSquaresRight = Math.floor((yEnd - yCoordRight) / values.panel.width)

            for (let i = 0; i < verticalSquaresRight; i++) {
                for (let j = 0; j < horizontalSquaresRight; j++) {
                    squares.push({
                        x: xCoordRight + (values.panel.height * j),
                        y: yCoordRight + (values.panel.width * i),
                        width: values.panel.height,
                        height: values.panel.width
                    })
                }
            }
        } else {
            let SubSquareHeight = squareHeight
            let SubSquareWidth = squareWidth
            let yPos = 1
            let xShift = 0

            while (SubSquareHeight >= values.panel.height && SubSquareWidth >= values.panel.width) {
                const A = Math.atan((2 * SubSquareHeight) / SubSquareWidth)
                const K = values.panel.height / Math.tan(A)
                SubSquareWidth -= 2 * K
                const subXCoord = xCoord + K
                const subYCoord = yEnd - (values.panel.height * yPos)
                const horizontalSquares = Math.floor(SubSquareWidth / values.panel.width)
                for (let i = 0; i < horizontalSquares; i++) {
                    squares.push({
                        x: subXCoord + (values.panel.width * i) + xShift,
                        y: subYCoord,
                        width: values.panel.width,
                        height: values.panel.height
                    })
                }
                SubSquareHeight -= values.panel.height
                yPos++
                xShift += K
            }
        }
        setInnerSquares(squares)
        setValues({ ...values, square: { ...values.square, width: squareWidth, height: squareHeight } })
    }, [values.square.endX, values.square.endY, values.panel.height, values.panel.width, square])

    return (
        <TableContext.Provider value={{
            square, intersect, values,
            setSquare, setIntersect, setValues,
            innerSquares, setInnerSquares
        }}>
            {children}
        </TableContext.Provider>
    )
}
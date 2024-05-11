import { square,valuesProps } from "@providers"
import { Wall } from "./wall"

export const SquareFactor = (values: valuesProps) => {
    const { xCoord, yCoord, xEnd, yEnd, squareWidth, squareHeight } = getCoords(values)

    const squares: square[] = []
    const horizontalSquares = Math.floor(squareWidth / values.panel.width)
    const verticalSquares = Math.floor(squareHeight / values.panel.height)

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


    return squares
}


export const TriangleFactor = (values: valuesProps) => {
    const { xCoord, yEnd, squareWidth, squareHeight } = getCoords(values)

    const squares: square[] = []
    let SubSquareHeight = squareHeight
    let SubSquareWidth = squareWidth
    let yPos = 1
    let xShift = 0
    const A = (2 * SubSquareHeight) / SubSquareWidth

    while (SubSquareHeight >= values.panel.height && SubSquareWidth >= values.panel.width) {
        const K = values.panel.height / A
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

    return squares
}


export const getCoords = (values: valuesProps) => {
    const xCoord = Math.min(values.square.x, values.square.endX)
    const yCoord = Math.min(values.square.y, values.square.endY)
    const xEnd = Math.max(values.square.x, values.square.endX)
    const yEnd = Math.max(values.square.y, values.square.endY)
    const squareWidth = xEnd - xCoord
    const squareHeight = yEnd - yCoord
    return { xCoord, yCoord, xEnd, yEnd, squareWidth, squareHeight }
}
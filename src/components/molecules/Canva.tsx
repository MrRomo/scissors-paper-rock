/* eslint-disable react-hooks/exhaustive-deps */

import { TableContext } from "@providers"
import { useContext, useEffect, useRef } from "react"
import { Engine } from "./Engine"

export const Canva = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { walls, startWall, endWall, stage, setEmmitter, selectedAgent, emitters, setCanvasSize, canvasSize } = useContext(TableContext)

    // Función para ajustar el tamaño del canvas
    function redrawCanvas() {
        const canvasContainer = document.getElementById('canvas-container')
        if (canvasContainer && canvasRef.current) {
            const canvas = canvasRef.current as HTMLCanvasElement
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            canvas.width = canvasContainer.offsetWidth as number
            canvas.height = canvasContainer.offsetHeight
            if (canvas.width !== canvasSize.width || canvas.height !== canvasSize.height)
                setCanvasSize({ x: 0, y: 0, width: canvas.width, height: canvas.height })
            drawPattern()
            for (const wall of walls) wall.draw(ctx)
            emitters.paper.draw(ctx)
            emitters.scissors.draw(ctx)
            emitters.rock.draw(ctx)
        }
    }

    // Llamar a la función al cargar la página y al redimensionar la ventana
    window.onload = redrawCanvas
    window.addEventListener('resize', redrawCanvas)

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement
        function start(evt: MouseEvent) {
            startWall({ x: evt.offsetX, y: evt.offsetY })
        }
        canvas.addEventListener('mousedown', start)
        return () => canvas.removeEventListener('mousedown', start)
    }, [stage, walls])

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement
        function end(evt: MouseEvent) {
            if (evt.buttons !== 1) return
            endWall({ x: evt.offsetX, y: evt.offsetY })
        }
        canvas.addEventListener('mouseup', end)
        return () => canvas.removeEventListener('mouseup', end)
    }, [stage, walls])

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement
        function end(evt: MouseEvent) {
            if (evt.buttons !== 1) return
            endWall({ x: evt.offsetX, y: evt.offsetY })
        }
        canvas.addEventListener('mousemove', end)
        return () => canvas.removeEventListener('mousemove', end)
    }, [stage, walls])

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement
        function setAgent(evt: MouseEvent) {
            if (evt.buttons !== 1) return
            setEmmitter(selectedAgent, { x: evt.offsetX, y: evt.offsetY })
        }
        canvas.addEventListener('mousedown', setAgent)
        return () => canvas.removeEventListener('mousedown', setAgent)
    })

    function drawPattern() {
        // Definir el patrón de líneas diagonales discontinuas
        const canvas = canvasRef.current as HTMLCanvasElement
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
        ctx.lineWidth = 4
        ctx.beginPath()
        for (let i = -canvas.height; i < canvas.width; i += 20) {
            ctx.moveTo(i, 0)
            ctx.lineTo(i + canvas.height, canvas.height)
        }
        ctx.stroke()
    }

    useEffect(() => {
        redrawCanvas()
    }, [walls, emitters])

    return <Engine>
        <canvas ref={canvasRef} id='canvas' />
    </Engine>
}
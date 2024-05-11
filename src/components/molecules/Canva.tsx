/* eslint-disable react-hooks/exhaustive-deps */

import { TableContext } from "@providers";
import { useContext, useEffect, useRef } from "react";

export const Canva = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { walls, startWall, endWall } = useContext(TableContext)
    // Función para ajustar el tamaño del canvas
    function redrawCanvas() {
        const canvasContainer = document.getElementById('canvas-container');
        if (canvasContainer && canvasRef.current) {
            const canvas = canvasRef.current as HTMLCanvasElement;
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            canvas.width = canvasContainer.offsetWidth as number;
            canvas.height = canvasContainer.offsetHeight;
            drawPattern();
            for (let i = 0; i < walls.length; i++) {
                if (!isNaN(walls[i].endX) || !isNaN(walls[i].endY)) {
                    walls[i].drawLine(ctx);
                }
            }
        }
    }

    // Llamar a la función al cargar la página y al redimensionar la ventana
    window.onload = redrawCanvas;
    window.addEventListener('resize', redrawCanvas);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        canvas.addEventListener('mousedown', (evt) => {
            console.log('startWall');
            // if (evt.buttons === 1) return
            startWall({ x: evt.offsetX, y: evt.offsetY });
        });

        canvas.addEventListener('mouseup', (evt) => {
            endWall({ x: evt.offsetX, y: evt.offsetY });
        })
        canvas.addEventListener('mousemove', (evt) => {
            if (evt.buttons === 1) {
                endWall({ x: evt.offsetX, y: evt.offsetY });
            }
        })

        return () => {
            canvas.removeEventListener('mousedown', () => { });
            canvas.removeEventListener('mouseup', () => { });
            canvas.removeEventListener('mousemove', () => { });
        }
    }, []);

    function drawPattern() {
        // Definir el patrón de líneas diagonales discontinuas
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let i = -canvas.height; i < canvas.width; i += 20) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i + canvas.height, canvas.height);
        }
        ctx.stroke();
    }

    useEffect(() => {
        redrawCanvas();
    }, [walls])


    return <canvas

        ref={canvasRef} />;
}
/* eslint-disable react-hooks/exhaustive-deps */
 
import { TableContext, valuesProps } from "../../providers/TableProvider";
import { useContext, useEffect, useRef } from "react";

export const Canva = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { values, setValues, innerSquares, square } = useContext(TableContext)
    // Función para ajustar el tamaño del canvas
    function resizeSquareCanvas() {
        const canvasContainer = document.getElementById('canvas-container');
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        if (canvasContainer) {
            canvas.width = canvasContainer.offsetWidth as number;
            canvas.height = canvasContainer.offsetHeight;

            const xCoord = values.square.x > values.square.endX ? values.square.endX : values.square.x
            const yCoord = values.square.y > values.square.endY ? values.square.endY : values.square.y
            const xEnd = values.square.x > values.square.endX ? values.square.x : values.square.endX
            const yEnd = values.square.y > values.square.endY ? values.square.y : values.square.endY

            // Dibujar algo en el canvas
            drawPattern();
            ctx.fillStyle = '#C25';
            if (square) {
                ctx.fillRect(xCoord, yCoord, values.square.width, values.square.height);
            } else {
                //draw a triangle
                ctx.beginPath();
                ctx.moveTo(xEnd - values.square.width / 2, yCoord);
                ctx.lineTo(xCoord, yEnd);
                ctx.lineTo(xEnd, yEnd);
                ctx.closePath();
                ctx.fill();
            }
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(xCoord, yCoord - 15); // Regla horizontal superior
            ctx.lineTo(xCoord, yCoord - 5);

            ctx.moveTo(xCoord, yCoord - 10);
            ctx.lineTo(xEnd, yCoord - 10);

            ctx.moveTo(xEnd, yCoord - 15);
            ctx.lineTo(xEnd, yCoord - 5);

            ctx.moveTo(xCoord - 15, yCoord); // Regla vertical izquierda
            ctx.lineTo(xCoord - 5, yCoord);

            ctx.moveTo(xCoord - 10, yCoord);
            ctx.lineTo(xCoord - 10, yEnd);

            ctx.moveTo(xCoord - 15, yEnd);
            ctx.lineTo(xCoord - 5, yEnd);

            for (let i = 0; i < innerSquares.length; i++) {
                ctx.fillStyle = '#1D4';
                ctx.fillRect(
                    innerSquares[i].x,
                    innerSquares[i].y,
                    innerSquares[i].width,
                    innerSquares[i].height
                );
                ctx.strokeRect(
                    innerSquares[i].x,
                    innerSquares[i].y,
                    innerSquares[i].width,
                    innerSquares[i].height
                );
            }
            ctx.stroke();
        }
    }

    // Llamar a la función al cargar la página y al redimensionar la ventana
    window.onload = resizeSquareCanvas;
    window.addEventListener('resize', resizeSquareCanvas);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        canvas.addEventListener('mousedown', (evt) => {
            setValues((values: valuesProps) => {
                return {
                    ...values,
                    square: {
                        ...values.square,
                        x: Math.round(evt.offsetX),
                        y: Math.round(evt.offsetY)
                    }
                }
            });
        });

        canvas.addEventListener('mouseup', (evt) => {
            setValues((values: valuesProps) => {
                return {
                    ...values,
                    square: {
                        ...values.square,
                        endX: Math.round(evt.offsetX),
                        enxY: Math.round(evt.offsetY)
                    }
                }
            })
        })
        canvas.addEventListener('mousemove', (evt) => {
            if (evt.buttons === 1) {
                setValues((values: valuesProps) => {
                    return {
                        ...values,
                        square: {
                            ...values.square,
                            endX: evt.offsetX,
                            endY: evt.offsetY
                        }
                    }
                })
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
        resizeSquareCanvas();
    }, [innerSquares, values.square, square])


    return <canvas ref={canvasRef} />;
}
import { useContext, useEffect, useRef } from "react"
import { TableContext } from "@providers"

export const Engine = ({ children }: { children: React.ReactNode }) => {
    const { agents, stage, setAgents } = useContext(TableContext)
    const requestRef = useRef<number>()

    function drawElement() {
        // Dibuja el elemento
        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.clearRect(0, 0, 800, 600)
        for (const agent of agents) {
            ctx.beginPath()
            ctx.arc(agent.coord.x, agent.coord.y, 10, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    function animate() {
        console.log('animating')
        updateElement() // Actualiza la posición del elemento
        drawElement() // Dibuja el elemento
        requestRef.current = requestAnimationFrame(animate)
    }

    function updateElement() {
        // Actualiza la posición del elemento
        for (const agent of agents) {
            agent.move()
        }
        setAgents(agents)
    }


    useEffect(() => {
        if (stage !== 'run') return
        animate()
        return () => cancelAnimationFrame(requestRef.current as number)
    }, [stage])


    return children
}
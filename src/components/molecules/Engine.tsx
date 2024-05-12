import { useContext, useEffect, useRef } from "react"
import { TableContext } from "@providers"

export const Engine = ({ children }: { children: React.ReactNode }) => {
    const { agents, stage, setAgents, emitters, walls } = useContext(TableContext)
    const requestRef = useRef<number>()
    const distance = 10

    function drawElement() {
        // Dibuja el elemento
        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        //draw backgroudn pattern
        ctx.fillStyle = 'rgb(30, 41, 59)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        //draw grid
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
        ctx.lineWidth = 4
        ctx.beginPath()
        for (let i = -canvas.height; i < canvas.width; i += 20) {
            ctx.moveTo(i, 0)
            ctx.lineTo(i + canvas.height, canvas.height)
        }
        ctx.stroke()
        //draw walls
        for (const wall of walls) {
            wall.draw(ctx)
        }

        //draw emmiters
        emitters.paper.draw(ctx)
        emitters.scissors.draw(ctx)
        emitters.rock.draw(ctx)
        //draw agents
        for (const agent of agents) {
            agent.draw(ctx)
        }
    }

    function animate() {
        updateElement() // Actualiza la posición del elemento
        drawElement() // Dibuja el elemento
        requestRef.current = requestAnimationFrame(animate)
    }

    function updateElement() {
        // Actualiza la posición del elemento
        for (const agent of agents) {
            agent.move()
            const distances = walls.map(wall => ({ distance: agent.calculateDistance(wall), wall }))
            const closestWall = distances.filter(e => !isNaN(e.distance))
                .reduce((acc, curr) => acc.distance < curr.distance ? acc : curr)
            if (closestWall.distance < distance) {
                agent.direction = agent.calculateReflexion(closestWall.wall)
            }

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
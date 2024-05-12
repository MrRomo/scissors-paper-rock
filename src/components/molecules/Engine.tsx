import { useContext, useEffect, useRef } from "react"
import { TableContext } from "@providers"

export const Engine = ({ children }: { children: React.ReactNode }) => {
    const { agents, stage, setAgents, emitters, walls, velocity, canvasSize } = useContext(TableContext)
    const requestRef = useRef<number>()
    const distance = 3

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
        for (let i = 0; i < agents.length; i++) {
            agents[i].move(velocity)
            if (agents[i].coord.x < -5 || agents[i].coord.x > canvasSize.width + 5 || agents[i].coord.y < -5 || agents[i].coord.y > canvasSize.height + 5) {
                agents.splice(i, 1)
                continue
            }
            const distances = walls.map(wall => ({ distance: agents[i].calculateDistance(wall), wall }))
            const closestWall = distances.filter(e => !isNaN(e.distance))
                .reduce((acc, curr) => acc.distance < curr.distance ? acc : curr)
            if (closestWall.distance < distance) {
                agents[i].direction = agents[i].calculateReflexion(closestWall.wall)
            }
            //battle phase
            for (let j = i + 1; j < agents.length; j++) {
                agents[i].battle(agents[j])
            }
        }
        setAgents([...agents])
    }


    useEffect(() => {
        if (stage !== 'run') return
        animate()
        return () => cancelAnimationFrame(requestRef.current as number)
    }, [stage, velocity])


    return children
}
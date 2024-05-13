import { coord } from "types";
import { Wall } from "./wall";

export class Agent {
    private distance = 10
    constructor(
        public coord: coord,
        public direction: number,
        public icon: string
    ) { }

    public move(step: number) {
        // move agent from coord to 10px in direction
        this.coord.x += step * Math.cos(this.direction)
        this.coord.y += step * Math.sin(this.direction)
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.font = '18px sans-serif'
        ctx.fillText(this.icon, this.coord.x, this.coord.y)
    }

    public battle(agent: Agent) {
        // if agent is in the same position, they will fight
        const distance = Math.sqrt((this.coord.x - agent.coord.x) ** 2 + (this.coord.y - agent.coord.y) ** 2)

        if (distance < this.distance) {
            // if agent has the same icon, they will be destroyed
            if (this.icon === agent.icon) return
            // if agent has different icon, they will be destroyed
            if (this.icon == '📜' && agent.icon == '🪨') {
                agent.icon = '📜'
            }
            if (agent.icon == '📜' && this.icon == '🪨') {
                this.icon = '📜'
            }
            if (this.icon == '🪨' && agent.icon == '✂️') {
                agent.icon = '🪨'
            }
            if (agent.icon == '🪨' && this.icon == '✂️') {
                this.icon = '🪨'
            }
            if (this.icon == '✂️' && agent.icon == '📜') {
                agent.icon = '✂️'
            }
            if (agent.icon == '✂️' && this.icon == '📜') {
                this.icon = '✂️'
            }
        }
    }

    calculateDistance = (wall: Wall): number => {
        //calculate distance from agent x,y coord to wall segment x,y endX,endY
        // some walls can be vertical or horizontal, and the algoritm could be handle with x or y (0,0)
        const { x, y, endX, endY } = wall
        if (endX - x === 0) return Math.abs(this.coord.x - x)
        if (endY - y === 0) return Math.abs(this.coord.y - y)
        const m = (endY - y) / (endX - x)
        const b = y - m * x
        const d = Math.abs(m * this.coord.x - this.coord.y + b) / Math.sqrt(m * m + 1)
        return d
    }

    calculateReflexion = (wall: Wall): number => {
        //calculate angle reflextion from agent x,y coord to wall segment x,y endX,endY
        // some walls can be vertical or horizontal, and the algoritm could be handle with x or y (0,0)
        const { x, y, endX, endY } = wall
        if (endX - x === 0) return Math.PI - this.direction
        if (endY - y === 0) return -this.direction

        // if not vertical or horizontal wall calculate angle reflexion from agent to wall
        const m = (endY - y) / (endX - x)
        const b = y - m * x
        const a = -m
        const c = this.coord.y - a * this.coord.x
        const x0 = (b - c) / (a - m)
        const y0 = a * x0 + c
        const d = Math.sqrt((x0 - this.coord.x) ** 2 + (y0 - this.coord.y) ** 2)
        const angle = Math.asin(d / 60)
        return angle
    }
}
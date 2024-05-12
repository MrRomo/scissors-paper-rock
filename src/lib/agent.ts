import { coord } from "types";
import { Wall } from "./wall";

export class Agent {
    private step = 0.5
    constructor(
        public coord: coord,
        public direction: number,
        public icon: string
    ) { }

    public move() {
        // move agent from coord to 10px in direction
        this.coord.x += this.step * Math.cos(this.direction)
        this.coord.y += this.step * Math.sin(this.direction)
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.font = '18px serif'
        ctx.fillText(this.icon, this.coord.x, this.coord.y)
    }

    public checkCollision(wall: Wall) {
        //check distance from agent to wall
        const d = this.calculateDistance(wall)
        if (d > this.distance) return
        //check reflexion
        this.direction  = this.calculateReflexion(wall)
    }

    calculateDistance = (wall: Wall): number => {
        const { x, y, endX, endY } = wall
        const m = (endY - y) / (endX - x)
        const b = y - m * x
        const d = Math.abs(m * this.coord.x - this.coord.y + b) / Math.sqrt(m * m + 1)
        return d
    }

    calculateReflexion = (wall: Wall): number => {
        const { x,y,endX,endY } = wall
        const m = (endY - y) / (endX - x)
        const b = y - m * x
        const d = Math.abs(m * this.coord.x - this.coord.y + b) / Math.sqrt(m * m + 1)
        const angle = Math.atan(m)
        const angleReflexion = 2 * angle - this.direction
        const xReflexion = this.coord.x + d * Math.cos(angleReflexion)
        const yReflexion = this.coord.y + d * Math.sin(angleReflexion)
        return Math.sqrt((xReflexion - this.coord.x) ** 2 + (yReflexion - this.coord.y) ** 2)
    }
}
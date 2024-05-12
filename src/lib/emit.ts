import { agent, coord } from "types"
import { Agent } from "./agent"

export class Emmitter {
    public icons = { scissors: '✂️', rock: '🪨', paper: '📜' }
    constructor(public icon: agent, public coords: coord) { }
    setCoord(coords: coord) {
        this.coords = coords
    }

    draw(ctx: CanvasRenderingContext2D) {
        //draw circle
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
        ctx.lineWidth = 4
        ctx.arc(this.coords.x + 15, this.coords.y - 9, 30, 0, 2 * Math.PI)
        ctx.stroke()
        //draw icon
        ctx.font = '24px serif'
        ctx.fillText(this.icons[this.icon], this.coords.x, this.coords.y)
    }

    createAgent() {
        const direction = Math.random() * Math.PI * 2
        const x = this.coords.x + 15 + 30 * Math.cos(direction)
        const y = this.coords.y - 9 + 30 * Math.sin(direction)
        return new Agent({ x, y }, direction, this.icons[this.icon])
    }
}

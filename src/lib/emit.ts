import { agent, coord } from "types"
import { Agent } from "./agent"
import { icons } from "./constants"

export class Emmitter {
    constructor(public icon: agent, public coords: coord) { }
    setCoord(coords: coord) {
        this.coords = coords
    }

    draw(ctx: CanvasRenderingContext2D) {
        //draw circle
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(250, 250, 50, 0.5)'
        ctx.lineWidth = 2
        ctx.arc(this.coords.x + 15, this.coords.y - 9, 30, 0, 2 * Math.PI)
        ctx.stroke()
        //draw icon
        ctx.font = '24px sans-serif'
        ctx.fillText(icons[this.icon], this.coords.x, this.coords.y)
    }

    createAgent() {
        const direction = Math.random() * Math.PI * 2
        const x = this.coords.x + 15 + 30 * Math.cos(direction)
        const y = this.coords.y - 9 + 30 * Math.sin(direction)
        return new Agent({ x, y }, direction, icons[this.icon])
    }
}

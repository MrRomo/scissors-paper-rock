import { coord } from "types";

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
}
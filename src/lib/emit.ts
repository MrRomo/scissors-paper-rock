import { agent, coord } from "types";

export class Emmitter {
    public icons = { scissors: '✂️', rock: '🪨', paper: '📜' }
    constructor(public icon: agent, public coords: coord) { }
    setCoord(coords: coord) {
        this.coords = coords
    }
    draw(ctx: CanvasRenderingContext2D) {
        //draw circle
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 4;
        ctx.arc(this.coords.x+15, this.coords.y-9, 30, 0, 2 * Math.PI);
        ctx.stroke();
        //draw icon
        ctx.font = '24px serif';
        ctx.fillText(this.icons[this.icon], this.coords.x, this.coords.y);
    }
}

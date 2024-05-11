import { square } from "types";

export class Wall {
    constructor(
        public x: number,
        public y: number,
        public endX: number,
        public endY: number) {
    }

    public getSquare(): square {
        const x = Math.min(this.x, this.endX)
        const y = Math.min(this.y, this.endY)
        const xEnd = Math.max(this.x, this.endX)
        const yEnd = Math.max(this.y, this.endY)
        const width = xEnd - x
        const height = yEnd - y
        return { x, y, width, height }
    }

    drawLine(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#09D';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();
    }

    // draw() {
    //     ctx.fillStyle = 'black';
    //     ctx.fillRect(this.x, this.y, this.width, this.height);
    // }

}
import { coord } from "types";

export class Agent {
    constructor(
        public coord: coord,
        public direction: number
    ) {}

    public move() {
        // move agent from coord to 10px in direction
        this.coord.x += 1 * Math.cos(this.direction)
        this.coord.y += 1 * Math.sin(this.direction)
    }

}
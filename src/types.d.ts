import { Emmitter } from "@lib";

export interface coord { x: number, y: number }
export interface square { x: number, y: number, width: number, height: number }
export type stage = 'construct' | 'set' | 'run' | 'pause'
export type agent = 'scissors' | 'rock' | 'paper' 
export interface typeEmitters {
    scissors: Emmitter
    rock: Emmitter
    paper: Emmitter
}
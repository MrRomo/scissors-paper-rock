export interface coord { x: number, y: number }
export interface square { x: number, y: number, width: number, height: number }
export type stage = 'construct' | 'set' | 'run' | 'pause'
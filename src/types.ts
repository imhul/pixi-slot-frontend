export type SlotSymbolsType = 'A' | 'J' | 'Q' | 'K' | 'B' | 'W' | 'S'
export type ReelSymbolsType = SlotSymbolsType[]
export type SpinResult = ReelSymbolsType[]

export enum SlotState {
    IDLE = 'IDLE',
    SPINNING = 'SPINNING',
    STOPPING = 'STOPPING',
    STOPPED = 'STOPPED'
}

export enum ReelState {
    IDLE,
    SPINNING,
    STOPPING,
    SNAP
}

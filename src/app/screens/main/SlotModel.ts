import { visibleCount, symbols } from '../../../config'
// types
import {
    SlotSymbolsType,
    ReelSymbolsType,
    SlotState,
    SpinResult
} from "@types"

export class SlotModel {
    public reels: ReelSymbolsType[] = []
    public state: SlotState = SlotState.IDLE

    constructor(reelsSymbols: ReelSymbolsType[] = []) {
        if (reelsSymbols.length) {
            this.reels = reelsSymbols.map(r => [...r]) // копія
        } else {
            // default reels
            const reelCount = 5
            for (let i = 0; i < reelCount; i++) {
                this.reels.push([...symbols])
            }
        }
    }

    /** Імітація спіну (поки без RNG) */
    public spin(): Promise<SpinResult> {
        if (this.state !== SlotState.IDLE && this.state !== SlotState.STOPPED) {
            throw new Error('Cannot spin now, slot not ready')
        }

        this.state = SlotState.SPINNING

        return new Promise(resolve => {
            // fake spin delay
            const spinDuration = 1000 + Math.random() * 1000 // 1-2 сек
            setTimeout(() => {
                this.state = SlotState.STOPPING

                // Генеруємо випадковий результат
                const result: SpinResult = this.reels.map(reel => {
                    const reelLength = reel.length
                    const startIndex = Math.floor(Math.random() * reelLength)
                    const visibleSymbols: SlotSymbolsType[] = []
                    for (let i = 0; i < visibleCount; i++) {
                        visibleSymbols.push(reel[(startIndex + i) % reelLength])
                    }
                    return visibleSymbols
                })

                this.state = SlotState.STOPPED
                resolve(result)
            }, spinDuration)
        })
    }

    /** Reset slot to initial state */
    public reset() {
        this.state = SlotState.IDLE
    }
}

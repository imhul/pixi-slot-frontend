import { ReelView } from "./ReelView"
import type { SlotSymbolsType } from "@types"

export class ReelController {
    public view: ReelView
    private isSpinning = false
    private stopPromise?: Promise<void>
    private resolveStop?: () => void

    constructor() {
        this.view = new ReelView()
        this.view.onStop = () => {
            this.isSpinning = false
            this.resolveStop?.()
        }
    }

    startSpin(turbo = false) {
        this.isSpinning = true
        this.view.startSpin(turbo)
        this.stopPromise =
            new Promise(resolve => {
                this.resolveStop = resolve
            })
    }

    stopSpin(result: SlotSymbolsType[]) {
        this.view.stopSpin(result)
        return this.stopPromise
    }

    update() {
        this.view.update()
    }

    get spinning() {
        return this.isSpinning
    }
}

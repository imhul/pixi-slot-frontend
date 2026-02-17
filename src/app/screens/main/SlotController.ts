import { Container, Ticker } from 'pixi.js'
import { SlotView } from './SlotView'
import { SlotModel } from './SlotModel'
import type { SlotSymbolsType } from "@types"

export class SlotController {
    public view: SlotView
    private model: SlotModel
    private spinning = false
    private turbo = false

    constructor() {
        this.model = new SlotModel()
        this.view = new SlotView()
    }

    init(parent: Container) {
        parent.addChild(this.view)
        this.view.init()
    }

    update(_ticker: Ticker) {
        this.view.update()
    }

    setTurbo(enabled: boolean) {
        this.turbo = enabled
    }

    private delay(ms: number) {
        return new Promise(resolve =>
            setTimeout(resolve, ms)
        )
    }

    private getReelDelay(
        reelIndex: number,
        result: SlotSymbolsType[][]
    ): number {
        const baseDelay = this.turbo ? 60 : 150

        if (reelIndex === 0) return baseDelay

        const prevReel = result[reelIndex - 1]

        const hasAnticipationSymbol =
            prevReel.includes("W") ||
            prevReel.includes("S")

        if (hasAnticipationSymbol) {
            return baseDelay * 4
        }

        return baseDelay
    }

    private async stopReelsStaggered(result: SlotSymbolsType[][]) {
        const baseDelay = this.turbo ? 60 : 150

        for (let i = 0; i < result.length; i++) {
            const delay = this.getReelDelay(i, result)

            await this.delay(delay)

            this.view.stopReel(i, result[i])
        }
    }

    public async spin() {
        if (this.spinning) return

        this.spinning = true

        this.view.startSpin(this.turbo)
        const result = await this.model.spin()
        // this.view.stopSpin(result)
        await this.stopReelsStaggered(result)

        this.spinning = false
    }

    resize(width: number, height: number) {
        this.view.resize(width, height)
    }

    pause() {
        this.view.pause()
    }

    resume() {
        this.view.resume()
    }

    destroy() {
        this.view.destroy({ children: true })
    }
}

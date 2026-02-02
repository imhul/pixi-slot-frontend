import { Container } from 'pixi.js'
import { ReelView } from './ReelView'
import type { SlotSymbolsType } from '../../../../types'

export class SlotView extends Container {
    private reels: ReelView[] = []
    private paused = false

    init() {
        const total = 5
        const offset = (total * 120) / 2

        for (let i = 0; i < total; i++) {
            const reel = new ReelView()
            reel.x = i * 120 - offset
            reel.y -= offset
            this.reels.push(reel)
            this.addChild(reel)
        }
    }

    update() {
        if (this.paused) return
        for (const reel of this.reels) reel.update()
    }

    startSpin() {
        for (const reel of this.reels) reel.startSpin()
    }

    stopSpin(result: SlotSymbolsType[][]) {
        this.reels.forEach((reel, i) => {
            reel.stopSpin(result[i])
        })
    }

    pause() {
        this.paused = true
    }

    resume() {
        this.paused = false
    }

    resize(width: number, height: number) {
        // this.x = width * 0.5 - 500;
        // this.y = height * 0.5 - 550;
    }
}

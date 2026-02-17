import { Container } from 'pixi.js'
import { ReelView } from './ReelView'
import { ReelController } from './ReelController'
import type { SlotSymbolsType } from "@types"

export class SlotView extends Container {
    private reels: ReelController[] = []
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

    startSpin(turbo: boolean) {
        for (const reel of this.reels) reel.startSpin(turbo)
    }

    stopReel(index: number, result: SlotSymbolsType[]) {
        this.reels[index].stopSpin(result);
    }

    // stopSpin(result: SlotSymbolsType[][]) {
    //     this.reels.forEach((reel, i) => {
    //         reel.stopSpin(result[i])
    //     })
    // }

    stopSpin(result: SlotSymbolsType[][]) {
        this.reels.forEach((reel, i) => {
            setTimeout(() => {
                reel.stopSpin(result[i])
            }, i * 200)
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

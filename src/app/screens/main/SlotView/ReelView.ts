import { Container } from 'pixi.js'
import { SymbolView } from './SymbolView'
import { symbols } from '@config'
import { type SlotSymbolsType, ReelState } from "@types"

export class ReelView extends Container {

    private readonly symbolSize = 100
    private readonly visibleCount = 3
    private readonly buffer = 2

    private symbolsViews: SymbolView[] = []

    private state: ReelState = ReelState.IDLE

    private speed = 0
    private baseSpeed = 25
    private turboSpeed = 45

    private stopResult: SlotSymbolsType[] = []

    private snapTargetOffset = 0

    onStop?: () => void


    constructor() {
        super()
        const total = this.visibleCount + this.buffer

        for (let i = 0; i < total; i++) {
            const sym = new SymbolView(this.symbolSize)

            sym.y = i * this.symbolSize
            sym.setSymbol(this.randomSymbol())

            this.symbolsViews.push(sym)
            this.addChild(sym)
        }
    }

    startSpin(turbo = false) {
        this.state = ReelState.SPINNING
        this.speed = turbo
            ? this.turboSpeed
            : this.baseSpeed
    }


    stopSpin(result: SlotSymbolsType[]) {
        this.stopResult = result
        this.state = ReelState.STOPPING
        this.prepareStopSymbols()
    }


    update() {
        if (this.state === ReelState.IDLE) return
        this.moveSymbols()
        this.recycleSymbols()

        switch (this.state) {
            case ReelState.STOPPING:
                this.updateStopping()
                break
            case ReelState.SNAP:
                this.updateSnap()
                break
        }
    }

    private moveSymbols() {
        for (const sym of this.symbolsViews)
            sym.y += this.speed
    }


    private recycleSymbols() {
        const totalHeight =
            this.symbolsViews.length * this.symbolSize

        for (const sym of this.symbolsViews) {
            if (sym.y >= totalHeight) {
                sym.y -= totalHeight
                if (this.state === ReelState.SPINNING)
                    sym.setSymbol(this.randomSymbol())
            }
        }
    }

    private prepareStopSymbols() {
        const total = this.symbolsViews.length

        for (let i = 0; i < this.visibleCount; i++) {
            const sym =
                this.symbolsViews[
                (total - this.visibleCount + i) % total
                ]

            sym.setSymbol(this.stopResult[i])
        }

        this.snapTargetOffset =
            total * this.symbolSize
    }


    private updateStopping() {
        this.speed *= 0.92
        if (this.speed < 6) {
            this.state = ReelState.SNAP
        }
    }


    private updateSnap() {
        this.speed *= 0.85
        if (this.speed < 0.8) {
            this.speed = 0
            this.finalSnap()
            this.state = ReelState.IDLE
            this.onStop?.()
        }
    }


    private finalSnap() {
        for (let i = 0; i < this.symbolsViews.length; i++) {
            const sym = this.symbolsViews[i]
            sym.y =
                i * this.symbolSize
            if (i < this.visibleCount)
                sym.setSymbol(this.stopResult[i])
        }
    }

    private randomSymbol(): SlotSymbolsType {
        return symbols[
            Math.floor(Math.random() * symbols.length)
        ]
    }
}

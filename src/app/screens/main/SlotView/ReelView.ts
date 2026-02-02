import { Container } from 'pixi.js'
import { SymbolView } from './SymbolView'
import { symbols } from '../../../../config'
import type { SlotSymbolsType } from '../../../../types'

export class ReelView extends Container {
    private readonly symbolSize = 100
    private readonly visibleCount = 3
    private readonly buffer = 2

    private symbolsViews: SymbolView[] = []

    private speed = 0
    private spinning = false
    private stopping = false

    private stopResult: SlotSymbolsType[] = []

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

    // -----------------------
    // PUBLIC API
    // -----------------------

    startSpin() {
        this.spinning = true
        this.stopping = false
        this.speed = 25
    }

    stopSpin(result: SlotSymbolsType[]) {
        this.stopResult = result
        this.stopping = true
    }

    update() {
        if (!this.spinning) return

        for (const sym of this.symbolsViews) {
            sym.y += this.speed
        }

        this.recycleSymbols()

        if (this.stopping) {
            this.speed *= 0.9

            if (this.speed < 2) {
                this.snapToResult()
            }
        }
    }

    // -----------------------
    // INTERNAL LOGIC
    // -----------------------

    private recycleSymbols() {
        const totalHeight = this.symbolsViews.length * this.symbolSize

        for (const sym of this.symbolsViews) {
            if (sym.y >= totalHeight) {
                sym.y -= totalHeight
                sym.setSymbol(this.randomSymbol())
            }
        }
    }

    private snapToResult() {
        this.spinning = false
        this.stopping = false
        this.speed = 0

        for (let i = 0; i < this.symbolsViews.length; i++) {
            const sym = this.symbolsViews[i]
            sym.y = i * this.symbolSize

            if (i < this.visibleCount) {
                sym.setSymbol(this.stopResult[i])
            }
        }
    }

    private randomSymbol(): SlotSymbolsType {
        return symbols[Math.floor(Math.random() * symbols.length)]
    }
}

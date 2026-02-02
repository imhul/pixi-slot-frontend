import { Container, Graphics, Text } from 'pixi.js'
import type { SlotSymbolsType } from '../../../../types'

export class SymbolView extends Container {
    public symbol!: SlotSymbolsType
    public readonly size: number

    constructor(size: number) {
        super()
        this.size = size
    }

    setSymbol(symbol: SlotSymbolsType) {
        this.symbol = symbol
        this.removeChildren()

        const bg = new Graphics()
            .rect(0, 0, this.size, this.size)
            .fill(0x333333)

        const label = new Text({
            text: symbol,
            style: {
                fill: 0xffffff,
                fontSize: 36,
                fontWeight: 'bold'
            }
        })

        label.anchor.set(0.5)
        label.position.set(this.size / 2)

        this.addChild(bg, label)
    }
}

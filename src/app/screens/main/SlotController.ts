import { Container, Ticker } from 'pixi.js'
import { SlotView } from './SlotView'
import { SlotModel } from './SlotModel'

export class SlotController {
    public view: SlotView
    private model: SlotModel
    private spinning = false

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

    /** Викликається кнопкою Spin */
    public async spin() {
        if (this.spinning) return

        this.spinning = true

        this.view.startSpin()
        const result = await this.model.spin()
        this.view.stopSpin(result)

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

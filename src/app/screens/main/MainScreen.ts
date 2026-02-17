import { Container, Ticker } from 'pixi.js'
import { FancyButton, Switcher } from '@pixi/ui'
import { engine } from '../../getEngine'
import { PausePopup } from '../../popups/PausePopup'
import { SettingsPopup } from '../../popups/SettingsPopup'

import { SlotController } from './SlotController'

import { Button } from '../../ui/Button'

export class MainScreen extends Container {
    public static assetBundles = ['main']

    private mainContainer: Container
    private slot!: SlotController
    private turboEnabled = false
    private pauseButton: FancyButton
    private spinButton: Button
    private turboSwitch: Switcher
    private settingsButton: FancyButton
    private paused = false

    constructor() {
        super()

        this.mainContainer = new Container()
        this.addChild(this.mainContainer)

        this.slot = new SlotController()
        this.slot.init(this.mainContainer)

        this.spinButton = new Button({
            text: 'SPIN',
            width: 220,
            height: 120
        })

        this.spinButton.onPress.connect(() => {
            this.slot.spin()
        })

        this.addChild(this.spinButton)

        this.turboSwitch = new Switcher([`switch_off.png`, `switch_on.png`])

        this.turboSwitch.onChange.connect(() => {
            this.turboEnabled = !this.turboEnabled
            this.slot.setTurbo(this.turboEnabled)
        })

        this.addChild(this.turboSwitch)

        this.pauseButton = new FancyButton({
            defaultView: 'icon-pause.png',
            anchor: 0.5
        })
        this.pauseButton.onPress.connect(() =>
            engine().navigation.presentPopup(PausePopup)
        )
        this.addChild(this.pauseButton)

        this.settingsButton = new FancyButton({
            defaultView: 'icon-settings.png',
            anchor: 0.5
        })
        this.settingsButton.onPress.connect(() =>
            engine().navigation.presentPopup(SettingsPopup)
        )
        this.addChild(this.settingsButton)
    }

    public update(ticker: Ticker) {
        if (this.paused) return
        this.slot.update(ticker)
    }

    public async pause() {
        this.paused = true
        this.mainContainer.interactiveChildren = false
        this.slot.pause()
    }

    public async resume() {
        this.paused = false
        this.mainContainer.interactiveChildren = true
        this.slot.resume()
    }

    public resize(width: number, height: number) {
        this.mainContainer.x = width * 0.5
        this.mainContainer.y = height * 0.5

        this.turboSwitch.x = width / 2
        this.turboSwitch.y = height
        this.spinButton.x = width / 2 + 140
        this.spinButton.y = height - 140
        this.pauseButton.x = 30
        this.pauseButton.y = 30
        this.settingsButton.x = width - 30
        this.settingsButton.y = 30

        this.slot.resize(width, height)
    }
}

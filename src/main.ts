import { setEngine } from '@app/getEngine'
import { LoadScreen } from '@screens/LoadScreen'
import { MainScreen } from '@screens/main/MainScreen'
import { userSettings } from '@utils/userSettings'
import { CreationEngine } from '@/engine'

import '@pixi/sound'

const engine = new CreationEngine()
setEngine(engine)

    ; (async () => {
        await engine.init({
            background: '#1E1E1E',
            resizeOptions: { minWidth: 768, minHeight: 1024, letterbox: false }
        })

        userSettings.init()
        await engine.navigation.showScreen(LoadScreen)
        await engine.navigation.showScreen(MainScreen)
    })()

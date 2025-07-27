import { user } from "./rLogin.js"
import { players } from "./rPlayers.js"
import { riddles } from "./rRiddles.js"

const configRoutes = (app) => {
    app.use('/riddles', riddles)
    app.use('/players', players)
    app.use('/', user)
}

export {
    configRoutes
}
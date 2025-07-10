import { notFound } from "../middleware/notFound.js"
import { riddles } from "./rRiddles.js"

const configRoutes = (app) => {
    app.use('/riddles', riddles)
    app.use('/', notFound)
}

export {
    configRoutes
}
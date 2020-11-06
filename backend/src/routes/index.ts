import { Router } from 'express'
import agendamentosRouter from './agendamentos.routes'
import usuariosRouter from './usuarios.routes'
import sessionsRouter from './sessions.routes'

const routes = Router()

routes.use('/agendamentos', agendamentosRouter)
routes.use('/usuarios', usuariosRouter)
routes.use('/sessions', sessionsRouter)

export default routes

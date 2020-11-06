import { Router } from 'express'
import CreateSessionService from '../services/CreateSessionService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
	const { email, password } = request.body
	const createSessionService = new CreateSessionService()

	const { usuario, token } = await createSessionService.execute({ email, password })

	return response.json({ usuario, token })
})

export default sessionsRouter
